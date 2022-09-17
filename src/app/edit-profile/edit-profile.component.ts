import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { CurrentuseService } from '../currentuse.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  constructor(private cur_user: CurrentuseService) {
    this.getuser();
  }

  ngOnInit(): void {}
  submitForm(val: any) {
    console.log(val);
    const db = getDatabase();
    
    set(ref(db, 'users/' + this.cur_user.user.uid), {
      data:this.convertSubmission(val),
    });
  }
  convertSubmission(val: any):any{
      const vals:string[]=['Academic_details',"Social_media","Work_experience"];
      const tempobj:any={
        "Personal_Details": val.Personal_Details,
        "Academic_details": [],
        "Social_media": [],
        "Work_experience": []
    };
      for (const k of vals) {
        
        for (const key in val) {
          if(key.startsWith(k)){
              
              tempobj[k].push(val[key]);
            
          }
        }
      }
      return tempobj;
      
  }
tempval:any={
  "Academic_details": [],
  "Personal_Details": {
      "eMail": "abishlal",
      "fullname": "abishlal",
      "phone": "abishlal",
      "website": "abishlal"
  },
  "Social_media": [],
  "Work_experience": []
};
  current_user:any=this.tempval;
  getuser() {
    const db = getDatabase();
    const starCountRef = ref(db, 'users/' + this.cur_user.user.uid + '/data');
    onValue(starCountRef, (snapshot) => {
      console.log(snapshot.val());
      this.current_user = snapshot.val();
      console.log(this.current_user);
      
    });
  }
  add_Data(type:string){
    this.current_user[type].push(this.current_user[type][0])
  }
}
