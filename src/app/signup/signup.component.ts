import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor( private route: Router) {}

  error: any;
  message: string = '';
  auth: any = getAuth();

  ngOnInit(): void {}

  Signup: any = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  onsubmit() {
    let fname = this.Signup.value.fname;
    let lname = this.Signup.value.lname;
    let email = this.Signup.value.email;
    let password = this.Signup.value.pass;
    const db = getDatabase();

    createUserWithEmailAndPassword(this.auth, email, password)
      .then((data) => {
        set(ref(db, 'users/' + data.user.uid), {
          fname: fname,
          lname: lname,
          email: email,
        })
          .then(() => {
            sendEmailVerification(this.auth.currentUser).then(() => {
              this.route.navigate(['/verification-email'])
              this.message = 'Verify the Email';
              console.log('signed up');
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        this.message = '';
        this.error = error;
      });
  }
}
