import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { json } from 'express';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {

  isSubmited: Boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  errorflag: Boolean = true;
  otpForm: FormGroup
  constructor(private router: Router, private formBuilder: FormBuilder, private userservice: UserService, private toastr: ToastrService) {
    // if (localStorage.user_login!=undefined) {

    //   this.router.navigate([''])

    // }
   }
 
 data ='';
  ngOnInit(): void {
     this.data=   JSON.parse(localStorage.getItem("phonenumber"));
    console.log("data",this.data);
    
    
    this.otpForm = this.formBuilder.group({

      password: ['', Validators.required],

    })
    
  }
  verification() {
    console.log("otp  form+++++++++++++--",this.otpForm.value.password);
    
    this.isSubmited = false;
    console.log(this.errorflag, 'real value')
    if (this.otpForm.invalid) {
      this.isSubmited = true;
      console.log('reached here at incorrect1')

      return;
    }
 let data1 ={
   phonenumber:this.data,
   password:this.otpForm.value.password

 }
    this.blockUI.start("Please wait ...")
    this.userservice.otpverification(data1).subscribe(result => {

      this.blockUI.stop()

      if (result.code == 200) {
        //this.userservice.setSession(result.data);

        this.otpForm.reset()
        this.toastr.success(result.message)

        this.router.navigate(['/register'])

      }
      else {
        this.toastr.error(result.message)
      }

    })
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    console.log(charCode, 'charCode++++')
    if (charCode > 31 && (charCode < 45 || charCode > 57)) {
      return false;
    }
    return true;

  }

}



