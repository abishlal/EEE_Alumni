import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, set, onValue, update } from 'firebase/database';
import * as refr from 'firebase/storage';
import { CurrentuseService } from '../currentuse.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  pending:boolean=false;
  success:boolean=false;
  failure:boolean=false;
  userid:string|undefined;
  adminlogin:boolean=false;
  online:boolean=true;
  adminid:string="0LJ3kwiqQxWBoEB7rcUAGJiWd8r2"
  constructor(private cur_user: CurrentuseService,private route: ActivatedRoute) {
    const db = getDatabase();
    const connectedRef = ref(db, ".info/connected");
    onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        console.log("connected");
        this.online=true;
        const id = this.route.snapshot.paramMap.get('id');
        console.log(id);
         this.userid=(this.cur_user.user.uid==this.adminid && id)?id:this.cur_user.user.uid;
         console.log("userid "+ this.cur_user.user.uid);
         
         if(this.cur_user.user.uid==this.adminid)this.adminlogin=true;
          
        const starCountRef = ref(db, 'users/' + this.userid + '/data');
        
        onValue(starCountRef, (snapshot) => {
    
          console.log(snapshot.val());
          this.current_user = snapshot.val();
          this.userimgpath=this.current_user.Personal_Details.imgurl;
          console.log(this.current_user);
        });
      } else {
        console.log("not connected");
        this.online=false;
      }
    });
    
   

  }

  userimgpath: any;
  ngOnInit(): void {}
  userimgurl: any = 'https://firebasestorage.googleapis.com/v0/b/alumini-eee.appspot.com/o/users_img%2Fdummy_img%2Fuser.png?alt=media&token=153754fe-f528-4387-85cc-762e7c84af46';
  submitForm(form: any) {
    const val=form.value;
    const db = getDatabase();
    const connectedRef = ref(db, ".info/connected");
    onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        console.log("connected");
        if(form.valid)this.handledb(val,db);
      } else {
        console.log("not connected");
        this.failure=true;
      }
    });
        
  }
  handledb(val:any,db:any){
    console.log(val);
    this.pending=true;

    const storage = refr.getStorage();
    const sto = refr.ref(storage, '/users_img/' + this.cur_user.user.uid + '/url');
    // this.loading = true;
    refr.uploadBytes(sto, this.path).then((snapshot) => {
      // this.loading = false;
      // this.sucess = true;
      console.log(snapshot.ref.fullPath)
      refr.getDownloadURL(refr.ref(storage, snapshot.ref.fullPath)).then((url)=>{
        this.userimgurl = url
        console.log(url);
        

    // console.log(val);

    set(ref(db, 'photos/' + this.userid), {
      url: this.userimgurl
    });
    set(ref(db, 'users/' + this.userid), {
      data: this.convertSubmission(val),
    })
      .then((v) => {
        console.log('success');
        this.success = true;
        this.pending = false;
        setTimeout(() => {
          this.resetclass();
        }, 1000);
      })
      .catch((v) => {
        console.log('failure' + v);
        this.failure = true;
        this.pending = false;
        setTimeout(this.resetclass, 1000);
      });
      
    })
  })

  }
  resetclass() {
    this.success = false;
    this.pending = false;
    this.failure = false;
    console.log('reset');
  }
  getupdateclass() {
    if (this.pending) return 'loading-btn loading-btn--pending';
    if (this.success) return 'loading-btn loading-btn--success';
    if (this.failure) return 'loading-btn loading-btn--fail';
    return 'loading-btn';
  }
  convertSubmission(val: any): any {
    console.log(val);
    
    const vals: string[] = [
      'Academic_details',
      'Social_media',
      'Work_experience',
    ];
    const tempobj: any = {
      Personal_Details: { ...val.Personal_Details, imgurl: this.userimgurl },
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
    tempobj.Personal_Details.user_id=this.userid;
    if(!val.Personal_Details.type)tempobj.Personal_Details.type=this.current_user.Personal_Details.type
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
      about: '',
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

    const pic_ref = ref(db, 'photos/' + this.cur_user.user.uid + '/url');
    onValue(pic_ref, (url) => {
      this.userimgpath = url.val();
    });
  }
  add_Data(type: string) {
    console.log(this.current_user);
    if (type in this.current_user)
      this.current_user[type].push(this.current_user[type][0]);
    else this.current_user[type] = [this.tempval[type][0]];
  }
  remove_Data(type: string, pos: Number) {
    if (type in this.current_user) console.log(pos);

    this.current_user[type].splice(pos, 1);
  }

  path: any;

  uploadimg(event: any) {
    this.path = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.userimgpath = event.target?.result;
      };
    }
  }
}
