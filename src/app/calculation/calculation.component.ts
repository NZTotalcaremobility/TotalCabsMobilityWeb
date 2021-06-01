import { ActivatedRoute, Router } from '@angular/router';
import { Label, Color, BaseChartDirective, MultiDataSet } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { MapsAPILoader } from '@agm/core';
import { UserService } from '../services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from './../../environments/environment';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit {

  @ViewChild('Pickuplocation', { static: false })
  public PickuplocationElementRef: ElementRef;
  @ViewChild('DropLocation', { static: false })
  public DropLocationElementRef: ElementRef;


  public months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  public page: number = 1;
  public declinedofJobsPage: number = 1;
  public allocatedjobsPage: number = 1;
  public allocatedJobs: any = [];
  public listOfJobs: any = [];
  public declinedofJobs: any = [];
  public userByType: any = [];
  public totalVehicles: any = 0;
  public freeVehicles: any = 0;
  show: boolean = false;

  filterForm = new FormGroup({
    type: new FormControl('')
  }); data: any;
  showBox: any;
  showConfirmTaxiDialog: any;
  pickup: any;
  driversdata: any[];
  fairForm: FormGroup;
  latitude: number;
  longitude: number;
  pickuplocation: string;
  lat: number;
  lng: number;
  dropLocation: string;
  distance: any;
  kilometerdistance: any = 0;
  duration: any = 0;
  mini: any = 0;
  Wheelchair: any = 0;
  zoom: any = 10;

  selected: any;
  pickdropadd: any[] = [];
  //webbaseURL: string = environment.webBaseURL
  ;


  constructor(
    private modalService: BsModalService,
    // private api: AppService,
    private service: UserService,
    private formBuilder: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _toastr: ToastrService,
    private navRoute: Router
  ) {
    this.fairForm = this.formBuilder.group({
      'pickUpLocation': ['', Validators.compose([Validators.required])],
      'dropUpLocation': ['', Validators.compose([Validators.required])],
      'carType': ['', Validators.compose([Validators.required])]
    });
    this.latitude = -43.5118004;
    this.longitude = 172.3188185;

  }
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

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.PickuplocationElementRef.nativeElement, {
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log("place", place);
          this.latitude = place.geometry.location.lat();
          console.log("latitude", this.latitude);

          this.longitude = place.geometry.location.lng();
          console.log("longitude", this.longitude);
          this.pickuplocation = place.name + ',' + place.formatted_address;
          console.log("pickuplocation", this.pickuplocation);

        });
      });
    });
    let data = JSON.parse(localStorage.getItem('user_login'));
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.DropLocationElementRef.nativeElement, {
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.lat = place.geometry.location.lat();
          console.log("latitude", this.lat);
          this.lng = place.geometry.location.lng();
          console.log("long", this.lng);
          this.dropLocation = place.name + ',' + place.formatted_address;
          console.log("dropLocation", this.dropLocation);
        });
      });
    });
  }


  onOptionsSelected(event) {
    const value = event.target.value;
    this.selected = value;
    console.log(value);
  }

  bookNow(): void {
    let storage = {
      pickupLocation: {
        latitude: this.latitude,
        longitude: this.longitude,
        address: this.pickuplocation
      },
      dropLocation: {
        latitude: this.lat,
        longitude: this.lng,
        address: this.dropLocation
      },
      selectedVehicle: this.fairForm.controls['carType'].value,
      step: 2
    }
    localStorage.setItem(this.navRoute.url, JSON.stringify(storage));
    this.navRoute.navigate(['/search/cab'], { queryParams: { url: decodeURI(this.navRoute.url) } })
  }

  submitForm() {
    this.markFormTouched(this.fairForm);
    console.log("fairData", this.fairForm.value);

    if (this.fairForm.valid) {
      let finalData = {
        origin: {
          latitude: this.latitude,
          longitude: this.longitude,
          address: this.pickuplocation
        },
        destination: {
          latitude: this.lat,
          longitude: this.lng,
          address: this.dropLocation
        },
      }
      // console.log("finalData", finalData);

      this.service.getdistance1(finalData).subscribe(res => {
        if (res && res.code == 200) {

          this.show = true
          console.log("distancedata---+", res)
          this.distance = res.data.rows[0].elements[0].distance.text;
          this.duration = res.data.rows[0].elements[0].duration.text;
          this.distance = this.distance.split(" ", 1);

          this.kilometerdistance = parseFloat(this.distance) / 0.621371;
          this.kilometerdistance = this.kilometerdistance.toFixed(2)
          console.log("km--", this.kilometerdistance);
          this.mini = `$${(parseFloat(this.kilometerdistance) * 3.5 + 3).toFixed(2)}`
          this.Wheelchair = `$${(parseFloat(this.kilometerdistance) * 4.5 + 3).toFixed(2)}`
          this.Wheelchair = `$${(parseFloat(this.kilometerdistance) * 4.5 + 3).toFixed(2)}`

          //   console.log(this.fairForm.value);
          //   this.navRoute.navigate(['/dispach']);
          this._toastr.success(res.message, "calculate");
        } else if (res && res.code == 402) {
          this._toastr.info(res.message, "calculate");
        } else {
          this._toastr.info("Error", "calculate");
        }
      });
    }
    else {
      this._toastr.info("Enter Origin and Destination", "Dashboard");
    }

  }

  private generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }



  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };
  reset() {
    this.fairForm.reset();

  }
}
