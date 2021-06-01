import { OnlyCharFieldValidator } from './../shared/validation/validations.validator';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../services/user.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {

  careerForm: FormGroup;
  isSubmited: Boolean = false
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private _toastr: ToastrService

  ) {
    this.careerForm = fb.group({
      'fname': ['', Validators.compose([Validators.required, OnlyCharFieldValidator.validOnlyCharField])],
      'lname': ['', Validators.compose([Validators.required, OnlyCharFieldValidator.validOnlyCharField])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'phonenumber': ['', Validators.compose([Validators.required, Validators.pattern(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/)])],
      'isWeekend': ['', Validators.compose([Validators.required])],
      'pEndorsement': ['', Validators.compose([Validators.required])],
      'comments': ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
  }

  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };

  submitForm() {

    this.isSubmited = false;
    console.log(this.careerForm)
    this.markFormTouched(this.careerForm);
    if (this.careerForm.invalid) {
      this.isSubmited = true;
      return;
    }
    if (this.careerForm.valid) {
      this.service.careerData(this.careerForm.value).subscribe(res => {
        if (res && res.code === 200) {
          this.reset();
          this._toastr.success(res.message, "Career");
        } else {
          this._toastr.info(res.message, "Career");
        }
      }
      );
    }
  };
  reset() {
    this.careerForm.reset();
  };

}
