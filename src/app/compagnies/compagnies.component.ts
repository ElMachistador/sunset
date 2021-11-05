import { Component, OnInit } from '@angular/core';

import { Firestore, deleteDoc, doc } from '@angular/fire/firestore';

import { Airline } from '../models';

import { Observable } from 'rxjs';
import { AirlineService } from '../airline.service';

import { TitleService } from '../title.service';

@Component({
  selector: 'app-compagnies',
  templateUrl: './compagnies.component.html',
  styleUrls: ['./compagnies.component.scss']
})
export class CompagniesComponent implements OnInit {
  airlines$?: Observable<Airline[]>


  constructor(
    private firestore: Firestore,
    private airlineService: AirlineService,
    private titleService: TitleService
  ) {
    titleService.title = "Airlines List"
   }

  async ngOnInit() {
    this.getAirline()
  }

  ngOnDestroy(){
    this.titleService.title = ""
  }

  remove(id: string) {
    const ref = doc(this.firestore, 'airlines', id)
    deleteDoc(ref)
  }

  getAirline() {
    this.airlines$ = this.airlineService.getCompagnie()
  }

}
