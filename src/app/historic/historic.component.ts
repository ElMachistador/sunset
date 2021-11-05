import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { TitleService } from '../title.service';

import { FormControl, FormGroup } from '@angular/forms';

import { Auth, authState, User } from '@angular/fire/auth';
import { Firestore, collection, query, where, collectionData, getDocs, doc, getDoc, addDoc, deleteDoc } from '@angular/fire/firestore';

import { switchMap, map, startWith } from 'rxjs/operators';
import { Observable, of, combineLatest } from 'rxjs';

import { Airline, Flight } from '../models';

import { getDate, isSameDay } from 'date-fns';


interface DoneFilter {
  iata: string,
  date: Date,
  flightNumber: string
}

function sameDate(flight: Flight, filters: DoneFilter) {
  return isSameDay(flight.info.date.toDate(), filters.date)
}


function filterAirlines(flights: Flight[], filters: DoneFilter,) {
  console.log(filters)
  if (!filters.iata && !filters.date) return flights;
  return flights.filter(flight => {
    const hasIata = filters.iata ? flight.iata === filters.iata : true
    const hasNumber = filters.flightNumber ? flight.info.arrivalNumber.toLocaleLowerCase().includes(filters.flightNumber.toLocaleLowerCase()) : true
    return hasIata && hasNumber && sameDate(flight, filters)
  })
}

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {
  form = new FormGroup({
    iata: new FormControl(),
    date: new FormControl(),
    flightNumber: new FormControl()
  })
  dones$: Observable<Flight[]> = authState(this.auth).pipe(
    switchMap(user => this.getDones(user))
  )
  airlines$?: Observable<Airline[]>
  filtered$?: any
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private titleService: TitleService,
    private router: Router
  ) {
    titleService.title = "Historic"
  }

  async ngOnInit() {
    const ref = collection(this.firestore, 'airlines')
    this.airlines$ = collectionData<Airline>(ref as any, { idField: 'id' })
    this.filtered$ = combineLatest([
      this.dones$,
      this.form.valueChanges.pipe(startWith(this.form.value))
    ]).pipe(
      map(([airlines, filters]) => filterAirlines(airlines, filters))
    )
  }

  ngOnDestroy() {
    this.titleService.title = ""
  }

  getDones(user: User | null) {
    if (!user) {
      return of([])
    } else {
      const ref = collection(this.firestore, 'flights')
      const q = query(ref, where('assignedTo', '==', user.uid), where('done', '==', true))
      return collectionData<Flight>(q as any, { idField: 'id' })
    }
  }

  remove(id: string) {
    const ref = doc(this.firestore, 'dones', id)
    deleteDoc(ref)
  }

}
