import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-tripbox',
  templateUrl: './tripbox.component.html',
  styleUrls: ['./tripbox.component.scss']
})
export class TripboxComponent implements OnInit {
  loader: boolean;
  id: any;
  bookingData: any;
  image_url: string;
  rec: any;

  constructor(private userservice:UserService,private navRoute:Router ) { }

  ngOnInit(): void {
    this.image_url=`${environment.imageurl}`;
    let data =  JSON.parse( localStorage.getItem('user_login'));

    console.log("uerdata--",data);
    this.id= data.userId;

    this.getAllBooking();
  }
  Edit(_id: any) {
    console.log("hhhhh",_id);
    localStorage.setItem("currentId",_id)
       // this.navRoute.navigate(['/user/page/recipt'], { queryParams: { userId: _id } });
  }
  listdata:any[]=[];
  getAllBooking(){
    this.loader = true;
    if(this.id){
      console.log("id---",this.id)
      this.userservice.getCompleteBooking({_id: this.id}).subscribe((res: any) => {
       
        this.loader = false;
        console.log("booking Res-->",res.data)
        if (res && res.code == 200) {

          this.bookingData= res.data.bookingdata;
          this. rec= res.data.revierating;
          console.log("data--",this.rec);

          console.log("list data",this.listdata);
          
          }
      
      
      })
    }
  }
  

}
