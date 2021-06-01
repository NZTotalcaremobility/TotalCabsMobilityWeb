import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
//import { Router } from 'express';
import { Router } from '@angular/router';
import { SearchboxserviceService } from '../../searchbox/searchboxservice.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-taxilisting',
  templateUrl: './taxilisting.component.html',
  styleUrls: ['./taxilisting.component.scss']
})
export class TaxilistingComponent implements OnInit {
  @Output() chooseTaxi = new EventEmitter<any>();
  @Input() public data: any;
  @Input() public isLoading: any = []
  @Input() public isDataLoaded: any = []
  @ViewChild('price')
  public priceElementRef: ElementRef
  driverlatitude: any;
  driverlongitude: any;
  kilometerdistance: any = null;
  latitude: any = null;
  longitude: any = null;
  taxilisting: any = this.data?.taxilisting


  distance: any = null;
  constructor(private distancedata: SearchboxserviceService, private route: Router, private userservice: UserService) {

  }
  // Edit(Id: number) {
  //   console.log("hhhhh",Id);
  //   this.route.navigate(['/doctor/doctor-Add'], { queryParams: { userId: Id } });
  //   }
  userData = ''
  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('user_login'));
    // console.log("data lisiting+++--",data);
    this.userData = data.userId
    console.log("userDData--", this.userData);


    this.riderData();
    //console.log("latitide---",this.longitude);

    this.DrverData();
    this.getDistance()
    this.distancedata.getdistance.subscribe((res: any) => {
      if (res != undefined) {
        console.log("distancedata---+", res)
        this.distance = res.rows[0].elements[0].distance.text;
        this.distance = this.distance.split(" ", 1);

        this.kilometerdistance = parseFloat(this.distance) / 0.621371;
        this.kilometerdistance = this.kilometerdistance.toFixed(2)
        console.log("km--", this.kilometerdistance);

        //console.log("diii--", this.distance);
        this.taxilisting[0].price = `$${(parseFloat(this.distance) * 3.5).toFixed(2)}`
        this.taxilisting[1].price = `$${(parseFloat(this.distance) * 4.5).toFixed(2)}`
        this.taxilisting[2].price = `$${(parseFloat(this.distance) * 4.5).toFixed(2)}`
      }
    })
  }
  riderData() {
    this.userservice.getBookingrecent({ jobid: this.userData }).subscribe((res: any) => {
      console.log("riderequesdata>>>>--", res.data.jobid.pickupLocation);
      this.latitude = res.data.jobid.pickupLocation.coordinates[0];
      this.longitude = res.data.jobid.pickupLocation.coordinates[1];

      console.log("longitude--", this.longitude);

    })
  }
  DrverData() {
    console.log('driverrr', this.longitude);

    this.userservice.getDriver(this.userData).subscribe((res: any) => {
      console.log("alll driver--", res.data);
      this.taxilisting[1].taxitype = `${res.data.data[0].carType}`
      this.driverlatitude = res.data.data[0].currentLocation.coordinates[0];
      this.driverlongitude = res.data.data[0].currentLocation.coordinates[1]


    })
  }


  getDistance() {
    console.log("in distance");

    let locationdata = {
      driverlatitude: this.driverlatitude,
      driverlongitude: this.driverlongitude,
      latitude: this.latitude,
      longitude: this.longitude
    }
    this.userservice.getdistance2(locationdata).subscribe((res) => {
      console.log("disssss__-----", res.data);
      this.taxilisting[0].time = `${res.data.rows[0].elements[0].duration.text}`
      this.taxilisting[1].time = `${res.data.rows[0].elements[0].duration.text}`
      this.taxilisting[2].time = `${res.data.rows[0].elements[0].duration.text}`


    })
  }

  selectedTaxi(data) {
    this.chooseTaxi.emit(data);
  }

}
