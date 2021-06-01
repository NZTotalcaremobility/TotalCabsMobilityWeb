import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment.prod';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonService } from './../../services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMobileTopMenu: Boolean = false;
  isSubmited: Boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  errorflag: Boolean = true;
  loader: boolean = false
  id: any;
  data: any;
  driverdata: any;
  customerdata: any;
  profile: any;
  environment = environment;
  deleteConfirmation: boolean;
  customerId: any;
  display: boolean = false

  constructor(public commonservice: CommonService, private router: Router, private formBuilder: FormBuilder, private userservice: UserService, private toastr: ToastrService) { }


  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('user_login'));
    this.customerId = data.userId;
  }

  displayDialogue() {
    this.deleteConfirmation = true
    this.customerId = this.id
  }


  deleteAccount() {
    this.loader = true;
    this.userservice.deleteaccount({ _id: this.customerId }).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == 200) {

        this.deleteConfirmation = false
        console.log(res.message, "res.message");

        this.toastr.success(res.message);
        localStorage.removeItem('user_login')
        this.router.navigate(['/login']);
      }
      else {
        // this.getfaqlist();
        this.deleteConfirmation = false
        this.toastr.error(res.message);
      }
    })
  }

}
