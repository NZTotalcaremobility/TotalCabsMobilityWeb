import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  socket: SocketIOClient.Socket;
  
  constructor() {
    let data = JSON.parse(localStorage.getItem('user_login'));
  // this.socket = io.connect(`http://localhost:3531/?userId=${data.userId}`)
  this.socket = io.connect(`https://ss.stagingsdei.com:3531?userId=${data.userId}`)
     console.log("soke--",this.socket); 
     this. newMessageRecevied();
   }
  
   sendMessage(data){
 this.socket.emit('sendMessage',data);
  }
  
  newMessageRecevied(){
    let observable = new Observable<any>(observer=>{
      this.socket.on('getMessage',(data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });
    return observable;
  }
  onTyping(){
    let observable = new Observable<{user:String, message:String}>(observer=>{
      this.socket.on('onTyping', (data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });

    return observable;
  }
  chatHistory(){
    let observable = new Observable<any>(observer=>{
      this.socket.on('messageHistory',(data)=>{
        observer.next(data);
        console.log("history---",data);
        
      });
      return () => {this.socket.disconnect();}
    });
    return observable; 
  }

  joinRoom(data)
  {
    this.socket.emit('join', data);
  }

  newUserJoined()
  {
    let observable = new Observable<{user:String, message: String}>(observer=>{
      this.socket.on('new user joined', (data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });

    return observable;
  }

  leaveRoom(data){
    this.socket.emit('leave',data);
  }
  
}
