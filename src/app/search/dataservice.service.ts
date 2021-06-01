import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  private pickup = new BehaviorSubject({});
  getPickupLoc = this.pickup.asObservable();
  
  private destination = new BehaviorSubject({});
  getDestinationLoc = this.destination.asObservable();
  
  private driver= new BehaviorSubject({});
  getAlldriver = this.driver.asObservable();

  private showSearchBox = new BehaviorSubject(true);
  searchBox = this.showSearchBox.asObservable();
 
  private showconfirmtaxi = new BehaviorSubject(false);

  confirmtaxidialog = this.showconfirmtaxi.asObservable()


  private taxidata = new BehaviorSubject(true);
  taxidetails = this.taxidata.asObservable()


  private taxieta = new BehaviorSubject('');
  etataxi = this.taxieta.asObservable()

   constructor() {}
 
   changeConfirmTaxi(data:any)
   {
     this.showconfirmtaxi.next(data)
   }
changePickup(data: any) {
  this.pickup.next(data)
  }
  changeDestination(data: any) {
    console.log({"Date for Destination" : data})
    this.destination.next(data)
    }
    getDriverData(data: any) {
      this.driver.next(data)
      }
      changeSearchBox(data: boolean) {
        this.showSearchBox.next(data)
        }
        changetaxidata(data:any){
          console.log("taxidataa---",data);
          
          this.taxidata.next(data)
        }
        changeTaxiEta(data:any)
        {
          this.taxieta.next(data)
        }
}
