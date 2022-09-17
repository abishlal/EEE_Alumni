import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private route: Router) {}

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

  // data: any = {
  //   Personal_Details: {
  //     eMail: '',
  //     first_name: '',
  //     last_name: '',
  //     phone: '',
  //     website: '',
  //   },
  //   Academic_details_1: {
  //     Academic_Description: '',
  //     From: '',
  //     Organisation_name: '',
  //     Specialisation: '',
  //     Till: '',
  //   },
  //   Academic_details_2: {
  //     Academic_Description: '',
  //     From: '',
  //     Organisation_name: '',
  //     Specialisation: '',
  //     Till: '',
  //   },
  //   Academic_details_3: {
  //     Academic_Description: '',
  //     From: '',
  //     Organisation_name: '',
  //     Specialisation: '',
  //     Till: '',
  //   },
  //   Academic_details_4: {
  //     Academic_Description: '',
  //     From: '',
  //     Organisation_name: '',
  //     Specialisation: '',
  //     Till: '',
  //   },
  //   Work_experience_1: {
  //     From: '',
  //     Job_Description: '',
  //     Job_role: 'sdf',
  //     Organisation_name: '',
  //     Till: '',
  //   },
  //   Work_experience_2: {
  //     From: '',
  //     Job_Description: '',
  //     Job_role: 'sdf',
  //     Organisation_name: '',
  //     Till: '',
  //   },
  //   Work_experience_3: {
  //     From: '',
  //     Job_Description: '',
  //     Job_role: 'sdf',
  //     Organisation_name: '',
  //     Till: '',
  //   },
  //   Work_experience_4: {
  //     From: '',
  //     Job_Description: '',
  //     Job_role: 'sdf',
  //     Organisation_name: '',
  //     Till: '',
  //   },
  //   Social_media_1: { link: '', site: '' },
  //   Social_media_2: { link: '', site: '' },
  //   Social_media_3: { link: '', site: '' },
  //   Social_media_4: { link: '', site: '' },
  // };

  onsubmit() {
    let fname = this.Signup.value.fname;
    let lname = this.Signup.value.lname;
    let email = this.Signup.value.email;
    let password = this.Signup.value.pass;
    const db = getDatabase();

    createUserWithEmailAndPassword(this.auth, email, password)
      .then((data) => {
        // set(ref(db, 'users/' + data.user.uid), {
        //   data: this.data,
        // });
        set(ref(db, 'users/' + data.user.uid + '/data/Personal_Details/'), {
          user_id: data.user.uid,
          batch: "",
          eMail: email,
          first_name: fname,
          last_name: lname
        })
          .then(() => {
            sendEmailVerification(this.auth.currentUser).then(() => {
              this.route.navigate(['/verification-email']);
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
