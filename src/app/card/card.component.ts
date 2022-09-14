import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDatabase, ref, onValue } from 'firebase/database';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  year:any;

  profile: any = [];

  constructor(public activateRoute : ActivatedRoute) {

    this.year= this.activateRoute.snapshot.paramMap.get("batch");

    let val: any;
    const db = getDatabase();
    const starCountRef = ref(db, 'users');
    onValue(starCountRef, (snapshot) => {
      val = snapshot.val();
      for (const iterator in val) {
        this.profile.push(val[iterator]);
      }
    });
  }

  ngOnInit(): void {
  }

}
