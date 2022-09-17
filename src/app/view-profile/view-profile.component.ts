import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDatabase, ref, onValue } from 'firebase/database';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  
  localdb:any={
    "Academic_details": [],
    "Personal_Details": {
        "email": "abishlal",
        "fullname": "abishlal",
        "phone": "abishlal",
        "website": "abishlal"
    },
    "Social_media": [],
    "Work_experience": []
  }
  user:any=this.localdb["viki"];
  constructor(private route: ActivatedRoute) {
    let val: any;
    const db = getDatabase();
    const starCountRef = ref(db, 'users');
    onValue(starCountRef, (snapshot) => {
      val = snapshot.val();
      const id = this.route.snapshot.paramMap.get('id');
      console.log(id)
      if(id && id in val){
        this.user=val[id].data;
        console.log(val[id].data);
      }
 
    });
    
  }

  
  ngOnInit(): void {
      
}
}
