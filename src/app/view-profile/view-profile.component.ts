import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDatabase, ref, onValue } from 'firebase/database';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  
  
  user: any 
  val:any
  constructor(private route: ActivatedRoute) {
    let val: any;
    const id = this.route.snapshot.paramMap.get('id');
    const db = getDatabase();
    const starCountRef = ref(db, 'users/' + id + '/data');
    onValue(starCountRef, (snapshot) => {
      val = snapshot.val();
      this.val = snapshot.val();
      console.log(val);
      if (id && id in val) {
        this.user = val[id].data;
        this.user.Work_experience = [
          this.user.Work_experience_1,
          this.user.Work_experience_2,
          this.user.Work_experience_3,
        ];
        this.user.Academic_details = [
          this.user.Academic_details_1,
          this.user.Academic_details_2,
          this.user.Academic_details_3,
        ];
        console.log(val[id].data);
      }
    });
  }

  ngOnInit(): void {}
}
