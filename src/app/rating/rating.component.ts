import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  communication_rate: number = 0;
  timing_rate: number = 0;
  professional_rate: number = 0;
  safety_rate: number = 0;
  quality_rate: number = 0;
  max: number = 5;
  overStar: number | undefined;
  percent: number;
  overall_rate: number = 0;
  comments:String ='';
  blockUI: any;
  toastr: any;
  id: any;
  rating:any;
  driverId: string;
  constructor( private userService: UserService,) { }

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('user_login'));
    this.id = data.userId;
    this.driverId = localStorage.getItem('driverId')
  }
  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
    //console.log("vsl--",value);

    
  }


ratingAndReview()
{
  this.rating=(this.safety_rate+this.quality_rate+this.timing_rate+this.professional_rate+this.communication_rate)/5;
let submitData={
 
  rating: this.rating,
 
  comments:this.comments,

  ratedby:this.id,
  ratedto: this.driverId
  
}
console.log("drt-",submitData);

this.userService.reviewandrating(submitData).subscribe((res) => {

  console.log(res, 'submit result')
  if (res.code == 200) {

  }
  else {
    this.blockUI.stop()
    this.toastr.info('Not Submit Reviews ')
  }
})
console.log("ubmitdata",this.rating);

}
}