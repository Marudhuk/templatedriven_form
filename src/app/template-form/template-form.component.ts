import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from '../data';
import { TemplateService } from '../template.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  @ViewChild('templateForm') templateForm!: NgForm;
  visible=false;
  id!:number;
  user: any;
  userDataById: any;
  countryList = ["India", "USA", "Finland"]
  // obj=new Data("Marudhu","K","marudhu@gmail.com","male",true,"India");
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  gender: string = '';
  married: boolean = false;
  country: string = '';

  constructor(private service: TemplateService) { }

  ngOnInit(): void {
    this.getTemplateData();
  }
  getTemplateData() {
    this.service.getTemplateData().subscribe(data => {
      this.user = data
      console.log(this.user, "get data");
      this.user.forEach((element: any) => {
        element.married = element.married == 1 ? "Married" : "Unmarried";
      })
  })
}

  onSubmit(templateFormValue: any) {
    console.log(templateFormValue.value);
    this.service.postData(templateFormValue.value).subscribe(data => {
      console.log(data, "posted");
    });
    setTimeout(() => {
      this.getTemplateData();
    }, 500);
    // this.firstname = '';
    // this.lastname = '';
    // this.email = '';
    // this.gender = '';
    // this.married = false;
    // this.country = '';
    this.templateForm.reset();
  }
  editData(id: number) {
    this.visible=true;
    this.id=id;
    this.service.getTemplateDataById(id).subscribe(data => {
      this.userDataById = data;
      console.log(this.userDataById, "edit data by ", id);
      this.firstname = this.userDataById[0].firtsName;
      this.lastname = this.userDataById[0].lastName;
      this.email = this.userDataById[0].email;
      this.gender = this.userDataById[0].gender;
      this.married = this.userDataById[0].married;
      this.country = this.userDataById[0].country;
    })
  }
  updateData(templateForm:any){
    this.visible=false;
    this.service.updateTemplateData(this.id,templateForm.value).subscribe(data=>{
      console.log(data,"updated");
    })
    this.templateForm.reset();
    setTimeout(() => {
      this.getTemplateData();
    }, 500);
  }
  deleteData(id:number,data:string){
    this.service.deleteData(id,data).subscribe(data=>{
      console.log(data,"deleted");
    })
    this.getTemplateData();
  }
}
