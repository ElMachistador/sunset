import { Component, OnInit } from '@angular/core';

import { Firestore, collection, deleteDoc, getDoc, doc, addDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

import { FormGroup } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Airline, FormArrivalTiming, FormDepertureTiming } from '../models';
import { map, shareReplay } from 'rxjs/operators';

import { AirlineService } from '../airline.service';

import { Location } from '@angular/common';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

import { Flight } from '../models';

import { TitleService } from '../title.service';


@Component({
  selector: 'app-turnaround',
  templateUrl: './turnaround.component.html',
  styleUrls: ['./turnaround.component.scss']
})
export class TurnaroundComponent implements OnInit {
  flight?: Flight
  flightId?: string | null
  form = new FormGroup({
    arrivalTiming: new FormArrivalTiming(),
    departureTiming: new FormDepertureTiming()
  })
  airline$?: Observable<Airline[]>
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay({ refCount: true, bufferSize: 1 })
    )
  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private auth: Auth,
    private location: Location,
    private airlineService: AirlineService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private titleService: TitleService
  ) {
    titleService.title = "Turnaround"
  }

  async ngOnInit() {
    this.getAirline()
    const params = this.route.snapshot.paramMap
    this.flightId = params.get('id')
    const url = this.route.snapshot.url
    const historic = url.toString().includes('historic')
    if (this.flightId && historic) {
      const ref = doc(this.firestore, 'dones', this.flightId)
      const snap = await getDoc<Flight>(ref as any)
      console.log(snap.data())
      this.flight = snap.data()
    }
    if (this.flightId && !historic) {
      const ref = doc(this.firestore, 'flights', this.flightId)
      const snap = await getDoc<Flight>(ref as any)
      this.flight = snap.data()
    }
    this.form.reset(this.flight)
  }

  ngOnDestroy() {
    this.titleService.title = ""
  }

  back() {
    this.location.back()
  }

  getAirline() {
    this.airline$ = this.airlineService.getCompagnie()
  }

  async finalize() {
    const flight = this.flight
    const user = this.auth.currentUser?.uid
    const ref = collection(this.firestore, 'dones')
    const finalized = this.form.value
    await addDoc(ref, { ...finalized, ...flight, user, })
    if (this.flightId) {
      const ref2 = doc(this.firestore, 'flights', this.flightId)
      deleteDoc(ref2)
      this.router.navigate(["/myflights"])
    }
  }

}
