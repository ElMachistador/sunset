import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { CompagniesComponent } from '../compagnies/compagnies.component';
import { AirlineService } from '../airline.service';
import { Airline } from '../models';

import { Auth, authState, User } from '@angular/fire/auth';
import { Firestore, collection, collectionData, deleteDoc, doc, query, where, addDoc, getDoc } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators'

import { Flight, Finalized } from '../models';

import { TitleService } from '../title.service';




@Component({
  selector: 'app-myflights',
  templateUrl: './myflights.component.html',
  styleUrls: ['./myflights.component.scss']
})
export class MyflightsComponent implements OnInit {
  flights$: Observable<Flight[]> = authState(this.auth).pipe(
    switchMap(user => this.getFlight(user))
  )
  airline$?: Observable<Airline[]>

  dones$: Observable<Finalized[]> = authState(this.auth).pipe(
    switchMap(user => this.getDones(user))
  )
  constructor(
    private dialog: MatDialog,
    private auth: Auth,
    private firestore: Firestore,
    private airLineService: AirlineService,
    private titleService: TitleService
  ) { 
    titleService.title = "My Flights"
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.titleService.title = ""
  }

  selectAirline() {
    this.dialog.open(CompagniesComponent)
  }

  getFlight(user: User | null) {
    if (!user) {
      return of([])
    } else {
      const ref = collection(this.firestore, 'flights')
      const q = query(ref, where('assignedTo', '==', user.uid))
      return collectionData<Flight>(q as any, { idField: 'id' })
    }
  }

  remove(id: string) {
    const user = this.auth.currentUser
    if (user) {
      const ref = doc(this.firestore, 'flights', id)
      deleteDoc(ref)
    }
  }


  getDones(user: User | null) {
    if (user) {
      const ref = query(collection(this.firestore, 'dones'), where('user', '==', user.uid))
      return collectionData<Finalized>(ref as any, { idField: 'id' })
    } else {
      return of([])
    }
  }

  async modify(id: string) {
    const ref = doc(this.firestore, 'dones', id)
    const snap = await getDoc(ref)
    const flight = snap.data()
    const ref2 = collection(this.firestore, 'flights')
    await addDoc(ref2, flight)
    deleteDoc(ref)
  }

}
