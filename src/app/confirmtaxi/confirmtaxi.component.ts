import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataserviceService } from '../search/dataservice.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-confirmtaxi',
  templateUrl: './confirmtaxi.component.html',
  styleUrls: ['./confirmtaxi.component.scss']
})
export class ConfirmtaxiComponent implements OnInit {
  cancelBooking :boolean = false;
  lstbookingId: string;
  sourcedata: any;
  destinationdata: string;
  driverstatus: any;
  blockUI: any;
  private _toastr: any;
  id: any;
  driverid: any;
  notifiedlength: any;
  ActionLength: any;
  constructor(private dataservice:DataserviceService,private ngZone: NgZone,private activatedRoute: ActivatedRoute,private navRoute:Router,private userservice: UserService) { }
obj:any={}
data1:any
imagefile:any;
  ngOnInit(): void {
  this. lstbookingId=  localStorage.getItem('bookingdata')
  console.log("last---",this.lstbookingId);
  
 
  this.sourcedata=JSON.stringify(localStorage.getItem('sourcedata'))
  // console.log("origindata------->>",this.sourcedata);
  this.destinationdata = JSON.stringify(localStorage.getItem('destinationdata'))
  
    
    
this.dataservice.taxidetails.subscribe((data)=>{
this.cancelBooking=true;
console.log("driver dat",data);
this.driverstatus = data
console.log("status--",this.driverstatus._id);
this.driverid = this.driverstatus._id


if(this.driverstatus.licencenumber != null ){
  console.log("in if");
  
  this.ngZone.run(()=>{

    console.log(data,'confirmtaxidata')
    this.obj=data
    this.data1 =data
    this.imagefile= `${environment.imageurl}${this.obj.imagefile}`;
    console.log("imagefile-->",this.imagefile);
    
        this.id =this.data1._id
    localStorage.setItem("driverId",this.data1._id);  
     })
    }
    else
    {
      console.log('in else');
      //this._toastr.success(this.driverstatus.driverstatus);
      this.dataservice.changeConfirmTaxi(false)
  
 
    }
})
console.log("driverid--",this.obj);

this.dataservice.etataxi.subscribe((data)=>{
  this.cancelBooking=true;

  console.log(data,'taxi etatatat')
  this.ngZone.run(()=>{
    this.data1=data
    console.log(data)
  })
})

  
  
  }
  reload()
  {
    var data=this.lstbookingId
    this.userservice.cancelBooking({_id:data}).subscribe(res => {
       console.log("==============***************************============",res);
       
    })
    window.location.reload();
  
  }
  returnBooking()
  {
    
  localStorage.setItem("sourcedta",this.destinationdata)
  localStorage.setItem("destinationdata",this.sourcedata)
  // this.navRoute.navigate(['/user/search',{'origin': this.sourcedata, 'destination': this.destinationdata }])
   window.location.reload();
  }

}
