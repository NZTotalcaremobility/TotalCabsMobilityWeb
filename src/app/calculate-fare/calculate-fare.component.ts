import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculate-fare',
  templateUrl: './calculate-fare.component.html',
  styleUrls: ['./calculate-fare.component.scss']
})
export class CalculateFareComponent implements OnInit {

  calculateIsShown: boolean = false; // hidden by default
  rideTime: string = '';
  rideTimelater: boolean;
  btnCalculatefare: boolean = true;
  btnRideNow: boolean;
  stepTwo: boolean;
  confirmBook: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }


  calculateFare() {

    this.calculateIsShown = !this.calculateIsShown;
    this.btnCalculatefare = !this.btnCalculatefare;
    this.btnRideNow = !this.btnRideNow;
  }
  RidenowNext() {
    this.calculateIsShown = !this.calculateIsShown;
    this.stepTwo = !this.stepTwo;
    this.btnRideNow = !this.btnRideNow;
    this.confirmBook = !this.confirmBook;
  }
  // rideTime(value) {
  //   console.log(value);
  //   // this.order.type=value;
  // }
  onOptionsSelected(value: string) {
    // console.log("the selected value is " + value);
    this.rideTime = value;
    console.log(this.rideTime);
    if (this.rideTime == 'later') {
      this.rideTimelater = true;
    } else {
      this.rideTimelater = false;
    }
  }

}
