import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  inputHidden = false
  form = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    position: new FormControl(false),
  })
  user$ = authState(this.auth)

  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) { }

  ngOnInit(): void {
  }

  hide() {
    this.inputHidden = !this.inputHidden
  }

  signIn() {
    const { email, password } = this.form.value
    signInWithEmailAndPassword(this.auth, email, password)
  }

  async signUp() {
    if (this.form.valid) {
      const { email, password } = this.form.value
      const userCredentials = await createUserWithEmailAndPassword(this.auth, email, password)
      const uid = userCredentials.user.uid
      const ref = doc(this.firestore, 'users', uid)
      const position = this.form.value.position == true ? 2 : 1
      setDoc(ref, { email, position })
    }
  }
}
