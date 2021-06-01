import { MapsAPILoader,MouseEvent } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';
declare const  google : any;

@Component({
  selector: 'app-customer-map',
  templateUrl: './customer-map.component.html',
  styleUrls: ['./customer-map.component.scss']
})
export class CustomerMapComponent implements OnInit {
  public lat = 24.799448;
  public lng = 120.979021;
   
  public origin: any;
  public destination: any;
 
title: string = 'AGM project';
latitude: number;
longitude: number;
zoom: number;
address: string;
private geoCoder;

@ViewChild('search')
public searchElementRef: ElementRef;


constructor(
  private mapsAPILoader: MapsAPILoader,
  private ngZone: NgZone
) { }
getDirection()
{
  this.origin = { lat: 24.799448, lng: 120.979021 };
  this.destination = { lat: 24.799524, lng: 120.975017 };
}

ngOnInit() {
  this.getDirection();

  //load Places Autocomplete
  this.mapsAPILoader.load().then(() => {
    this.setCurrentLocation();
    this.geoCoder = new google.maps.Geocoder;

    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 12;
      });
    });
  });
}

// Get Current Location Coordinates
private setCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position,'position')
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 8;
      this.getAddress(this.latitude, this.longitude);
    });
  }
}


markerMoved($event: MouseEvent) {
  console.log($event);
  this.latitude =$event.coords.lat;
  this.longitude =$event.coords.lng;
  this.getAddress(this.latitude, this.longitude);
}
// markerMoved(e) { console.log(e.coords,'eeeee')
// const geocoder = new google.maps.Geocoder(); 
// geocoder.geocode({'location': e.coords}, (res, status) => { 
//   if (status === google.maps.GeocoderStatus.OK && res.length) {
//     console.log(res[0],'lat lng')
//      this.ngZone.run(() =>this.setLocation(res[0]));
//  } }) }

// setLocation(place) { this.latitude = place.geometry.location.lat(); this.longitude = place.geometry.location.lng(); this.getAddress(this.latitude,this.longitude)}
getAddress(latitude, longitude) {
 

  this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
    console.log(results);
    console.log(status);
    this.ngZone.run(()=>{
    if (status === 'OK') {
      if (results[0]) {
        this.zoom = 12;
        this.address = results[0].formatted_address;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }

  });
})
}

}