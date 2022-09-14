import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { CurrentuseService } from '../currentuse.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  auth = getAuth();
  userauth: any;

  constructor(private cur_user: CurrentuseService) {
    onAuthStateChanged(this.auth, (user) => {
      console.log(user)
      if(user?.emailVerified){
        this.userauth = user;
      }
      else{
        this.userauth = null
      }
    });
  }

  logout() {
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
