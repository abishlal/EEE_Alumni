import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CurrentuseService {

  auth: any = getAuth();
  user:any

  constructor() { 
    // onAuthStateChanged(this.auth, (user) => {
    //   this.user = user
    //   console.log(this.user)
    // });
  }

  getdata(){
    console.log(this.auth.currentUser)
  }


}
