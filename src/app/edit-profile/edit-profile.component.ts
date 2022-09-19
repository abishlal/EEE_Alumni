import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, set, onValue, update } from 'firebase/database';
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
    // console.log(val);
    const db = getDatabase();

    set(ref(db, 'users/' + this.cur_user.user.uid), {
      data: this.convertSubmission(val),
    });
  }
  convertSubmission(val: any): any {
    const vals: string[] = [
      'Academic_details',
      'Social_media',
      'Work_experience',
    ];
    const tempobj: any = {
      Personal_Details: val.Personal_Details,
      Academic_details: [],
      Social_media: [],
      Work_experience: [],
    };
    for (const k of vals) {
      for (const key in val) {
        if (key.startsWith(k)) {
          tempobj[k].push(val[key]);
        }
      }
    }
    // console.log(tempobj);

    return tempobj;
  }
  tempval: any = {
    Academic_details: [
      {
        Academic_Description: '',
        From: '',
        Organisation_name: '',
        Specialisation: '',
        Till: '',
      },
    ],
    Personal_Details: {
      email: '',
      first_name: '',
      last_name: '',
      phone: '',
      website: '',
      about:''
    },
    Social_media: [
      {
        link: '',
        site: '',
      },
    ],
    Work_experience: [
      {
        From: '',
        Job_Description: '',
        Job_role: '',
        Organisation_name: '',
        Till: '',
      },
    ],
  };
  current_user: any = this.tempval;
  getuser() {
    const db = getDatabase();
    const starCountRef = ref(db, 'users/' + this.cur_user.user.uid + '/data');
    onValue(starCountRef, (snapshot) => {
      console.log(snapshot.val());
      this.current_user = snapshot.val();
      console.log(this.current_user);
    });
  }
  add_Data(type: string) {
    console.log(this.current_user);
    if (type in this.current_user)
      this.current_user[type].push(this.current_user[type][0]);
    else this.current_user[type] = [this.tempval[type][0]];
  }

  upload() {
    console.log('upload');
    const db = getDatabase();

    // A post entry.
    const postData = 'abishlsl';

    const updates: any = {};
    updates[
      'users/' + this.cur_user.user.uid + '/data/Personal_Details/photo/url/'
    ] = postData;

    update(ref(db), updates);
  }
}
