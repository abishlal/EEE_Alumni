import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  
  workexperience:number[]=[1];
  academicDetails:number[]=[1];
  socialMedia:number[]=[1];
 
  constructor() { 
    
  }

  ngOnInit(): void {
  
  }
  addExperience(){
    this.workexperience.push(this.workexperience.length+1);
  }
  removeExperience(pos:number){
    this.workexperience.splice(0,1);
  }
  addAcademicDetails(){
    this.academicDetails.push(this.academicDetails.length+1);
  }
  removeAcademicDetails(pos:number){
    this.academicDetails.splice(0,1);
  }
  addSocialMedia(){
    this.socialMedia.push(this.socialMedia.length+1);
  }
  removeSocialMedia(pos:number){
    this.socialMedia.splice(0,1);
  }
  submitForm(val:any){
    // e.preventdefault();
    console.log(val);
  }
}
