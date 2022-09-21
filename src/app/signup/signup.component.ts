import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { getDatabase, ref, set, onValue, push, child } from 'firebase/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private route: Router) {
    this.getbatch();
  }

  error: any;
  sigining:boolean = false;
  auth: any = getAuth();

  ngOnInit(): void {}

  Signup: any = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
    batch_year: new FormControl('', [Validators.required]),
  });

  batch: any = [];
  getbatch() {
    let val;
    const db = getDatabase();
    const starCountRef = ref(db, 'batch');
    onValue(starCountRef, (snapshot) => {
      val = snapshot.val();
      for (const iterator in val) {
        this.batch.push(val[iterator]);
      }
    });
    console.log(this.batch);
  }

  data: any = {
    Academic_details: [''],
    Social_media: [''],
    Work_experience: [''],
  };

  onsubmit() {
    this.sigining = true;
    let fname = this.Signup.value.fname;
    let lname = this.Signup.value.lname;
    let email = this.Signup.value.email;
    let password = this.Signup.value.pass;
    let batch = this.Signup.value.batch_year;
    const db = getDatabase();
    const newPostKey = push(child(ref(db), 'posts'));
    console.log(newPostKey);

    createUserWithEmailAndPassword(this.auth, email, password)
      .then((data) => {
        set(ref(db, 'users/' + data.user.uid), {
          data: this.data,
        })
          .then(() => {
            set(ref(db, 'users/' + data.user.uid + '/data/Personal_Details/'), {
              user_id: data.user.uid,
              batch: batch,
              email: email,
              first_name: fname,
              last_name: lname,
              website: '',
              about: ''
            });
          })
          .then(() => {
            set(ref(db, 'photos/' + data.user.uid ), {
              photo_url: 'https://bootdey.com/img/Content/avatar/avatar7.png',
            });
          })
          .then(() => {
            const newPostKey = push(
              child(ref(db), 'batch/' + batch + '/users/')
            ).key;
            set(ref(db, 'batch/' + batch + '/users/' + newPostKey), {
              id: data.user.uid,
            });
          })
          .then(() => {
            sendEmailVerification(this.auth.currentUser).then(() => {
              this.route.navigate(['/verification-email']);
              console.log('signed up');
            }).then(()=>{
              this.sigining = false;
            })
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        this.error = error;
      });
  }
}
