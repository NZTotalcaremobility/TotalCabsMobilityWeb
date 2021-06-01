import { environment } from './../../environments/environment';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { DataserviceService } from '../search/dataservice.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { SearchboxserviceService } from './searchboxservice.service';
import { lang } from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as io from 'socket.io-client';
import { count } from 'console';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import * as moment from 'moment';
//import { truncate } from 'fs';

// import { setInterval } from 'timers';
declare const google: any;
@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {
  minDate = new Date();
  searchTaxi: Boolean = false;
  isLoading: Boolean = false;
  isDataLoaded: Boolean = false;
  isFound: Boolean = false;
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

  showModel: boolean ;

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
  count2: any = 0;
  favoriteDropLocation: any = '';
  step: number = 0;
  selectedVehicle: string
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
  isEdit: boolean = false;
  bookingID: any
  bookingData: any
  socketdata: any;
  notifiedlength: any;
  ActionLength: any;
  currentjobid: any;

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

    const { snapshot } = this.activatedRoute;
    const { params } = snapshot;
    const { id } = params;
    if (id) {
      this.bookingID = id
      this.isEdit = true
    }
  }





  @BlockUI() blockUI: NgBlockUI;
  ngOnInit() {
    let pickupdata = JSON.stringify(localStorage.getItem('sourcedta'))
    let dropoffdata = JSON.stringify(localStorage.getItem('destinationdata'))
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log('sdfsdfs', params['url'])
      if (params['url']) {
        let result = localStorage.getItem(params['url']);
        if (result) {

          const { pickupLocation, dropLocation, selectedVehicle, step } = JSON.parse(result);
          this.pickuplocation = pickupLocation
          this.droplocation = dropLocation
          this.selectedVehicle = selectedVehicle;
          this.step = step

          this.favoriteDropLocation = this.droplocation.address
          this.favouritePickUpLocation = this.pickuplocation.address

          localStorage.removeItem(params['url'])
        }

      }
    })

    let result = localStorage.getItem(this.navRoute.url);
    if (result) {
      const { scheduleBookingModal, pickupLocation, dropLocation, selectedVehicle, step } = JSON.parse(result);
      this.pickuplocation = pickupLocation
      this.droplocation = dropLocation
      this.selectedVehicle = selectedVehicle;
      this.step = step
      this.favoriteDropLocation = this.droplocation.address
      this.favouritePickUpLocation = this.pickuplocation.address
      if (scheduleBookingModal) {
        this.schedueBooking();
      } else {
        this.nowBooking()
      }
      localStorage.removeItem(this.navRoute.url)
    }

    if (this.isEdit) {
      this.userService.getBookingById({ _id: this.bookingID }).subscribe(res => {
        if (res['code'] === 200) {
          this.bookingData = res['data']
          this.pickuplocation = {
            latitude: res?.data?.jobid?.pickupLocation?.coordinates[1],
            longitude: res?.data?.jobid?.pickupLocation?.coordinates[0],
            address: res?.data?.jobid?.pickupLocation?.address
          }

          this.droplocation = {
            latitude: res?.data?.jobid?.dropLocation?.coordinates[1],
            longitude: res?.data?.jobid?.dropLocation?.coordinates[0],
            address: res?.data?.jobid?.dropLocation?.address
          }
          this.favoriteDropLocation = this.droplocation.address
          this.favouritePickUpLocation = this.pickuplocation.address

          this.bookingDate = res?.data?.jobid?.dateOfJourney ? `${new Date(res?.data?.jobid?.dateOfJourney).getDate()}/${new Date(res?.data?.jobid?.dateOfJourney).getMonth() + 1}/${new Date(res?.data?.jobid?.dateOfJourney).getFullYear()}` : res?.data?.jobid?.bookingDate
          this.bookingTime = res?.data?.jobid?.pickUptime ? res?.data?.jobid?.pickUptime : res?.data?.jobid?.bookingTime
          
          this.selectedVehicle = res?.data?.jobid?.carType;

          if (res?.data?.jobid?.cabType) {
            this.step = 2
          } else {
            this.step = 1
          }
          if (res?.data?.jobid?.jobType === "Coverjob") {
            this.schedueBooking();
          } else {
            this.nowBooking()
            this.getFare()
          }

        } else {
          this.toastr.warning(res['message'])
          return false
        }
      });
    }


    console.log("pickup----------->", this.pickuplocation);

    if (this.pickupdata != null) {
      this.source = true
    }
    console.log("pickupppp+++++++", pickupdata);

    let data = JSON.parse(localStorage.getItem('user_login'));
    this.socket = io.connect(`${environment.socketUrl}/?userId=${data?.userId}`)
    this.id = data?.userId;

    this.getFavorite()
    this.socket.on('tripstatus', (tripsdata) => {

      console.log("data of trips-------", { tripsdata });
      this.ngZone.run(() =>{
     //   console.log("data of trips-------", { tripsdata });
        
        this.data.changeConfirmTaxi(true);
        this.data.changetaxidata(tripsdata)
        })

    })
    
    this.socket.on('Ongoingdata', (ondata) => {
      console.log("ongoing---",ondata);
      
     
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
       if(socketdata.driver !== null ){
        this.userService.getdriverdetails({ _id: socketdata.driver }).subscribe((res) => {
          console.log(res, 'getdriverdetails+++++++=')
          this.driverid = res.data._id;
          console.log("driverrr--", this.driverid);

          localStorage.setItem("driverid", this.driverid)
          if (res.code == 200) {
            console.log(res.data)
            this.socketdata = socketdata.requestAction
            res.data.price = this.pickedTaxi.price
            console.log(res.data, 'changetaxidata')
            this.data.changetaxidata(res.data)
            console.log("dtata change+++++++++++++++++++++++++ ---",socketdata.requestAction);
            this.data.changeConfirmTaxi(true);
            // if(this.socketdata == "Accepted"){
            // this.data.changeConfirmTaxi(true);
            // }
            // else{
            //   this.data.changeConfirmTaxi(false);
            //   this.data.changetaxidata(res.data)
            // }
          }
        })
      }
      else{
        this.showModel = true;
        console.log("Sanju",socketdata.jobid );
        this.currentjobid = socketdata.jobid
        
        this.userService.getcurentBooking({id: this.currentjobid}).subscribe(res => {
          console.log("current booking==============***************************============",res.data.notifiedUser.length);
      
           this.notifiedlength = res.data.notifiedUser.length
           console.log("this.notifiedlength",this.notifiedlength);
           
           this.ActionLength = res.data.driverAction.length
           console.log("this.ActionLength",this.ActionLength);
           if(  this.notifiedlength === this.ActionLength && res.data.requestAction !=="Accepted"){
             //console.log("in Confirm model");
             
            //this.showModel = true;
             //alert("No Driver Accepted your request")
           }
           
       })
      }
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


          this.data.changePickup(this.pickuplocation);

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          if (this.droplocation) {
            this.step = 1;
          }
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
          if (this.pickuplocation) {
            this.step = 1;
          }
        });
      });
    });
  }
  hide() {
    this.showModel = false;
  }
  Decline(){
    this.showModel = false;
  }
  show(){
    console.log("show");
    
    this.showModel = true;
  }

  getFavorite() {
    console.log("hi getfav----");

    this.loader = true;
    if (this.id) {

      this.userService.getFavoriteLocation({ _id: this.id }).subscribe((res: any) => {
        if (res['code'] === 200) {
          this.isStartFavourite = true;
          this.isDestinationFavourite = true;

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
            this.step = 1;
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
            this.step = 1;
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


    if (this.id != null) {
      if (!this.isStartFavourite) {

        console.log("id---", this.id);

        if (this.pickuplocation != null) {

          this.isStartFavourite = true;
          let apiValue = {
            key: 'Pickup',
            loc: this.pickuplocation,
            id: this.id
          }
          this.userService.favorite(apiValue).subscribe(res => {

            this.toastr.success("Favorite Location Added")
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

          this.toastr.success("Favorite Location Removed")
        }, err => {
          console.log(err);
        }
        );

        console.log("in unfavorite");



      }
    }
    else {
      this.toastr.success("You can't add favorite location")
    }


  }



  DestinationFavourite() {
    if (this.id != null) {
      if (!this.isDestinationFavourite) {
        if (this.droplocation) {

          this.isDestinationFavourite = true;
          let apiValue = {
            key: 'drop',
            loc: this.droplocation,
            id: this.id
          }
          this.userService.favorite(apiValue).subscribe(res => {
            this.toastr.success("Favorite Location Added")
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
          this.toastr.success("Favorite Location Removed")
        }, err => {
          console.log(err);
        }
        );
      }
    } else {
      this.toastr.success("You can't add Favorite location")
    }
  }

  nowBooking() {
    this.scheduleBookingModal = false
    this.step = 3;
    this.bookingDate = new Date().toLocaleDateString();
    console.log("bookingdate--",this.bookingTime);
    
    this.bookingTime = new Date().toLocaleTimeString();
    console.log("----------------", this.bookingDate);
    console.log("----------------", this.bookingTime);
  }
  schedueBooking() {
    this.scheduleBookingModal = true
    this.step = 3;

    let finalData = {
      origin: this.pickuplocation,
      destination: this.droplocation
    }

    this.userService.getdistance1(finalData).subscribe(res => {
      if (res && res.code == 200) {
        this.distance = res?.data?.rows[0]?.elements[0]?.distance?.value;
        this.duration = res?.data?.rows[0]?.elements[0]?.duration?.text;
        this.distance = (this.distance / 1000);

        switch (this.selectedVehicle) {
          case "9 Seater Van":
            this.fare = ((this.distance) * 4.5).toFixed(2);
            break;
          case "Mini":
            this.fare = ((this.distance) * 3.5).toFixed(2);

            break;
          case "wheelChair Van":
            this.fare = ((this.distance) * 4.5).toFixed(2);
            break;
          default:
            break;
        }

        this.distance = this.distance.toFixed(0);

      }

    });

  }
  close() {
    this.scheduleBookingModal = false;
  }
  scheduleBookingData() {
    this.close();
  }

  /**
   * 
   * @returns 
   */
  confirmAndEdit(): any {
    this.markFormTouched(this.sbForm);
    if (!this.scheduleBookingModal || (this.scheduleBookingModal && this.sbForm.valid)) {
      var apiData: any
      if (this.scheduleBookingModal) {

        let userData = JSON.parse(localStorage.getItem('user_login'));

        apiData = {
          ...this.bookingData,
          dateOfJourney: this.sbForm.controls['date'].value,
          timeOfJourney: this.sbForm.controls['time'].value,
          price: this.fare,
          totalFare: Number(this.fare) + 1.2,
          carType: this.selectedVehicle,
          pickupLocation: this.pickuplocation,
          dropLocation: this.droplocation,
          distance: this.distance,
          duration: this.duration
        }

        this.userService.editBooking(apiData).subscribe(res => {
          if (res['code'] === 200) {
            this.step = 5;
            this.selectedVehicle = '';
            this.bookingTime = '';
            this.bookingDate = '';
            this.toastr.success(res['message'])
          } else {
            this.toastr.warning(res['message'])
            return false
          }
        }, err => {
          this.toastr.warning(err)
        });
      } else {

        apiData = {
          ...this.bookingData,
          pickupLocation: this.pickuplocation,
          dropLocation: this.droplocation,
          distance: this.distance,
          duration: this.duration,
          count: ++this.count,
          fare: this.pickedTaxi.price,
          totalFare: Number(this.pickedTaxi.price) + 1.2,
          taxiType: this.selectedVehicle,
          carType: this.selectedVehicle,
          bookingDate: this.bookingDate,
         
          bookingTime: this.bookingTime,
        };

        console.log("totaldfa--", apiData.totalFare)
        this.bookingD = apiData
        this.userService.editBooking(apiData).subscribe(res => {

          this.Bookingid = res.data.userData._id
          this.sourcedata = res.data.userData.pickupLocation.address

          this.destinationdata = res.data.userData.dropLocation.address

          localStorage.setItem("sourcedata", this.sourcedata)
          localStorage.setItem("destinationdata", this.destinationdata)
          localStorage.setItem("bookingdata", this.Bookingid)

          if (this.count < 2) {
            this.confirmModal = true;
            this.toastr.info(res['message'])
            return false
          } else {
            this.blockUI.start('Finding Drivers...')
            let obj = {
              date: new Date(),
              pickUpLocation: this.pickuplocation,
              dropLocation: this.droplocation,
              riderid: JSON.parse(localStorage.user_login).userId,
              pickupTime: new Date()
            }
            this.userService.riderequest(obj).subscribe((res) => {
              console.log(res, 'booking result')
              if (res.code == 200) {

              }
              else {
                console.log("sanju model");
                
                this.showModel = true;
                this.blockUI.stop()
             
                this.toastr.info('No Drivers Found')
              }
            })
            setTimeout(() => {
              this.data.changeSearchBox(false);
            })
          }
        }, err => {
          console.log(err);
        });
      }
    } else {
      return false
    }
  }

  confirmAndBookNow() {
    if (!localStorage.getItem('user_login')) {
      let storage = {
        scheduleBookingModal: this.scheduleBookingModal,
        pickupLocation: this.pickuplocation,
        dropLocation: this.droplocation,
        selectedVehicle: this.selectedVehicle,
        step: this.step
      }

      localStorage.setItem(this.navRoute.url, JSON.stringify(storage));

      return this.navRoute.navigate(['/login'], { queryParams: { url: decodeURI(this.navRoute.url) } })
    }
    this.markFormTouched(this.sbForm);
    if (!this.scheduleBookingModal || (this.scheduleBookingModal && this.sbForm.valid)) {
      var apiData: any

      if (this.scheduleBookingModal) {
        let userData = JSON.parse(localStorage.getItem('user_login'));

        apiData = {
          user: {
            name: userData.name,
            phonenumber: userData.phonenumber,
            email: userData.email
          },
          tax: 1.2,
          dateOfJourney: this.sbForm.controls['date'].value,
          timeOfJourney: this.sbForm.controls['time'].value,
          price: this.fare,
          fare: Number(this.fare) ,
          carType: this.selectedVehicle,
          //jobtype:"DispatchJob",
          pickupLocation: this.pickuplocation,
          dropLocation: this.droplocation,
          totaldistance: this.distance,
          duration: this.duration
        }
        this.count2 += 1;
        this.userService.adminAddDespatchJobs(apiData).subscribe(res => {
          if (res['code'] === 200) {
            if (this.count2 < 2) {
              this.confirmModal = true;
              this.sbForm.reset();
              this.toastr.success("Booking Is scheduled")
            } else {
              this.step = 5;
              this.selectedVehicle = '';
              this.bookingTime = '';
              this.bookingDate = '';
              this.toastr.success('Return Booking Is Scheduled')
            }
          } else {
            this.toastr.warning(res['message'])
            return false
          }
        }, err => {
          this.toastr.warning(err)
        });
      } else {
        apiData = {
          pickupLocation: this.pickuplocation,
          dropLocation: this.droplocation,
          user: this.id,
          distance: this.distance,
          duration: this.duration,
          tax: 1.2,
          count: ++this.count,
          fare: this.pickedTaxi.price,
          totalFare: Number(this.pickedTaxi.price),
          taxiType: this.selectedVehicle,
          bookingDate: this.bookingDate,
          dateOfJourney:new Date(),
          bookingTime: this.bookingTime,
        };
        console.log("totaldfa--", apiData.totalFare)
        this.bookingD = apiData
        this.userService.addBooking(apiData).subscribe(res => {

          this.Bookingid = res.data.userData._id
          this.sourcedata = res.data.userData.pickupLocation.address

          this.destinationdata = res.data.userData.dropLocation.address

          localStorage.setItem("sourcedata", this.sourcedata)
          localStorage.setItem("destinationdata", this.destinationdata)
          localStorage.setItem("bookingdata", this.Bookingid)

          if (this.count < 2) {
            this.confirmModal = true;
            this.toastr.info(res['message'])
            return false
          } else {
            this.blockUI.start('Finding Drivers...')
            let obj = {
              date: new Date(),
              pickupLocation: this.pickuplocation,
              dropLocation: this.droplocation,
              riderid: JSON.parse(localStorage.user_login).userId,
              pickupTime: new Date(),
              taxiType: this.selectedVehicle
            }
            console.log("taxi-",obj.taxiType);
            
            this.userService.riderequest(obj).subscribe((res) => {
              console.log(res, 'booking result++')
              if (res.code == 200) {
                console.log("booking ress---",res.data)
              }
              else {
          
                this.toastr.info('No Drivers Found')
              }
            })
            setTimeout(() => {
              this.data.changeSearchBox(false);
            })
          }
        }, err => {
          console.log(err);
        });
      }
    } else {
      return false
    }
  }
  accept() {
    this.step = 2;
    this.confirmModal = false
    console.log("pickup---", this.pickuplocation);
    var temp = this.droplocation;
    var input = document.getElementById("pickuploc") as HTMLInputElement;
    input.value = ''
    input.value = this.droplocation.address
    var input1 = document.getElementById("droploc") as HTMLInputElement;
    input1.value = ''
    input1.value = this.pickuplocation.address;

    this.droplocation = this.pickuplocation;
    this.pickuplocation = temp

  }

  decline() {
    console.log("indecline ++++++++");
    this.confirmModal = false;
    if (!this.scheduleBookingModal) {
      this.blockUI.start('Finding Drivers...')
      let obj = {
        date: new Date(),
        pickUpLocation: this.pickuplocation,
        dropLocation: this.droplocation,
        riderid: JSON.parse(localStorage.user_login).userId,
        pickupTime: new Date(),
        taxiType: this.selectedVehicle
      }
      this.data.changeSearchBox(false);
      this.userService.riderequest(obj).subscribe((res) => {
        console.log(res.code, 'booking result')
        if (res.code == 200) {

        }
        else {
         this.showModel = true;
         console.log("value--",this.showModel);
         
          this.blockUI.stop()
          this.toastr.info('No Drivers Found')
        }
      })
    } else {
      this.step = 5;
      this.selectedVehicle = '';
      this.bookingTime = '';
      this.bookingDate = '';

    }
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
    let apidata = { origin: this.pickuplocation, destination: this.droplocation, carType: this.selectedVehicle }

    this.isLoading = true;
    this.userService.showAvailableVehicle(apidata).subscribe((res: any) => {
      if (res['code'] === 200) {
        this.step = 4;
        this.isLoading = false;
        this.isDataLoaded = true;

        const { data } = res;
        const { duration, distance, availableVehicles } = data;
        if (availableVehicles && availableVehicles[this.selectedVehicle]) {
          this.isFound = true
          let temp = {}
          let key = this.selectedVehicle;

          switch (key) {
            case "9 Seater Van":
              temp = {
                "taxiimage": "../../assets/images/mini.svg",
                "taxitype": key,
                "driver": availableVehicles[key].name,
                "taxinumber": availableVehicles[key].carRegNo,
                "price": ((distance / 1000) * 4.5).toFixed(2),
                "description": "Comfy hatchbacks at pockets-friendly fares",
                "time": duration
              }
              break;
            case "Mini":
              temp = {
                "taxiimage": "../../assets/images/sedan.svg",
                "taxitype": key,
                "driver": availableVehicles[key].name,
                "taxinumber": availableVehicles[key].carRegNo,
                "price": ((distance / 1000) * 3.5).toFixed(2),
                "description": "Comfy hatchbacks at pockets-friendly fares",
                "time": duration
              }
              break;
            case "wheelChair Van":
              temp = {
                "taxiimage": "../../assets/images/suv.svg",
                "taxitype": key,
                "driver": availableVehicles[key].name,
                "taxinumber": availableVehicles[key].carRegNo,
                "price": ((distance / 1000) * 4.5).toFixed(2),
                "description": "Comfy hatchbacks at pockets-friendly fares",
                "time": duration
              }
              break;
            default:
              break;
          }

          this.pickedTaxi = temp;

          // this.listresult = { duration, distance, taxilisting: temp }

          this.distance = (distance / 1000).toFixed(2)
          this.duration = duration
          console.log('this.listresult', this.listresult)
        } else {
          this.isFound = false
        }
      } else {
        this.isFound = true
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
    console.log("fare-----+++++++++======", this.fare);

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

  selectVehicle(vehicleType: string) {
    this.step += 1;
    this.selectedVehicle = vehicleType
  }


}
