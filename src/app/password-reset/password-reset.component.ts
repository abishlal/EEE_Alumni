import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent implements OnInit {
  error: any;
  message: string = '';
  auth: any = getAuth();

  constructor(private route: Router) {}

  ngOnInit(): void {}

  login: any = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  onsubmit() {
    let email = this.login.value.email;
    console.log(email);
    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        this.route.navigate(['/verification-password'])
      })
      .catch((error) => {
        this.error = error;
      });
  }
}
