import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  
  workexperience:number[]=[1,2];
  @ViewChild("profileform") myNameElem: ElementRef|undefined;
 
  constructor() { 
    this.myNameElem?.nativeElement.addEventListener("click",()=>{
      console.log("submit");
      
    })
  }

  ngOnInit(): void {
  
  }
  addExperience(){
    this.workexperience.push(this.workexperience.length+1);
  }
  removeExperience(){
    this.workexperience.pop();
  }
  
  submitForm(){
    // e.preventdefault();
    // console.log(e);
    console.log(this.myNameElem?.nativeElement);
  }
}
