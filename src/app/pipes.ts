import { Pipe } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { docData, doc } from "@angular/fire/firestore";
import { Airline } from "./models";

@Pipe({ name: 'getAirline' })
export class GetAirlinePipe {
  constructor(private firestore: Firestore) { }
  transform(airlineId: string) {
    const ref = doc(this.firestore, 'airlines', airlineId)
    return docData<Airline>(ref as any);
  }
}