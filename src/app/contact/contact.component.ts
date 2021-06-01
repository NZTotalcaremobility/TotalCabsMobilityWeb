import { OnlyCharFieldValidator } from './../shared/validation/validations.validator';
import { CommonService } from './../services/common.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  contactForm: FormGroup;
  isSubmited: boolean = false;
  constructor(private router: Router, private formBuilder: FormBuilder, private userService: CommonService, private toastr: ToastrService) {
    this.contactForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      fullName: ['', Validators.compose([Validators.required, OnlyCharFieldValidator.validOnlyCharField])],
      contactNo: ['', Validators.compose([Validators.required, Validators.pattern(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/)])],
      enquiry: ['', Validators.required],
    })

  }

  ngOnInit() {
  }


  submitForm() {
    this.isSubmited = false;
    if (this.contactForm.invalid) {
      this.isSubmited = true;
      return;
    }
    this.blockUI.start('Please wait....')
    console.log('value', this.contactForm)
    this.userService.contactSubmit(this.contactForm.value).subscribe(result => {
      this.blockUI.stop()
      if (result.code === 500) {
        this.toastr.error(result.message)
        return false
      }
      this.toastr.success(result.msg)
      this.contactForm.reset()
    })
  }
}
