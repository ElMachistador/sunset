import { Injectable } from '@angular/core';

import { Firestore, collection, collectionData } from '@angular/fire/firestore';

import { Airline } from './models';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  constructor(
    private firestore: Firestore
  ) { }


  getCompagnie() {
    const ref = collection(this.firestore, 'airlines')
    return collectionData<Airline>(ref as any, { idField: "id" })
  }
}

