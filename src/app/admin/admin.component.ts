import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import {set,ref, Database, getDatabase} from 'firebase/database'


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  showcard:boolean=true;
  userform:boolean=true;
  constructor(private router: Router) {}


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
    // e.preventdefault();
    if(type=='user')this.router.navigateByUrl('/edit-profile/fromadmin');
    console.log(val);
  }
}
