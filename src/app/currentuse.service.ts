import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class CurrentuseService {

  auth: any = getAuth();
  user:any

  constructor() { 
    onAuthStateChanged(this.auth, (user) => {
      this.user = user
    });
  }

}
