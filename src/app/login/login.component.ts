import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getAuth,sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';
import { CurrentuseService } from '../currentuse.service';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  verify_error: any;
  error: any;
  message: string = '';
  auth: any = getAuth();

  constructor(private route: Router, private curuser: CurrentuseService) {
  }

  ngOnInit(): void {}

  loading :boolean = false
  login: any = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  onsubmit() {
    this.loading = true
    let email = this.login.value.email;
    let pass = this.login.value.pass;
    signInWithEmailAndPassword(this.auth, email, pass)
      .then((data) => {
        if (data.user.emailVerified) {
          this.message = 'sucessfull';
          this.route.navigate(['/edit-profile/fromuser']);
        } else {
          sendEmailVerification(this.auth.currentUser).then(() => {
            console.log("verification sent");
            this.loading = false
            this.verify_error = 'Kindly verify your Email id to login. Verification link has been sent to your mail id';
          }).catch((err)=>{
            this.loading = false
            this.verify_error= err.message
          })
          
        }
      })
      .catch((error) => {
        this.message = '';
        this.error = error;
      });
  }
}
