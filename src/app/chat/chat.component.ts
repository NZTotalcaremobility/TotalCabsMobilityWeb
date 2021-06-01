import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AppserviceService } from '../../app/appservice.service'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  user: String;
  messageText: String;
  room: String;
  userId: any;
  messageArray: Array<{
    sender: { _id: "any" },
    receiver: { _id: "any" },
    message: "any"
  }> = [];
  recevierId: any;
  loader: boolean;
  customerdata: any;
  drivername: any;
  getMessageData: any;
  getMessageHistory: any;
  drivers: any;
  slectedDriver: any = null;
  recevier: any;
  senderid:any;
  image: string;
  image_url: string;
  time:any;
  searchResult: any=[];
  searchForm = new FormGroup({
    string: new FormControl(''),
  });
  data: any;
  reciveid: any;
  senderdata: any;
  constructor(private chatservice: AppserviceService, private userservice: UserService, private toastr: ToastrService) {
    this.chatservice.newMessageRecevied()
      .subscribe(data => {    
        this.messageArray.push({
          sender: { _id: data.senderid},
          receiver: { _id: data.receiverid},
          message: data.message,
        })
      })
    this.messageArray.sort()

  }

  ngOnInit(): void {
    this.image_url=`${environment.imageurl}`;
    let data = JSON.parse(localStorage.getItem('user_login'));
    this.userId = data.userId,
      this.senderid = localStorage.getItem('driverId')


    this.recevierId = this.recevier

    this.getMessage()
    // this.messageHistory(driver)
   this. getReciverdata()
   this.getSenderdata();
  }
  getReciverdata(){
    console.log("receiver--",this.senderid);
    
    this.userservice.getDriver({_id:this.senderid}).subscribe((res)=>{
      console.log('res',res.data.data);
      this.data = res.data.data
  
    })}
    getSenderdata(){
      console.log("sender--",this.userId);
      
      this.userservice.getDriver({_id:this.userId}).subscribe((res)=>{
        console.log('res',res.data.data);
        this.senderdata = res.data.data
    
      })
  
  }
  
  sendMessage() {
    if(this.messageText != null){
      console.log("in send msg");
      
    this.chatservice.sendMessage({ sender: this.userId, receiver: this.senderid, message: this.messageText });
    this.reset()
    }
    else
    {
      this.messageText = null;
    }
  }
  reset() {
    this.messageText = null;
  }
  messageHistory(driver) {
    console.log("DRIVER SELECTED ",driver, this.userId);
    this.slectedDriver = driver;
    this.senderid = driver && driver.sender && driver.sender._id.toString() === this.userId.toString() ? driver.receiver._id : driver.sender._id;
    this.loader = true;
    if (this.userId) {
      console.log("id---", this.userId)
      this.userservice.messageHistory({ sender: driver.sender._id, receiver: driver.receiver._id, page: "1", limit: "10" }).subscribe((res: any) => {
        this.loader = false;
        console.log("messageHistory Recived-->", res.data)
        this.messageArray = res.data.reverse()
        // this.customerdata = res.data.data;
        this.image =`${environment.imageurl}${res.data.imagefile}`;
        console.log("image",this.image);
      })
    }
  }
  getMessage() {

    this.loader = true;
    if (this.userId) {
      console.log("id---", this.userId)
      this.userservice.messageList({ userid: this.userId, page: "1", limit: "10" }).subscribe((res: any) => {
        this.loader = false;
        this.drivers = res.data;
        for(let i = 0;i<this.drivers.length;i++)
        {
          this.reciveid = this.drivers[i]
          if(this.reciveid._id != this.senderid)
          {

          }
        }
        if(this.senderid != null){
       let data = {
          created_on: "2021-03-15T05:48:31.000Z",
          image: "",
          message: "Type new message",
          receiver:{ imagefile:this.data.imagefile , _id: this.data._id, name: this.data.name } ,
          receiverStatus: true,
          sender:{ imagefile: this.senderdata.imagefile , _id: this.senderdata._id, name: this.senderdata.name }  ,
          senderStatus: true,
          type: "",
          _id: "604ef52f413e2a593fc131f6",

        }
        this.drivers.push(data);
        // this.getMessageData = res.data
        // this.customerdata = res.data.data;
        this.image =`${environment.imageurl}${res.data[0].receiver.imagefile}`;
        console.log(this.image);
        }else{}
      });
    }
  }



// handleSearch() {
//   const params = { name: this.searchForm.value.string }
//   clearTimeout(this.time);
//   this.time = setTimeout(() => {
//     this.userservice.adminGetCustomer(params).subscribe(res => {
//       console.log('final', res['data'])
//       let result = res['data'];
//       console.log("rsult--", result);
//       if (result.status) {
//         this.searchResult = result.data
//       }
//     })
//   }, 250);
// }
}
