import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {UserService } from '../services/user.service';
import { AbstractControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  isSubmited: Boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  errorflag: Boolean = true;
  passwordForm: FormGroup
  id:any;
  //isSubmited: Boolean = false;
  loader: boolean;
  customerdata: any;
  newpassword:any;
  confirmpassword:any;
  constructor(private router:Router,private formBuilder:FormBuilder,private userservice:UserService,private toastr:ToastrService) { }



  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
      newpassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
      confirmpassword:['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
    });
    let data =  JSON.parse( localStorage.getItem('user_login'));

    console.log("uerdata--",data);
    this.id= data.userId;
    this.getProfile();

  }
  getProfile(){
   // alert("in profile");
    this.loader = true;
    if(this.id){
      console.log("id---",this.id)
      this.userservice.getcustomerByid({_id: this.id}).subscribe((res: any) => {
        this.loader = false;
        console.log("img-->",res.data.data.password)
        this.customerdata = res.data.data;
        this.passwordForm.patchValue({
  
      
          
          
    
        })
      })
    }
  }
  update()
  {
    this.isSubmited=false;
if (this.passwordForm.invalid) {
this.isSubmited = true;

return;
}
    if (this.passwordForm.valid) {
      let formModel = {id:this.id,password:this.passwordForm.get('password').value,newpassword:this.passwordForm.get('newpassword').value,confirmpassword:this.passwordForm.get('confirmpassword').value}
      this.userservice.changepassword(formModel).subscribe((res: any) => {
        if (res && res.code ==200) {
          this.toastr.success(res.message);
          this.passwordForm.reset();
        //  this.routers.navigate(['']);
        } else {
          console.log("Add Faq Error")
          this.toastr.error(res.message);
        }
      })
    }
  }
  private prepareSave(): any {
    let inputData = new FormData();
    
    inputData.append('pasword', this.passwordForm.get('password').value);
    inputData.append('newpasword', this.passwordForm.get('newpassword').value);
    inputData.append('confirmpassword', this.passwordForm.get('confirmpassword').value);
    console.log(this.passwordForm.get('password').value);
    inputData.append('_id', this.id);

    // inputData.append('roleName', "attendee");
    return inputData;
  }

}
