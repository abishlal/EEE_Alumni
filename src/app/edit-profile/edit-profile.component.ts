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
      data: val,
    });
  }

  current_user: any;
  getuser() {
    const db = getDatabase();
    const starCountRef = ref(db, 'users/' + this.cur_user.user.uid + '/data');
    onValue(starCountRef, (snapshot) => {
      console.log(snapshot.val());
      this.current_user = snapshot.val();
    });
  }
}
