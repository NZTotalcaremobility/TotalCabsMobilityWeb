import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upcoming-trips',
  templateUrl: './upcoming-trips.component.html',
  styleUrls: ['./upcoming-trips.component.scss']
})
export class UpcomingTripsComponent implements OnInit {
  id: any;
  loader: boolean;
  NoRecord: boolean = false;
  bookingData: any;
  dateOfJourney; any
  image_url: string;
  deleteConfirmation: boolean = false
  confirmedId: any
  constructor(private userservice: UserService, private navRoute: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.image_url = `${environment.imageurl}`
    let data = JSON.parse(localStorage.getItem('user_login'));

    console.log("uerdata--", data);
    this.id = data.userId;

    this.getAllBooking();
  }
  Edit(_id: any) {
    console.log("hhhhh", _id);
    localStorage.setItem("currentId", _id)
    // this.navRoute.navigate(['/user/page/recipt'], { queryParams: { userId: _id } });
  }
  listdata: any[] = [];
  getAllBooking() {
    this.loader = true;
    if (this.id) {
      console.log("id---", this.id)
      this.userservice.getUpComingBooking({ _id: this.id }).subscribe((res: any) => {
        console.log("bookingup--",res);
        
        this.loader = false;
        if (res?.data?.upcomingdta?.length > 0) {
          this.bookingData = res.data.upcomingdta;
          var rec = res;
          // this. dateOfJourney= res.data.data[3].jobid.dateOfJourney
          // console.log("data--",this.bookingData,this.dateOfJourney);
        }
        else {
          this.bookingData = []
          this.NoRecord = true;
        }
      })
    }
  }

  navigate(id: string): void {
    this.navRoute.navigate([`user/search/edit/${id}`])
  }


  deleteBooking(id?: string): void {
    this.loader = true
    if (id) {
      this.deleteConfirmation = true
      this.confirmedId = id
    } else if (this.confirmedId) {
      this.userservice.deleteBooking({ _id: this.confirmedId }).subscribe((res: any) => {
        this.loader = false;
        this.deleteConfirmation = false
        if (res['code'] === 200) {
          this.getAllBooking();
          this.toaster.success(res['message'])
        } else {
          this.toaster.error(res['message'])
        }
      })
    }
  }

}

