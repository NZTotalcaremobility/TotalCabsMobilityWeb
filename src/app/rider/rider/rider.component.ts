
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { } from 'googlemaps';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
//import { DataserviceService } from '../';
import * as io from 'socket.io-client';
import { DataserviceService } from 'src/app/search/dataservice.service';
import { environment } from 'src/environments/environment';
declare const google: any;

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.scss']
})
export class RiderComponent implements OnInit {

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  showWindow: boolean = false;
  private geoCoder;
  driversdata: any = [];
  @ViewChild('search')
  public searchElementRef: ElementRef;
  loader: boolean;
  id: any;
  showBox: Boolean = true;
  showConfirmTaxiDialog: Boolean = false;
  editForm: any;
  socket: SocketIOClient.Socket;
  routeSub: any;
  currentid: any;
  searchForm: any
  currentLocatin: any;
  confirmModal: boolean;
  dateOfJourney: any;
  pickupLocation: any;
  dropLocation: any;
  message: any;
  pickuptime: any;



  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private data: DataserviceService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router, private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer, private userservice: UserService, private toastr: ToastrService

  ) {
    this.searchForm = formBuilder.group({
      _id: ['', Validators.compose([Validators.required])],
    });
  }

  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,

  }
  pickup: any;
  driver: any;
  destination: any
  start: any;
  end: any;
  public renderOptions = {
    suppressMarkers: true,
  }

  public markerOptions = {
    origin: {
      infoWindow: "Origin",
      icon: 'https://www.shareicon.net/data/32x32/2017/02/01/877364_miscellaneous_512x512.png',

    },
    destination: {
      infoWindow: "destination",
      icon: 'https://www.shareicon.net/data/32x32/2017/02/01/877364_miscellaneous_512x512.png',
    },
  }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('user_login'));
    // this.socket = io.connect(`http://localhost:3531/?userId=${data.userId}`)
    this.socket = io.connect(`${environment.socketUrl}/?userId=${data?.userId}`)
    // this.socket = io.connect(`https://ss.stagingsdei.com:3531?userId=${data.userId}`)


    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log("param id--", params['id']) //log the value of id
      this.currentid = params['id'];
      this.getRiderLocation(this.currentid);
    });

    this.data.searchBox.subscribe(res => {
      this.showBox = res;
    })
    this.data.confirmtaxidialog.subscribe(res => {
      console.log(res, 'res in confirmtaxidialog')
      this.showConfirmTaxiDialog = res
    })
    this.data.getDestinationLoc.subscribe((marker: any) => {
      console.log(marker, 'its reached here at marker')
      if (marker.driver) {

        let apidata = { origin: this.pickup, destination: marker }
        console.log(apidata, 'apidata++++')
        this.userservice.getdistance1(apidata).subscribe(res => {

          console.log("resdta//////", res);

          this.markerOptions.destination.infoWindow = res.data.rows[0].elements[0].duration.text;
          // console.log("res data--++----->",res.data.rows[0].elements[0].duration.text);
          // this.distancedata.AddDistanceData(res.data)


          this.ngZone.run(() => {
            console.log(res, 'getdistance')
            this.driversdata = [];
            // this.showWindow=true
            this.driversdata.push({ lat: marker.latitude, long: marker.longitude, eta: res.data.rows[0].elements[0].duration.text })

            console.log(this.driversdata, 'this.driversdata+++++')



            this.data.changeTaxiEta(res.data.rows[0].elements[0].duration.text)

            // this.markerOptions.destination.icon = 'assets/images/car.png';
            this.markerOptions.destination.infoWindow = `<p>ETA:${res.data.rows[0].elements[0].duration.text}</p>`
            console.log({ latitude: this.latitude, longitude: this.longitude }, 'old and new lat', { latitude: marker.latitude, longitude: marker.longitude })
            // console.log("res data--++----->",res.data.rows[0].elements[0].duration.text);
            // this.distancedata.AddDistanceData(res.data)
            this.markerOptions.destination.icon = 'assets/images/car_map.png'
            this.end = { lat: marker.latitude, lng: marker.longitude }
          })
        }, err => {
          console.log(err);
        }
        );


      }
      else {
        console.log('its reached here at searchmarker+++')
        this.destination = marker
        this.latitude = marker.latitude;
        this.longitude = marker.longitude;
        this.end = { lat: marker.latitude, lng: marker.longitude }
      }
    })

    // this.data.getPickupLoc.subscribe((marker: any) => {
    //   console.log("markerr--", marker);

    //   if (marker.driver) {
    //     this.driversdata = [];
    //     let apidata = { origin: marker, destination: this.destination }

    //     this.userservice.getdistance1(apidata).subscribe(res => {
    //       this.markerOptions.origin.infoWindow = res.data.rows[0].elements[0].duration.text;
    //       // console.log("res data--++----->",res.data.rows[0].elements[0].duration.text);
    //       // this.distancedata.AddDistanceData(res.data)

    //     }, err => {
    //       console.log(err);
    //     }
    //     );

    //     this.markerOptions.destination.icon = 'assets/images/car.png';
    //   }
    //   this.pickup = marker
    //   this.latitude = marker.latitude;
    //   this.longitude = marker.longitude;
    //   this.start = { lat: marker.latitude, lng: marker.longitude }
    // });
    // // this.data.getAlldriver.subscribe((marker: any)=>

    // {this.driver =marker
    //   this.latitude = marker.latitude;
    //   this.longitude = marker.longitude;
    //   this.start = { lat: marker.latitude, lang:  marker.longitude }
    //   console.log("driverrrr--->",this.start);

    // });
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.getdriverlist();
      this.geoCoder = new google.maps.Geocoder;

      this.socket.on('driverCurrentLocation', (cureentLocation) => {
        console.log("locaton++++++++++++++++++++++++", cureentLocation);
        this.ngZone.run(() => {
          //  this.currentLocatin= cureentLocation
          this.currentLocatin = { lat: cureentLocation.latitude, long: cureentLocation.longitude }

        })


        //console.log("data of trips-------", { cureentLocation });
        //)

      })
    });
  }


  getdriverlist() {
    console.log("in list")
    var obj = {
      limit: 10
    };
    console.log("in list1")
    this.userservice.getAlldriver(obj).subscribe((res: any) => {
      this.data.getDriverData(res.data)
      console.log("res-->", res)
      if (res && res.code == 200) {

        //  this.latit=res.data.data[0].dropLocation.coordinates[0];
        //  this.longi=res.data.data[0].dropLocation.coordinates[1]
        //  console.log("data---",this.latitude);
        res.data.data.forEach(element => {
          console.log("ele", element.currentLocation.coordinates);
          this.driversdata.push({ lat: element.currentLocation.coordinates[1], lang: element.currentLocation.coordinates[0], name: element.name, licencenumber: element.licencenumber })
          console.log("d--", this.driversdata);



        });
      }
    });
  }


  getDriverData(lat, lng) {
    this.userservice.getdriverByid({ _id: this.id }).subscribe((res: any) => {

    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position, 'position')
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  // Get Current Location Coordinates
  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       console.log(position,'position')
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 8;
  //        this.getAddress(this.latitude, this.longitude);
  //     });
  //   }
  // }
  markerMoved($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {


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
  dmhide() {
    this.confirmModal = false;
  }
  decline(){
    this.confirmModal = false;
  }

  getRiderLocation(id?: string) {
    this.userservice.currentjobDetail({ _id: id }).subscribe((res) => {
      console.log("rspon--",res);
      if(res.data.tripstatus ==='Ongoing'){

      this.start = {
        lat: res.data.pickupLocation.coordinates[1], lng: res.data.pickupLocation.coordinates[0],
      }
      this.end = {
        lat: res.data.dropLocation.coordinates[1], lng: res.data.dropLocation.coordinates[0],
      }
      
    }
    else if(res.data !== null){
      this.confirmModal = true;
      
      // alert(`  date of journey is: ${res.data.dateOfJourney}
      //          pickuplocation : ${res.data.pickupLocation.address}
      //          dropLocation   : ${res.data.dropLocation.address}
      //          message:${res.message}`)

      this.dateOfJourney =res.data.dateOfJourney
           this.pickuptime = res.data.pickUptime
      this.pickupLocation = res.data.pickupLocation.address
      this.dropLocation = res.data.dropLocation.address
      this.message = res.message
    }
    else{
      alert(res.message)
    }
    })
  }

  handleSerachButton(): void {
    if (this.searchForm.valid) {
      this.getRiderLocation(this.searchForm.controls['_id'].value)
    }
  }
}

  // markerMoved($event: MouseEvent) {
  //   console.log($event);
  //   this.latitude =$event.coords.lat;
  //   this.longitude =$event.coords.lng;
  //   this.getAddress(this.latitude, this.longitude);
  // }
  // markerMoved(e) { console.log(e.coords,'eeeee')
  // const geocoder = new google.maps.Geocoder(); 
  // geocoder.geocode({'location': e.coords}, (res, status) => { 
  //   if (status === google.maps.GeocoderStatus.OK && res.length) {
  //     console.log(res[0],'lat lng')
  //      this.ngZone.run(() =>this.setLocation(res[0]));
  //  } }) }

  // setLocation(place) { this.latitude = place.geometry.location.lat(); this.longitude = place.geometry.location.lng(); this.getAddress(this.latitude,this.longitude)}
  // getAddress(latitude, longitude) {


  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  //     console.log(results);
  //     console.log(status);
  //     this.ngZone.run(()=>{
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 12;
  //         this.address = results[0].formatted_address;
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }

  //   });
  // })
  // }


