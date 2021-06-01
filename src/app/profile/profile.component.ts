import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { json } from 'express';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { environment } from '../../environments/environment'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isSubmited: Boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  errorflag: Boolean = true;
  profileForm: FormGroup
  loader: boolean;
  id: any;
  data: any;
  driverdata: any;
  customerdata: any;
  profile: any;
  environment = environment;
  deleteConfirmation: boolean;
  customerId: any;
  constructor(private router: Router, private formBuilder: FormBuilder, private userservice: UserService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({

      phonenumber: ['', Validators.compose([Validators.required])],


    })
    let data = JSON.parse(localStorage.getItem('user_login'));
    this.id = data.userId;
    console.log("ids--", data.userId)
    this.getProfile();
  }
  getProfile() {
    // alert("in profile");
    this.loader = true;
    if (this.id) {
      console.log("id---", this.id)
      this.userservice.getcustomerByid({ _id: this.id }).subscribe((res: any) => {
        this.loader = false;
        console.log("img-->", res.data)
        this.customerdata = res.data;
        this.profile = res.data.imagefile;
        console.log("data----", this.profile)
      })
    }
  }

}
