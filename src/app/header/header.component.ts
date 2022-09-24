import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  auth = getAuth();
  userauth: any;

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      if(user?.emailVerified){
        this.userauth = user;
      }
      else{
        this.userauth = null
      }
    });
  }

  logout() {
    sessionStorage.setItem("loggedin","false");

    signOut(this.auth)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        // An error happened.
      });
  }
  ngOnInit(): void {}
}
