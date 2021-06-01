import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import{Router} from '@angular/router'
import { AbstractControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {UserService} from '../../services/user.service'

@Component({
  selector: 'app-signup-compnay',
  templateUrl: './signup-compnay.component.html',
  styleUrls: ['./signup-compnay.component.scss']
})
export class SignupCompnayComponent implements OnInit {
  isSubmited:Boolean=false;
  @BlockUI() blockUI: NgBlockUI;
  errorflag:Boolean=true;
  constructor(private router:Router,private formBuilder:FormBuilder,private userservice:UserService,private toastr:ToastrService) { }
  registrationForm:FormGroup
  display: boolean = false;

  display1:boolean=false;

  ngOnInit(): void {
    if (localStorage.user_login!=undefined) {

      this.router.navigate([''])

    }
    this.registrationForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      name: ['', Validators.compose([Validators.required,Validators.maxLength(16), Validators.pattern(/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i)])],
  
      lastname:['',Validators.required],
      companyname:['',Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
      confirmpassword:['',[Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    },
    {   validator: this.passwordConfirming })
  }

  passwordConfirming(c: AbstractControl): any {
    if (c.get('password').value !== c.get('confirmpassword').value) {
      // return {invalid: true};
      return c.get('confirmpassword').setErrors({ 'confirmError': true });
    }
  }
  showPrivacy() {
    this.display = true;
}

showTerms() {
  this.display1 = true;
}


  terms(value)
  {
    if(value.target.checked==true)
    {
      this.errorflag=false
    }
    else{
      this.errorflag=true
    }
  }

  register()
  {
    console.log("in register")
    
      this.isSubmited=false;
  if (this.registrationForm.invalid) {
  this.isSubmited = true;
  
  return;
  }
    
  if(this.registrationForm.invalid )
  {
 console.log("in valid")
    this.isSubmited=true;
    return
  }

  if(this.errorflag)
    {
      console.log("error flag")
      this.toastr.info('Please checked Privacy policy and Terms of service')
      this.isSubmited=true;
      return
    }
  console.log('reached here at correct time')
console.log("company n--",this.registrationForm.value)
this.blockUI.start("Please wait ...")
  this.userservice.signupcompany(this.registrationForm.value).subscribe(result=>{
    console.log("inserice")
    console.log('res--',result)
    this.blockUI.stop()

    if(result.code==200)
    {
      this.registrationForm.reset()
      this.toastr.success(result.message)
      setTimeout(()=>{
        this.router.navigateByUrl('/login')
      },3000)
    }
    else{
      this.toastr.error(result.message)
    }

  })
  }
}
