import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchboxserviceService {
  private distance = new BehaviorSubject(null);
  getdistance = this.distance.asObservable();
 
  constructor() { }
  AddDistanceData(data: any){
    this.distance.next(data)
  }

}
