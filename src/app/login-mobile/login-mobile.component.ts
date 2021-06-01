import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-mobile',
  templateUrl: './login-mobile.component.html',
  styleUrls: ['./login-mobile.component.scss']
})
export class LoginMobileComponent implements OnInit {
  isSubmited: Boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  errorflag: Boolean = true;
  userloginForm: FormGroup
  constructor(private router: Router, private formBuilder: FormBuilder, private userservice: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.user_login != undefined) {



      this.router.navigate([''])

    }

    this.userloginForm = this.formBuilder.group({

      phonenumber: ['', Validators.compose([Validators.required, Validators.minLength(8)])],

    })
  }

  login() {
    localStorage.setItem("phonenumber", JSON.stringify(this.userloginForm.value.phonenumber));
    this.isSubmited = false;
    console.log('reached here at incorrect', this.userloginForm.value)
    if (this.userloginForm.invalid) {
      this.isSubmited = true;
      console.log('reached here at incorrect1', this.userloginForm)

      return;
    }

    this.blockUI.start("Please wait ...")
    this.userservice.userlogin(this.userloginForm.value).subscribe(result => {

      this.blockUI.stop()

      if (result.code == 200) {
        this.router.navigateByUrl('/otp-verification')

        this.userloginForm.reset()
        this.toastr.success(result.message)

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
