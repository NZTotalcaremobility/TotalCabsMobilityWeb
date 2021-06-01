import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {UserService } from '../services/user.service';
import { AbstractControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {


  @BlockUI() blockUI: NgBlockUI;
  resetpasswordForm: FormGroup;
  isSubmited:boolean = false;
  token: any;
  constructor(private router:Router,private route: ActivatedRoute,private formBuilder:FormBuilder,private userService:UserService,private toastr:ToastrService) { }

  ngOnInit() {
    if (localStorage.user_login!=undefined) {

      this.router.navigate([''])

    }

    this.resetpasswordForm = this.formBuilder.group({
      
      Password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      
      ConfirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
     

    },
      { validator: this.passwordConfirming })

      this.route.params.subscribe(params => {
        this.token = params.token;
      })

  }



  passwordConfirming(c: AbstractControl): any {
    if (c.get('Password').value !== c.get('ConfirmPassword').value) {
      // return {invalid: true};
      return c.get('ConfirmPassword').setErrors({ 'confirmError': true });
    }
  }
  

  resetPassword()
  {
   
   
    this.isSubmited = false;
    if (this.resetpasswordForm.invalid) {
      this.isSubmited = true;
      return;
    }
    this.blockUI.start('Please wait')
    var data={
      ConfirmPassword:this.resetpasswordForm.value.ConfirmPassword,
      token:this.token
    }
    this.userService.resetPassword(data)
    .subscribe(result =>{

      if(result.code==200)
      {
        this.blockUI.stop()
        this.resetpasswordForm.reset()
        this.toastr.success(result.message)
        this.router.navigate(['/login'])
      }
    
    else if(result.code==402)
    {
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
