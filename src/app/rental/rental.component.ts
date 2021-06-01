import { Component, OnInit, TemplateRef } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnlyCharFieldValidator } from '../shared/validation/validations.validator'
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss']
})
export class RentalComponent implements OnInit {
  fleets = [
    {
      id: 1,
      avatar: '../../assets/images/car2.jpg',
      name: 'Ford Transit'
    }, {
      id: 2,
      avatar: '../../assets/images/car1.jpg',
      name: 'Toyota Hiace Wheelchair Van'
    }, {
      id: 3,
      avatar: '../../assets/images/car3.jpg',
      name: 'Toyota Camry'
    }, {
      id: 4,
      avatar: '../../assets/images/car4.jpg',
      name: 'Toyota Prius'
    }, {
      id: 5,
      avatar: '../../assets/images/9seater.jpg',
      name: '9 Seater Maxi'
    },
  ];
  placeHolder: boolean = false
  selectedFleet: any


  modalRef: BsModalRef;
  thefleet: OwlOptions = {
    loop: true,
    dots: false,
    navSpeed: 700,
    navText: ['ds', 'sdf'],
    nav: false,
    items: 1,
    autoplay: true,
    margin: 10,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      480: {
        items: 2,
        nav: false
      },
      767: {
        items: 3,
        nav: false
      },
      1000: {
        items: 4,
        nav: true,
        loop: false,
        margin: 30
      }
    },
  }
  rentalForm: FormGroup;
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private service: UserService,
    private _toastr: ToastrService

  ) {
    this.rentalForm = fb.group({
      'firstName': ['', Validators.compose([Validators.required, OnlyCharFieldValidator.validOnlyCharField])],
      'lastName': ['', Validators.compose([Validators.required, OnlyCharFieldValidator.validOnlyCharField])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'phonenumber': ['', Validators.compose([Validators.required, Validators.pattern(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/)])],
      'mobNo': ['', Validators.compose([Validators.required, Validators.pattern(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/)])],
      'pickDate': ['', Validators.compose([Validators.required])],
      'dropDate': ['', Validators.compose([Validators.required])],
      'equipment': ['', Validators.compose([Validators.required])],
      'noOfPassengers': ['', Validators.compose([Validators.required])],
      'enquiry': ['', Validators.compose([Validators.required])],
      'fleet': ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
  }


  handlselect(str: string): void {
    this.placeHolder = true
    this.rentalForm.controls['fleet'].setValue(str);
    this.rentalForm.controls['fleet'].markAsTouched();
  };

  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };

  submitForm() {
    this.markFormTouched(this.rentalForm);
    if (this.rentalForm.valid) {
      this.service.rentailData(this.rentalForm.value).subscribe(res => {
        if (res && res.code == 200) {

          this.reset();
          this._toastr.success(res.msg, "Rental");
        } else {
          this._toastr.info(res.message, "Rental");
        }
      }
      );

    }
  };
  reset() {
    this.rentalForm.reset();
  };
}
