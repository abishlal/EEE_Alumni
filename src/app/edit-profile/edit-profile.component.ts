import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, set, onValue, update } from 'firebase/database';
import { CurrentuseService } from '../currentuse.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  pending:boolean=false;
  success:boolean=false;
  failure:boolean=false;
  constructor(private cur_user: CurrentuseService) {
    this.getuser();
  }

  ngOnInit(): void {}
  userimgurl:any="https://picsum.photos/id/100/500/300";
  submitForm(val: any) {
    // console.log(val);
    const db = getDatabase();
    this.pending=true;
    set(ref(db, 'photos/' + this.cur_user.user.uid), {
      url: this.userimgurl
    });
    set(ref(db, 'users/' + this.cur_user.user.uid), {
      data: this.convertSubmission(val),
    }).then((v)=>{

        console.log("success");
        this.success=true;
        this.pending=false;
        setTimeout(()=>{
          this.resetclass();
        },1000);
    
    }).catch((v)=>{
      console.log("failure"+v);
      this.failure=true;
      this.pending=false;
      setTimeout(this.resetclass,1000);
    });
  }
  resetclass(){
    this.success=false;
    this.pending=false;
    this.failure=false;
    console.log("reset");
    
  }
  getupdateclass(){

    if(this.pending)return 'loading-btn loading-btn--pending' 
    if(this.success) return 'loading-btn loading-btn--success'
    if(this.failure) return 'loading-btn loading-btn--fail'
    return 'loading-btn'
  }
  convertSubmission(val: any): any {
    const vals: string[] = [
      'Academic_details',
      'Social_media',
      'Work_experience',
    ];
    const tempobj: any = {
      Personal_Details: {...val.Personal_Details,"imgurl":this.userimgurl},
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
  remove_Data(type:string,pos:Number){
    if (type in this.current_user)
    console.log(pos);
    
      this.current_user[type].splice(pos,1);
      
  }
  userimgpath:any;
uploadimg(event:any){
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.userimgpath = event.target?.result;
    }
  }
  
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
