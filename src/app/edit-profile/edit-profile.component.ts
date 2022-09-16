import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  
  workexperience:number[]=[1,2];
 
  constructor() { 
    
  }

  ngOnInit(): void {
  
  }
  addExperience(){
    this.workexperience.push(this.workexperience.length+1);
  }
  removeExperience(){
    this.workexperience.pop();
  }
  
  submitForm(val:any){
    // e.preventdefault();
    console.log(val);
  }
}
