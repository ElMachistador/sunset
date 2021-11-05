import { Component, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';

import { Airline, FormFlightInfo, FormFlightSpec } from '../models';

import { Observable } from 'rxjs';

import { Firestore, collection, collectionData, query, where, addDoc, getDoc, updateDoc, doc, getDocs } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';

import { TitleService } from '../title.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  form = new FormGroup({
    flightInfo: new FormFlightInfo(),
    flightSpec: new FormFlightSpec()
  })
  airline$?: Observable<Airline[]>

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private titleService: TitleService
  ) {
    titleService.title = "Flight Infos"
  }

  async ngOnInit() {
    const user = this.auth.currentUser
    const params = this.route.snapshot.paramMap
    const airline = params.get('iata')
    const flight = params.get('id')
    if (airline) {
      const ref = collection(this.firestore, 'airlines')
      const q = query(ref, where('iata', '==', airline))
      this.airline$ = collectionData<Airline>(q as any)
    }
    if (flight) {
      const ref = doc(this.firestore, 'flights', flight)
      const snap = await getDoc(ref)
      const myFlight = snap.data()
      myFlight!.flightInfo.date = myFlight!.flightInfo.date.toDate()
      this.form.reset(myFlight)
    }
  }

  ngOnDestroy() {
    this.titleService.title = ""
  }

  async addFlight(iata: string) {
    const user = this.auth.currentUser
    const params = this.route.snapshot.paramMap
    const flight = params.get('id')
    const id = params.get('iata')
    if (user && !flight) {
      let airlineId = {}
      const assignedTo = user.uid
      const ref2 = collection(this.firestore, 'flights')
      const q = query(collection(this.firestore, 'airlines'), where('iata', '==', id))
      const querySnapshot = await getDocs<Airline>(q as any)
      querySnapshot.forEach((doc) => airlineId = doc.id)
      addDoc(ref2, { ...this.form.value, iata, assignedTo, airlineId })
    }
    if (user && flight) {
      const ref = doc(this.firestore, 'flights', flight)
      const updated = this.form.value
      updateDoc(ref, updated)
    }
    this.router.navigate(['/myflights'])
  }

  back() {
    this.location.back()
  }

}
