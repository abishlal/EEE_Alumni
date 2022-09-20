import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDatabase, ref, onValue } from 'firebase/database';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {
  
  user:any|undefined;
  userexists:boolean=false;
  initialpageload:boolean=true;
  constructor(private route: ActivatedRoute) {
    let val: any;
    const db = getDatabase();
    const starCountRef = ref(db, 'users/');
    onValue(starCountRef, (snapshot) => {
      val = snapshot.val();
      const id = this.route.snapshot.paramMap.get('id');
      
      console.log(id)
      this.initialpageload=false;
      if(id && id in val){
        this.user=val[id].data;
        this.userexists=true;
        console.log(val[id].data);
      }

    });
  }

  ngOnInit(): void {}
}
