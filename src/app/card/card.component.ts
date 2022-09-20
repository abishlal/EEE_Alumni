import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDatabase, ref, onValue, DataSnapshot } from 'firebase/database';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  year: any;

  profile: any = [];

  constructor(public activateRoute: ActivatedRoute) {
    this.year = this.activateRoute.snapshot.paramMap.get('batch');

    let val: any;
    const db = getDatabase();
    const starCountRef = ref(db, 'users');
    onValue(starCountRef, (snapshot) => {
      val = snapshot.val();
      for (const iterator in val) {
        this.profile.push(val[iterator]);
      }
      console.log(this.profile);
      
    if(this.year=="elite"){
      for (const user of this.profile) {
        if(user?.data?.Personal_Details?.type=='Elite'){
          this.user_data.push(user.data);
        }
      }
    }
    else
    this.get_user_id();
    });
    
  }

  user_data:any = [];
  get_user_id() {
    let val: any;
    const db = getDatabase();
    const refr = ref(db, 'batch/' + this.year + '/users');
    onValue(refr, (data) => {
      val = data.val();
      for (const iterator in val) {
        const url = ref(db, 'users/' + val[iterator].id + '/data' )
        onValue(url, (data)=>{
          this.user_data.push(data.val())
        })
      }
    });
    console.log(this.user_data)
  }

  ngOnInit(): void {}
}
