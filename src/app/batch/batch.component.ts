import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDatabase, ref, onValue } from 'firebase/database';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css'],
})
export class BatchComponent implements OnInit {

  batch: any = [];

  constructor(public activateRoute:ActivatedRoute) {

    let val: any;
    const db = getDatabase();
    const starCountRef = ref(db, 'batch');
    onValue(starCountRef, (snapshot) => {
      val = snapshot.val();
      for (const iterator in val) {
        this.batch.push(val[iterator]);
      }
    });
  }

  ngOnInit(): void {}
}
