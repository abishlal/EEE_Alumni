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
        "Work_experience": [],
        "About":val.About
    };
      for (const k of vals) {
        
        for (const key in val) {
          if(key.startsWith(k)){
              
            tempobj[k].push(val[key]); 
          }

        }
      }
      console.log(tempobj);
      
      return tempobj;
      
  }
tempval:any={
  "About": "my about",
  "Academic_details": [
      {
          "Academic_Description": "",
          "From": "",
          "Organisation_name": "",
          "Specialisation": "",
          "Till": ""
      }
  ],
  "Personal_Details": {
      "email": "",
      "fullname": "abishlal",
      "phone": "abishlal",
      "website": "abishlal"
  },
  "Social_media": [
      {
          "link": "adas",
          "site": "Github"
      }
  ],
  "Work_experience": [
      {
          "From": "",
          "Job_Description": "",
          "Job_role": "",
          "Organisation_name": "",
          "Till": ""
      }
  ]
}
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
    console.log(this.current_user);
    if(type in this.current_user)
      this.current_user[type].push(this.current_user[type][0])
    else 
    this.current_user[type]=[this.tempval[type][0]];
  }
}
