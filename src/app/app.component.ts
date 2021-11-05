import { Component } from '@angular/core';

import { Auth, signOut } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators'

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { TitleService } from './title.service';

import { collection, doc, updateDoc, getDocs } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Airline, Flight } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  opened = false
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay({ refCount: true, bufferSize: 1 })
    )

  constructor(
    private auth: Auth,
    private breakpointObserver: BreakpointObserver,
    private titleService: TitleService,
    private firestore: Firestore
  ) { }

  get title() {
    return this.titleService.title
  }

  signOut() {
    signOut(this.auth)
  }

  // async migrate() {
  //   const getAll = async <T>(name: string): Promise<T[]> => {
  //     const ref = collection(this.firestore, name);
  //     const result = await getDocs(ref);
  //     return result.docs.map(snap => ({ ...snap.data(), id: snap.id } as any))
  //   }
  //   // Get everything
  //   const airlines = await getAll<Airline>('airlines');
  //   const flights = await getAll<Flight>('flights');
  //   for (const flight of flights) {
  //     const airlineId = airlines.find(airline => airline.iata === flight.iata)?.id;
  //     const ref = doc(this.firestore, 'flights', flight.id);
  //     updateDoc(ref, { airlineId })
  //   }
  // }

}
