import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CardComponent } from './card/card.component';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { EmailComponent } from './verification/email/email.component';
import { PasswordComponent } from './verification/password/password.component';
import { BatchComponent } from './batch/batch.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
const firebaseConfig = {
  apiKey: "AIzaSyAmuWyQ1u7XCkJNpSUl_c-m_MUHT4UKmQ8",
  authDomain: "alumini-eee.firebaseapp.com",
  projectId: "alumini-eee",
  storageBucket: "alumini-eee.appspot.com",
  messagingSenderId: "907458546548",
  appId: "1:907458546548:web:41b3669c62457868e4ba21",
  measurementId: "G-3L8S89QMVM",
  databaseURL: "https://alumini-eee-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    EditProfileComponent,
    CardComponent,
    PasswordResetComponent,
    EmailComponent,
    PasswordComponent,
    BatchComponent,
    ViewProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
