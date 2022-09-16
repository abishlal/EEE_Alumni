import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  
  localdb:any={
    "viki":{
      
        "Personal_Details": {
            "fullname": "vignesh A",
            "eMail": "",
            "phone": "",
            "website": ""
        },
     
        "Social_media1": {
            "site": "Instagram",
            "link": ""
        },
        "Social_media2": {
            "site": "Github",
            "link": ""
        },
        "Work_experience": [{
            "Organisation_name": "hcl",
            "Job_role": "embedded engineer",
            "From": "2020",
            "Till": "2021",
            "Job_Description": ""
        },
        {
            "Organisation_name": "infosys",
            "Job_role": "system engineer",
            "From": "2022",
            "Till": "2023",
            "Job_Description": ""
        },
        {
            "Organisation_name": "soliton",
            "Job_role": "project engineer",
            "From": "2023",
            "Till": "present",
            "Job_Description": ""
        }]
      ,  

      "Academic_details": [{
        "Organisation_name": "rvmhss",
        "Specialisation": "10th",
        "From": "2017",
        "Till": "2018",
        "Academic_Description": ""
      },
      {"Organisation_name": "rvmhss",
      "Specialisation": "12th",
      "From": "2018",
      "Till": "2019",
      "Academic_Description": ""
      },
      {"Organisation_name": "sjce",
      "Specialisation": "EEE",
      "From": "2019",
      "Till": "2023",
      "Academic_Description": ""
      }
      ]
    },
    "abishlal":{
      
      "Personal_Details": {
          "fullname": "Abishlal N S",
          "eMail": "",
          "phone": "",
          "website": ""
      },
      "Academic_details": [
        {"Organisation_name": "sjce",
        "Specialisation": "EEE",
        "From": "2019",
        "Till": "2023",
        "Academic_Description": ""
        }
        ],
      "Work_experience": [{
          "Organisation_name": "zoho",
          "Job_role": "web developer",
          "From": "2020",
          "Till": "2021",
          "Job_Description": ""
      },
      
      {
          "Organisation_name": "tcs",
          "Job_role": "system engineer",
          "From": "2022",
          "Till": "2023",
          "Job_Description": ""
      },
      {
          "Organisation_name": "soliton",
          "Job_role": "project engineer",
          "From": "2023",
          "Till": "present",
          "Job_Description": ""
      }],
      "Social_media2": {
          "site": "Github",
          "link": ""
      },"Social_media1": {
        "site": "Instagram",
        "link": ""
    }
  }
  
  }
  user:any|undefined;
  constructor(private route: ActivatedRoute) {
    
  }

  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    if(id && id in this.localdb)
    this.user=this.localdb[id]
    else
    this.user=this.localdb["viki"]
    
}
}
