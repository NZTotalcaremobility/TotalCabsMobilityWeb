import { environment } from './../../environments/environment';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { DataserviceService } from '../search/dataservice.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { SearchboxserviceService } from '../searchbox/searchboxservice.service';
import { lang } from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as io from 'socket.io-client';
import { count } from 'console';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

declare const google: any;
@Component({
  selector: 'app-searchcab-map',
  templateUrl: './searchcab-map.component.html',
  styleUrls: ['./searchcab-map.component.scss']
})
export class SearchcabMapComponent implements OnInit {

  searchTaxi: Boolean = false;
  isLoading: Boolean = false;
  isDataLoaded: Boolean = false;
  avilableTaxi: Boolean = false;
  pickedTaxi: any;
  isStartFavourite: Boolean = false;
  isDestinationFavourite: Boolean = false
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  confirmModal: boolean;


  favoritelat: any;
  favoritelang: any;
  destinationfavoritelat: any;
  destinationfavoritelang: any;
  name: any;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  @ViewChild('destsearch')
  public destsearchElementRef: ElementRef;
  @ViewChild('price')
  public priceElementRef: ElementRef

  // @ViewChild('driversearch')
  // public driversearchElementRef: ElementRef;

  id: any;
  addres: this;
  favouritePickUpLocation: any = '';




  pickuplocation: any = null;
  droplocation: any = null;
  loader: boolean;
  data1: any;
  count: any = 0;
  favoriteDropLocation: any = '';

  socket: SocketIOClient.Socket;

  driverlocation: { latitude: number; longitude: number; address: string; };
  distance: any;
  kilometerdistance: any;
  timeDuration: any;
  duration: any;
  fare: any;
  driverid: any;
  bookingD: { pickupLocation: any; dropLocation: any; user: any; distance: any; duration: any; tax: number; count: number; fare: any; totalFare: number; taxiType: any; };
  bookingDate: any;
  scheduleBookingModal: boolean;
  sbForm: FormGroup;
  bookingTime: string;
  Bookingid: any;
  sourcedata: any;
  destinationdata: any;
  source: boolean = false
  pickupdata = '';

