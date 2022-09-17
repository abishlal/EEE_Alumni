import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


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
  submitForm(val:any,type:string){
    // e.preventdefault();
    if(type=='user')this.router.navigateByUrl('/edit-profile');
    console.log(val);
  }
}
