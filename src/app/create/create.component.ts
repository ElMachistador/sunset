import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { Firestore, collection, addDoc, doc, getDoc } from '@angular/fire/firestore';

import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';

import { TitleService } from '../title.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(),
    image: new FormControl(),
    logo: new FormControl(),
    oaci: new FormControl(),
    iata: new FormControl()
  })

  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private titleService: TitleService
  ) { 
    titleService.title = "Create Airline"
  }

  async ngOnInit() {
    const params = this.route.snapshot.paramMap
    const airlineId = params.get('id')
    if (airlineId) {
      const ref = doc(this.firestore, 'airlines', airlineId)
      const snap = await getDoc(ref)
      this.form.reset(snap.data())
    }
  }

  ngOnDestroy(){
    this.titleService.title = ""
  }

  addAirline() {
    const ref = collection(this.firestore, 'airlines')
    addDoc(ref, this.form.value)
  }

  back() {
    this.location.back()
  }
}