  listresult: any;
  aderss: string;
  pickdata: any;
  dropdata: any;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private data: DataserviceService,
    private userService: UserService,
    private toastr: ToastrService,
    private distancedata: SearchboxserviceService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, private navRoute: Router

  ) {
    this.sbForm = fb.group({
      'date': ['', Validators.compose([Validators.required])],
      'time': ['', Validators.compose([Validators.required])]
    });
  }





  @BlockUI() blockUI: NgBlockUI;
  ngOnInit() {

    let pickupdata = localStorage.getItem('pickuplocation')
    let dropoffdata = localStorage.getItem('dropLocation')
    //let pickdrop = JSON.stringify(localStorage.getItem('address'))
    this.pickupdata = pickupdata
    this.aderss = dropoffdata
    this.dropdata  = JSON.parse( this.aderss)
    this.pickdata = JSON.parse(this.pickupdata)

    console.log("pickup----??????//------->",this.pickdata.latitude);
    this.data.changePickup(this.pickdata);
    this.favouritePickUpLocation = this.pickdata.address
    this.favoriteDropLocation  =this.dropdata.address

    this.data.changeDestination(this.dropdata);
    if (this.pickupdata != null) {
      this.source = true
    }
    console.log("pickupppp+++++++", pickupdata);

    this.nowBooking();
    let data = JSON.parse(localStorage.getItem('user_login'));
    this.socket = io.connect(`${environment.socketUrl}/?userId=${data?.userId}`)
    this.id = data?.userId;

  //  this.getFavorite()
    this.socket.on('tripstatus', (tripsdata) => {

      console.log("data of trips-------", { tripsdata });

    })
    this.socket.on('Ongoingdata', (ondata) => {

      console.log("data of trips-------", { ondata });

    })


    this.socket.on('driverStatus', statusdata => {
      console.log("driver status--", statusdata);

      this.ngZone.run(() => {


        this.data.changeDestination({
          latitude: parseFloat(statusdata.latitude),
          longitude: parseFloat(statusdata.longitude), address: "", driver: true
        })


      })
    })
    this.socket.on('rideRequestStatus', socketdata => {
      console.log('hello in ride socket', socketdata)

      this.ngZone.run(() => {

        console.log(socketdata, 'live socket data')

        this.blockUI.stop()
        this.data.changeDestination({ latitude: socketdata.latitude, longitude: socketdata.longitude, address: "", driver: true })

        this.userService.getdriverdetails({ _id: socketdata.driver }).subscribe((res) => {
          console.log(res, 'getdriverdetails')
          this.driverid = res.data._id;
          console.log("driverrr--", this.driverid);

          localStorage.setItem("driverid", this.driverid)
          if (res.code == 200) {
            console.log(res.data)
            res.data.price = this.pickedTaxi.price
            console.log(res.data, 'changetaxidata')
            this.data.changetaxidata(res.data)
            this.data.changeConfirmTaxi(true);
          }
        })
      })

    })

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      // let price = this.priceElementRef.nativeElement
      // console.log("priiii--",price)



      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      let destination = new google.maps.places.Autocomplete(this.destsearchElementRef.nativeElement)
      // let driverdata = new google.maps.places.Autocomplete(this.driversearchElementRef.nativeElement)
      autocomplete.addListener("place_changed", () => {

        console.log("++++++++++++++++++++++")
        this.ngZone.run(() => {
          this.isStartFavourite = false
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.pickuplocation = {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
            address: place.formatted_address
          }
          console.log("pickup--------=", this.pickuplocation);


          this.data.changePickup(this.pickuplocation);

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;

        });
      });


      destination.addListener("place_changed", () => {


        this.ngZone.run(() => {
          this.isDestinationFavourite = false
          //get the place result
          let place: google.maps.places.PlaceResult = destination.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.droplocation = {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
            address: place.formatted_address
          }
          this.data.changeDestination(this.droplocation);
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();

          this.zoom = 12;
        });
      });
    });



  }
  getFavorite() {
    console.log("hi getfav----");

    this.loader = true;
    this.isStartFavourite = true;
    this.isDestinationFavourite = true;
    if (this.id) {

      this.userService.getFavoriteLocation({ _id: this.id }).subscribe((res: any) => {
        if (res['code'] === 200) {
          if (res.data.data.favoritePickupLocation.coordinates[1]) {
            // this.favouritePickUpLocation = null;
            this.pickuplocation = {
              latitude: res.data.data.favoritePickupLocation.coordinates[1],
              longitude: res.data.data.favoritePickupLocation.coordinates[0],
              address: res.data.data.favoritePickupLocation.address
            }
            this.data.changePickup(this.pickuplocation);
            this.favouritePickUpLocation = res.data.data.favoritePickupLocation.address
            // // this.pickuplocation = this.favouritePickUpLocation
          } else {
            this.isStartFavourite = null
          }
          if (res.data.data.favoriteDropLocation.coordinates[1]) {
            this.droplocation = {
              latitude: res.data.data.favoriteDropLocation.coordinates[1],
              longitude: res.data.data.favoriteDropLocation.coordinates[0],
              address: res.data.data.favoriteDropLocation.address
            }
            this.data.changeDestination(this.droplocation)
            this.favoriteDropLocation = res.data.data.favoriteDropLocation.address;
          }
          else {
            this.isDestinationFavourite = null;
          }

        }
        this.loader = false;
      })
    }
  }
  favouritePickUp() {
  
   
   
    if (!this.isStartFavourite) {
      if (this.pickuplocation != null) {

        this.isStartFavourite = true;
        let apiValue = {
          key: 'Pickup',
          loc: this.pickuplocation,
          id: this.id
        }
        this.userService.favorite(apiValue).subscribe(res => {

          this.toastr.success("Favorite location added.")
        }, err => {
          console.log(err);
        }
        );
      }
    } else {
      

        this.isStartFavourite = false;
        let apiValue = {
          key: 'Pickup',
          loc: 0,
          id: this.id
        }
        this.userService.unfavorite(apiValue).subscribe(res => {

          this.toastr.success("unFavorite location.")
        }, err => {
          console.log(err);
        }
        );
      
      console.log("in unfavorite");

      
     
    }

  }



  DestinationFavourite() {
    if (!this.isDestinationFavourite) {
      if (this.droplocation) {

        this.isDestinationFavourite = true;
        let apiValue = {
          key: 'drop',
          loc: this.droplocation,
          id: this.id
        }
        this.userService.favorite(apiValue).subscribe(res => {

          this.toastr.success("Favorite location added.")
        }, err => {
          console.log(err);
        }
        );
      }
    } else {
      this.isDestinationFavourite = false;
      let apiValue = {
        key: 'drop',
        loc: 0,
        id: this.id
      }
      this.userService.unfavorite(apiValue).subscribe(res => {

        this.toastr.success("favorite disabled")
      }, err => {
        console.log(err);
      }
      );
    }
  }

  nowBooking() {
    this.scheduleBookingModal = false
    this.bookingDate = new Date().toLocaleDateString();
    this.bookingTime = new Date().toLocaleTimeString();
    console.log("----------------", this.bookingDate);
    console.log("----------------", this.bookingTime);
  }
  schedueBooking() {
    this.scheduleBookingModal = true
  }
  close() {
    this.scheduleBookingModal = false;
  }
  scheduleBookingData() {
    this.close();
  }

  confirmAndBookNow() {
    if (!localStorage.getItem('user_login')) {
      return this.navRoute.navigate(['/login'])
    }
    this.markFormTouched(this.sbForm);
    if (!this.scheduleBookingModal || (this.scheduleBookingModal && this.sbForm.valid)) {

      if (!this.scheduleBookingModal) {
        this.bookingDate = this.sbForm.value.date;
        this.bookingTime = this.sbForm.value.time;
      }
      this.count;
      let apiData = {
        bookingDate: this.bookingDate,
        bookingTime: this.bookingTime,
        pickupLocation: this.pickuplocation,
        dropLocation: this.droplocation,
        user: this.id,
        distance: this.distance,
        duration: this.duration,
        tax: 1.2,
        count: ++this.count,
        fare: this.fare,
        totalFare: parseFloat(this.fare.substring(1)) + 1.2,
        taxiType: this.pickedTaxi.taxitype
      }

      this.bookingD = apiData
      console.log({apiData})
      this.userService.addBooking(apiData).subscribe(res => {

        this.Bookingid = res.data.userData._id
        this.sourcedata = res.data.userData.pickupLocation.address

        this.destinationdata = res.data.userData.dropLocation.address

        localStorage.setItem("sourcedata", this.sourcedata)
        localStorage.setItem("destinationdata", this.destinationdata)
        localStorage.setItem("bookingdata", this.Bookingid)

        if (this.count < 2) {
          this.confirmModal = true;
        } else {
          this.blockUI.start('Finding Drivers...')
          let obj = {
            date: new Date(),
            pickUpLocation: this.pickuplocation,
            dropLocation: this.droplocation,
            riderid: JSON.parse(localStorage.user_login).userId,
            pickupTime: new Date()
          }
          this.data.changeSearchBox(false);
          this.userService.riderequest(obj).subscribe((res) => {
            console.log(res, 'booking result')
            if (res.code == 200) {

            }
            else {
              this.blockUI.stop()
              this.toastr.info('No Drivers Found')
            }
          })
          // console.log("Loding start ", obj);
          // setTimeout(() => {
          // this.data.changeSearchBox(false);
        }
      }, err => {
        console.log(err);
      });
    } else {
      return false
    }
  }
  accept() {

    this.confirmModal = false
    console.log("pickup---", this.pickuplocation);
    var input = document.getElementById("pickuploc") as HTMLInputElement;
    input.value = ''
    input.value = this.droplocation.address
    var input1 = document.getElementById("droploc") as HTMLInputElement;
    input1.value = ''
    input1.value = this.pickuplocation.address;
  }
  decline() {
    console.log("indecline");
    this.confirmModal = false;
    // return this.navRoute.navigate(['/jobs']);
  }
  dmhide() {
    this.confirmModal = false;
  }



  setfav() {
    let location = {
      Pickup: { lat: this.favoritelat, lng: this.favoritelang, addres: this.address },
      Desstination: { lat: this.destinationfavoritelang, lng: this.destinationfavoritelang, address: this.address },
      id: this.id
    }

    if (this.isStartFavourite == true || this.isDestinationFavourite == true) {


      this.userService.favorite(location).subscribe(res => {

      }, err => {
        console.log(err);
      }
      );

    }
    //this.userService(req)

  }

  //this.userService(req)


  getFare() {

    this.searchTaxi = true;
    let apidata = { origin: this.pickuplocation, destination: this.droplocation }
    console.log('apidata', apidata);
    this.isLoading = true;
    this.userService.showAvailableVehicle(apidata).subscribe((res: any) => {
      if (res['code'] === 200) {

        this.isLoading = false;
        this.isDataLoaded = true;

        const { data } = res;
        const { duration, distance, availableVehicles } = data;
        if (availableVehicles) {
          let temp = []
          Object.keys(availableVehicles).forEach((key) => {
            switch (key) {
              case "9 Seater Van":
                temp.push({
                  "taxiimage": "../../assets/images/mini.svg",
                  "taxitype": key,
                  "driver": availableVehicles[key].name,
                  "taxinumber": availableVehicles[key].carRegNo,
                  "price": ((distance / 1000) * 4.5).toFixed(2),
                  "description": "Comfy hatchbacks at pockets-friendly fares",
                  "time": duration
                })
                break;
              case "mini":
                temp.push({
                  "taxiimage": "../../assets/images/sedan.svg",
                  "taxitype": key,
                  "driver": availableVehicles[key].name,
                  "taxinumber": availableVehicles[key].carRegNo,
                  "price": ((distance / 1000) * 3.5).toFixed(2),
                  "description": "Comfy hatchbacks at pockets-friendly fares",
                  "time": duration
                })
                break;
              case "wheelChair Van":
                temp.push({
                  "taxiimage": "../../assets/images/suv.svg",
                  "taxitype": key,
                  "driver": availableVehicles[key].name,
                  "taxinumber": availableVehicles[key].carRegNo,
                  "price": ((distance / 1000) * 4.5).toFixed(2),
                  "description": "Comfy hatchbacks at pockets-friendly fares",
                  "time": duration
                })
                break;

              default:
                break;
            }
          })
          this.listresult = { duration, distance, taxilisting: temp }
          this.distance =(distance /1000) .toFixed(2)
          this.duration=duration
          console.log('this.listresult', this.listresult)
        }

      } else {
        this.isLoading = false;
        this.isDataLoaded = true;
      }



      // // console.log("distancedaa----->", res.data)
      // //console.log("res----->", res.data.rows[0].elements[0].distance.text);
      // // this.distance = res.data.rows[0].elements[0].distance.text;
      // // this.distance = this.distance.split(" ", 1);

      // // this.kilometerdistance = parseFloat(this.distance) / 0.62137;
      // // this.kilometerdistance = this.kilometerdistance.toFixed(2)
      // // this.duration = res.data.rows[0].elements[0].duration.text
      // // console.log("km--", this.kilometerdistance);

      // console.log("duration--", res);

      this.distancedata.AddDistanceData(res.data)

    }, err => {
      console.log(err);
    });
  }





  Fare() {
    this.searchTaxi = true;
    let apidata = { origin: this.pickuplocation, destination: this.droplocation }

    this.userService.getdistance(apidata).subscribe(res => {
      console.log("res----->", res.data.rows[0].elements[0].distance.text);
      this.distancedata.AddDistanceData(res.data)

    }, err => {
      console.log(err);
    }
    );

  }


  // Get Current Location Coordinates
  private setCurrentLocation() {

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerMoved($event: MouseEvent) {

    console.log($event);

    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }


  getAddress(latitude, longitude) {
    console.log("addd");

    //onsole.log("fav ADD--",this.isStartFavourite);
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      this.ngZone.run(() => {
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }

      });
    })
  }

  getSelectedTaxi($event) {
    this.pickedTaxi = $event;
    this.fare = this.pickedTaxi.price
    console.log("======", this.fare);

  }

  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };

  reset() {
    this.sbForm.reset();
  }


}
