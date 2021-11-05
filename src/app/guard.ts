import { Inject, Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { Auth, authState, User } from "@angular/fire/auth";
import { doc, docData } from "@angular/fire/firestore";

import { map, switchMap } from "rxjs/operators";

import { Profile } from "./models";
import { of } from "rxjs";

import { Firestore } from "@angular/fire/firestore";

@Injectable({ providedIn: 'root' })
export class IsConnectedGuard implements CanActivate {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) { }

  canActivate() {
    return authState(this.auth).pipe(
      switchMap(user => this.getProfile(user))
    )
  }

  getProfile(user: User | null) {
    if (!user) return of(false)
    const ref = doc(this.firestore, 'users', user.uid)
    const profile = docData<Profile>(ref as any)
    return profile.pipe(
      map(profile => profile.position == 2)
    )
  }

}