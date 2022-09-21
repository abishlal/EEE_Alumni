import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import {set,ref, Database, onValue,getDatabase} from 'firebase/database'
import {getAuth,
  createUserWithEmailAndPassword,signInWithEmailAndPassword
} from 'firebase/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  auth: any = getAuth();
showcard:boolean=true;
  userform:boolean=true;
  tempobj:any= {Personal_Details: {
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    website: '',
    about: '',
  }
}
batches:any=[];
displaybatches:any=[];
  constructor(private router: Router) {
    const db = getDatabase();
    const refr = ref(db, '/batch/' + this.end_year.value )
    onValue(refr, (snapshot) => {
      const val = snapshot.val();
      
      for (const key in val) {
        this.batches.push(key);
        this.displaybatches.push(val[key]);
      
      }
      console.log(this.displaybatches);
    });
  }


  ngOnInit(): void {
  }

  start_year = new FormControl('')
  end_year = new FormControl('')

  onsubmit(){
    const db = getDatabase();
    const refr = ref(db, '/batch/' + this.end_year.value )
    set(refr,{
      start_year : this.start_year.value,
      end_year : this.end_year.value
    }).then(()=>{
      console.log("created")
    })
  }

  submitForm(val:any,type:string){
    if(type=='user'){
      const db = getDatabase();
    this.tempobj.Personal_Details.email=val.email;
    
    createUserWithEmailAndPassword(this.auth, val.email, val.password)
      .then((data) => {
        set(ref(db, 'users/' + data.user.uid), {
          data: this.tempobj
        }).then(()=>{
          console.log("user created")
        })
        const batchrefr = ref(db, '/batch/' + val.batch +'/users/'+data.user.uid)//add uid
    
        set(batchrefr,{
          id:data.user.uid
        }).then(()=>{
          console.log("user added to batch")
        })
        
        signInWithEmailAndPassword(this.auth,"vignesharivazhagan1409@gmail.com","mypassword")
      .then((d) => {
        console.log(d.user.uid,data.user.uid);
        
        this.router.navigateByUrl('/edit-profile/'+data.user.uid);
      })

      })


    }
    console.log(val);
  }
}
