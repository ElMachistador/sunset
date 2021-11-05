import { Component, OnInit } from '@angular/core';

import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Auth, authState, User } from '@angular/fire/auth';

import { Flight } from '../models';

@Component({
  selector: 'app-historic-sup',
  templateUrl: './historic-sup.component.html',
  styleUrls: ['./historic-sup.component.scss']
})
export class HistoricSupComponent implements OnInit {
  flights$?= authState(this.auth).pipe(
    switchMap(() => this.getFlight())
  )
  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) { }

  ngOnInit(): void {
  }

  getFlight() {
    const ref = collection(this.firestore, 'dones')
    return collectionData(ref)
  }

}
