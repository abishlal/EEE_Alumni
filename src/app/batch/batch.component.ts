import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDatabase, ref, onValue } from 'firebase/database';


@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./style.css','./batch.component.css'],
})
export class BatchComponent implements OnInit {
  activeSlideIndex:number=0;
  batch: any = [];
slidesLength:number=3;
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
    setInterval(()=>{
      this.activeindex=1+(this.activeindex+1)%11
    },1000)
  }
  activeindex:number=2;
  getimgsrc(i:number){
    return "assets/images/eee/"+(i+1)+".jpg"
  }
  ngOnInit() {
  }
 
}
