
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {UserService } from '../services/user.service';
import { AbstractControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  forgetForm: FormGroup;
  isSubmited:boolean = false;
  constructor(private router:Router,private formBuilder:FormBuilder,private userService:UserService,private toastr:ToastrService) { }

  ngOnInit() {
    if (localStorage.user_login!=undefined) {

      this.router.navigate([''])

    }
  this.forgetForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
  
    
  })
  
  }

  
submitForm()
{
   

  this.isSubmited = false;

  if (this.forgetForm.invalid) {
    this.isSubmited = true;
  
    return;
  }
  this.blockUI.start('Please wait....')

  this.userService.forgetPassword(this.forgetForm.value).subscribe(result =>{
    if(result.code==200)
    {
    
      this.blockUI.stop()
      this.toastr.success(result.message)  
      this.forgetForm.reset()

            // this.router.navigateByUrl('/dashboard/analytics');
    }
    else if(result.code==402){
      this.blockUI.stop()
      this.toastr.error(result.message)
     

    }
    else if(result.code==500)
    {
      this.blockUI.stop()
        this.toastr.error(result.message)
       
    }

  })

}


}


