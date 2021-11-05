import { Time } from "@angular/common";
import { FormGroup, FormControl } from "@angular/forms";

import { User } from "@angular/fire/auth";

export interface Profile extends User {
  position: number
}

export interface Airline {
  id: string,
  name: string,
  image: string,
  iata: string,
  oaci: string,
  logo: string
  info: Info,
}

export interface Flight {
  assignedTo: string,
  info: Info,
  spec: Spec,
  iata: string,
  id: string,
  airlineId: string,
  done: boolean
}

export interface Finalized {
  arrivalTiming: ArrivalTiming,
  assignedTo: string,
  departureTiming: DerpartureTiming,
  info: Info,
  spec: Spec,
  iata: string,
  user: string,
  id: string,
  done: boolean
}

export interface Info {
  date: any,
  arrivalNumber: string,
  departureNumber: string,
  registration: string,
  from: string,
  to: string,
  sta: Time,
  std: Time,
  aircraftType: string
}

export interface Spec {
  paxArrival: number,
  paxDeparture: number,
  specArrival: string,
  specDeparture: string
}

export interface ArrivalTiming {
  ata: Time,
  doorOpen: Time,
  firstPaxOut: Time,
  lastPaxOut: Time,
  cleaningStart: Time,
  cleaningEnd: Time
}

export interface DerpartureTiming {
  cabinRelease: Time,
  firstPaxIn: Time,
  lastPaxIn: Time,
  doorClosure: Time
  atd: Time,
}

export class Forminfo extends FormGroup {
  constructor() {
    super({
      date: new FormControl(new Date()),
      arrivalNumber: new FormControl(),
      departureNumber: new FormControl(),
      registration: new FormControl(),
      from: new FormControl(),
      to: new FormControl(),
      sta: new FormControl(),
      std: new FormControl(),
      aircraftType: new FormControl(),
    })
  }
}

export class Formspec extends FormGroup {
  constructor() {
    super({
      paxArrival: new FormControl(),
      paxDeparture: new FormControl(),
      specArrival: new FormControl(),
      specDeparture: new FormControl(),
    })
  }
}

export class FormArrivalTiming extends FormGroup {
  constructor() {
    super({
      ata: new FormControl(),
      doorOpen: new FormControl(),
      firstPaxOut: new FormControl(),
      lastPaxOut: new FormControl(),
      cleaningStart: new FormControl(),
      cleaningEnd: new FormControl(),
    })
  }
}

export class FormDepertureTiming extends FormGroup {
  constructor() {
    super({
      cabinRelease: new FormControl(),
      firstPaxIn: new FormControl(),
      lastPaxIn: new FormControl(),
      doorClosure: new FormControl(),
      atd: new FormControl(),
    })
  }
}
