import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDatabase, ref, onValue } from 'firebase/database';
import {Router} from '@angular/router';
import { CurrentuseService } from '../currentuse.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {
  
  user:any|undefined;
  userexists:boolean=false;
  initialpageload:boolean=true;
  userid:string|undefined;
  editable:boolean=false;
  constructor(private cur_user: CurrentuseService,private route: ActivatedRoute,private router: Router) {
    let val: any;
    const db = getDatabase();
    const starCountRef = ref(db, 'users/');
    onValue(starCountRef, (snapshot) => {
      val = snapshot.val();
      const id = this.route.snapshot.paramMap.get('id');
      if(id)this.userid=id;
      if(sessionStorage.getItem("loggedin")=="true" && id==this.cur_user.user.uid || id=="adminid")this.editable=true;
      console.log(id)
      this.initialpageload=false;
      if(id && id in val){
        this.user=val[id].data;
        this.userexists=true;
        console.log(val[id].data);
      }

    });
  }
  editbutton(){
    this.router.navigateByUrl('/edit-profile/'+this.userid);
  }
  ngOnInit(): void {}
}
