import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
import { AbstractControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-signup-individual',
  templateUrl: './signup-individual.component.html',
  styleUrls: ['./signup-individual.component.scss']
})
export class SignupIndividualComponent implements OnInit {

  isSubmited: Boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  errorflag: Boolean = true;
  otpForm: FormGroup

  registrationForm: FormGroup
  display: boolean = false;
  display1: boolean = false;
  otp: boolean = false
  isOtpVerified: boolean = false
  step: number = 0;
  currentUserData: any;



  constructor(private router: Router, private formBuilder: FormBuilder, private userservice: UserService, private toastr: ToastrService) {
    this.otpForm = this.formBuilder.group({
      password: ['', Validators.required],
    })

  }


  ngOnInit(): void {
    if (localStorage.user_login != undefined) {
      this.router.navigate(['/'])
    }

    this.registrationForm = this.formBuilder.group({
      // email: ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[0][1-9]\d{9}$|^[1-9]\d{9}$|^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      name: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
      confirmpassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    },
      { validator: this.passwordConfirming })
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


  terms(value) {
    if (value.target.checked == true) {
      this.errorflag = false
    }
    else {
      this.errorflag = true
    }
  }

  /*register() {

    this.isSubmited = false;

    const regex = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/

    if (this.registrationForm.invalid) {
      this.isSubmited = true;
      return false
    }

    if (this.errorflag) {
      this.toastr.info('Please checked Privacy policy and Terms of service')
      this.isSubmited = true;
      return
    }

    if (regex.test(this.registrationForm.controls['email'].value) && !this.isOtpVerified) {
      this.blockUI.start("Please wait ...")
      const { email, ...rest } = this.registrationForm.value;
      let finalData = rest;
      finalData.phonenumber = this.registrationForm.controls['email'].value;
       console.log("line 97");
       
      this.userservice.registerrider(finalData).subscribe(result => {
        console.log("line 100");
        
        this.blockUI.stop()
        if (result.code === 200) {
          this.otp = true
          this.toastr.success(result.message)
        }
        else {
          this.otp = false
          this.isOtpVerified = false;
          this.toastr.error(result.message)
        }
      })
      return false;

    } else if (regex.test(this.registrationForm.controls['email'].value) && this.isOtpVerified) {
      
      return false
    }

    this.blockUI.start("Please wait ...")

    const { email, ...rest } = this.registrationForm.value;
    let finalData = rest;
    if (regex.test(this.registrationForm.controls['email'].value)) {
      finalData.phonenumber = this.registrationForm.controls['email'].value;
    } else {
      finalData.email = this.registrationForm.controls['email'].value;
    }
console.log("line 129");

    this.userservice.registerrider(finalData).subscribe(result => {
      console.log("line 132");
      
      this.blockUI.stop()
      if (result.code === 200) {
        this.registrationForm.reset()
        this.toastr.success(result.message)
        setTimeout(() => {
          this.router.navigateByUrl('/login')
        }, 3000)
      }
      else {
        this.isOtpVerified = false;
        this.toastr.error(result.message)
      }
    })
  }*/

  register() {
    this.isSubmited = false;
    const regex = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
    if (this.registrationForm.invalid) {
      this.isSubmited = true;
      return false;
    }
    if (this.errorflag) {
      this.toastr.info('Please checked Privacy policy and Terms of service')
      this.isSubmited = true;
      return false;
    }
    if (regex.test(this.registrationForm.controls['email'].value) && !this.isOtpVerified) {
      const { email, ...rest } = this.registrationForm.value;
      const finalData = this.registrationForm.value;
      finalData.phonenumber = this.registrationForm.controls['email'].value;
      this.userservice.generateOtp(finalData).subscribe(result => {
        if (result && result.code === 200) {
          this.currentUserData = result.data;
          this.blockUI.stop();
          this.otp = true;
          this.toastr.success(result.message);
        } else {
          this.otp = false;
          this.isOtpVerified = false;
          this.toastr.error(result.message);
        }
        console.log('currentUserData---', this.currentUserData);
      });
    } else if (regex.test(this.registrationForm.controls['email'].value) && this.isOtpVerified) {
      console.log('kkkkkkkkkkkkkkkkk')
      return false;
    } else {
      console.log('vvvvvvvvvvvvvvvvvvv');
      const { email, ...rest } = this.registrationForm.value;
      const finalData = this.registrationForm.value;
      finalData.email = this.registrationForm.controls['email'].value;
      this.userservice.registerrider(finalData).subscribe(result => {
        console.log("line 132");
        
        this.blockUI.stop()
        if (result.code === 200) {
          this.registrationForm.reset()
          this.toastr.success(result.message)
          setTimeout(() => {
            this.router.navigateByUrl('/login')
          }, 3000)
        } else {
          this.isOtpVerified = false;
          this.toastr.error(result.message)
        }
      })

      return false;
    }
  }

  verification(): any {
    this.isSubmited = false;
    if (this.otpForm.invalid) {
      console.log('invalid');
      this.isSubmited = true;
      return false;
    } else if (this.registrationForm.controls['email'].value !== this.currentUserData.mobile) {
      console.log('invalid email', this.currentUserData.mobile, this.registrationForm.controls['email'].value);
      this.isSubmited = true;
      return false;
    } else if (this.otpForm.value.password !== (this.currentUserData.OTP).toString()) {
      this.isSubmited = true;
      return false;
    } else if (this.otpForm.value.password === (this.currentUserData.OTP).toString()) {
      const data = {
        name: this.registrationForm.controls['name'].value,
        mobile: this.registrationForm.controls['email'].value,
        password: this.registrationForm.controls['confirmpassword'].value
      };
      console.log('Mobile data ----', data);
      this.blockUI.start('Please wait ...');

      this.userservice.mobileRegistration(data).subscribe(result => {
        console.log('otpres-----', result);
        this.blockUI.stop();
        if (result.code === 200) {
          this.otpForm.reset();
          this.registrationForm.reset();
          this.isOtpVerified = true;
          this.otp = false;
          this.toastr.success(result['message']);
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 500);
        } else {
          this.toastr.error(result.message);
        }
      });
    }

    // const data1 = {
    //   phonenumber: this.registrationForm.controls['email'].value,
    //   password: this.otpForm.value.password
    // };

    // this.blockUI.start('Please wait ...');

    // this.userservice.otpverification(data1).subscribe(result => {
    //   console.log('otpres-----', result);
    //   this.blockUI.stop();
    //   if (result.code === 200) {
    //     this.otpForm.reset();
    //     this.registrationForm.reset();
    //     this.isOtpVerified = true;
    //     this.otp = false;
    //     this.toastr.success(result['message']);
    //     setTimeout(() => {
    //       this.router.navigateByUrl('/login');
    //     }, 500);
    //   } else {
    //     this.toastr.error(result.message);
    //   }
    // });
  }

  /*verification(): any {
    this.isSubmited = false;
    if (this.otpForm.invalid) {
      this.isSubmited = true;
      return false
    }
    let data1 = {
      phonenumber: this.registrationForm.controls['email'].value,
      password: this.otpForm.value.password
    }
   
    this.blockUI.start("Please wait ...")

    this.userservice.otpverification(data1).subscribe(result => {
      console.log("otpres--",result);
      
      this.blockUI.stop()
      if (result.code === 200) {
        this.otpForm.reset()
        this.registrationForm.reset();
        this.isOtpVerified = true;
        this.otp = false;
        this.toastr.success(result['message'])
        setTimeout(() => {
          this.router.navigateByUrl('/login')
        }, 500)
      } else {
        this.toastr.error(result.message)
      }
    })
  }*/

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    console.log(charCode, 'charCode++++')
    if (charCode > 31 && (charCode < 45 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
