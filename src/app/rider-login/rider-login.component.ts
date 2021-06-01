import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserService } from '../services/user.service';
import { AbstractControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
@Component({
  selector: 'app-rider-login',
  templateUrl: './rider-login.component.html',
  styleUrls: ['./rider-login.component.scss']
})
export class RiderLoginComponent implements OnInit {
  isSubmited: Boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  errorflag: Boolean = true;
  constructor(private router: Router, private _ActivatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private userservice: UserService, private toastr: ToastrService) { }
  loginForm: FormGroup

  ngOnInit(): void {


    if (localStorage.user_login) {
      this.router.navigate(['/user/page/profile']);
    }

    this.loginForm = this.formBuilder.group({
      // email: ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
    })
  }


  terms(value) {
    if (value.target.checked == true) {
      this.errorflag = false
    }
    else {
      this.errorflag = true
    }
  }

  login() {
    this.isSubmited = false;

    if (this.loginForm.invalid) {

      this.isSubmited = true;
      return
    }
    console.log('reached here at correct time')

    this.blockUI.start("Please wait ...")
    this.userservice.loginrider(this.loginForm.value).subscribe(result => {
      console.log("res--", result);
      this.blockUI.stop()

      if (result.code == 200) {
        this.loginForm.reset()
        this.toastr.success(result.message)
        this.userservice.setSession(result.data);
        this._ActivatedRoute.queryParams.subscribe(params => {
          if (params['url']) {
            return this.router.navigate([decodeURI(params['url'])])
          } else {
            return this.router.navigate(['/user/page/profile'])
          }
        })


      }
      else {
        this.toastr.error(result.message)
      }

    })
  }

}
