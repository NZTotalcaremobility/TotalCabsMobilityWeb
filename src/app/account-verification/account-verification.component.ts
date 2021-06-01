import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {UserService } from '../services/user.service';
@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss']
})
export class AccountVerificationComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,private toastr:ToastrService,private userservice:UserService) { }
  @BlockUI() blockUI: NgBlockUI;
token:string;
show:Boolean=false;
  ngOnInit() {
    if (localStorage.user_login!=undefined) {

      this.router.navigate([''])

    }
    this.token= this.route.snapshot.params.token
    console.log(this.token,'token')
    this.verifyaccount()
  }

  verifyaccount()
  {

    this.blockUI.start('Please wait ...')

this.userservice.verifyaccount({token:this.token}).subscribe(result=>{
  this.blockUI.stop()
  if(result.code==200)
  {

    this.toastr.success(result.message)
    // this.show=true;
    // setTimeout(()=>{
      this.router.navigateByUrl('/login')
    // },4000)
  }
  else{

      this.show=false;
      this.toastr.error(result.message)
  }
})
  }

}
