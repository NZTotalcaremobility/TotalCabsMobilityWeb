import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataserviceService } from '../search/dataservice.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { environment } from '../../environments/environment';
import { SearchboxserviceService } from '../searchbox/searchboxservice.service';




@Component({
  selector: 'app-recipt',
  templateUrl: './recipt.component.html',
  styleUrls: ['./recipt.component.scss']
})
export class ReciptComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  id: any;
  loader: boolean;
  customerdata: any;
  image: string;
  editForm: any;
  pickuplocation: any;
  droplocation: any;
  driversdata: any = [];
  distance: any;
  kilometerdistance: any;
  taxilisting: any;
  userId: number = 0;
  currentbooking: string;
  startingPoint: void;
  endPoint: any;
  totalFare: any;
  EstimatedTime: any;
  totalTax: any;
  dateOfBooking: any;
  name: any;
  carType: any;
  drivingLicence: any;
  driverImage: any;
  image_url: any = `${environment.imageurl}`;
  fare: any;
  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private data: DataserviceService,
    private distancedata: SearchboxserviceService, private sanitizer: DomSanitizer, private userservice: UserService, private toastr: ToastrService) {

  }

  ngOnInit(): void {

    let data = JSON.parse(localStorage.getItem('user_login'));
    let currentuser = localStorage.getItem('currentId')
    this.currentbooking = currentuser
    console.log("iduser--", this.currentbooking)

    console.log("uerdata--", data);
    this.id = data.userId;
    this.getProfile();
    this.getBooking();

    // this.loadScript();

  }
  getBooking() {
    this.loader = true;
    if (this.id) {
      console.log("id-++++++++++++--", this.currentbooking)
      this.userservice.getRecept({ _id: this.currentbooking }).subscribe((res: any) => {
        console.log("res---",res);
        
        // this.name = res.data.data.jobid.driverdetails.name
        console.log("1", res.data[0].Amount);
        this.carType = res.data[0]?.driverdetails?.carType;
        this.drivingLicence = res.data[0]?.driverdetails?.licencenumber;
        this.driverImage = res.data[0]?.driverdetails?.imagefile;
        console.log("image-+++-", this.driverImage);
        this.startingPoint = res.data[0]?.jobid?.pickupLocation?.address
        this.endPoint = res.data[0]?.jobid?.dropLocation?.address
        this.totalFare = res.data[0]?.Amount
        this.distance = res.data[0]?.jobid?.distance
        this.EstimatedTime = res.data[0]?.jobid?.duration
        this.totalTax = res.data[0]?.tax
        this.fare = res.data[0]?.fare
        this.dateOfBooking = res.data[0]?.createdAt
        console.log("booking Res-->", res)


      })
    }
  }

  getProfile() {

    this.loader = true;
    if (this.id) {
      console.log("id---", this.id)
      this.userservice.getcustomerByid({ _id: this.id }).subscribe((res: any) => {
        this.loader = false;
        console.log("img-->", res.data.data)
        this.pickuplocation = res?.data?.data?.pickupLocation?.address;
        this.droplocation = res?.data?.data?.dropLocation?.address
        this.image = `${environment.imageurl}${res?.data?.data?.imagefile}`;


      })
    }
  }
  // fare() {

  //   // this.searchTaxi=true;
  //   console.log("infare--")
  //   let apidata = { origin: this.pickuplocation, destination: this.droplocation }

  //   this.userservice.getdistance(apidata).subscribe(res => {
  //     console.log("distancedaa----->", res.data)
  //     console.log("res----->", res.data.rows[0].elements[0].distance.text);
  //     this.distancedata.AddDistanceData(res.data)

  //   }, err => {
  //     console.log(err);
  //   }
  //   );

  // }


  public downloadPDF(): void {
    var data = document.getElementById('content');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/jpg')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'JPG', 0, position, imgWidth, imgHeight)
      pdf.save('recipt.pdf');
    });

  }
}
