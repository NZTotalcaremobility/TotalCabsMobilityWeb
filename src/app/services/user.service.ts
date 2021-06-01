import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, filter, scan, catchError } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { Router } from '@angular/router';
const apiEndPointUrl = environment.url
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  setSession(data) {

    localStorage.user_login = JSON.stringify(data);


  }
  adminGetCustomer(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'adminGetCustomer', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }

  signupcompany(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'signupcompany', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  cancelBooking(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'cancelBooking', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  getcurentBooking(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'getJobByid', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  registerrider(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'customerSignup', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  checkMobileNumber(data): Observable<any> {
    return this.http.post(apiEndPointUrl + 'customerSignupCheckMobile', data).pipe(
      catchError(this.handleError('getUser', []))
    );
  }
  checkMobile(data): Observable<any> {
    return this.http.post(apiEndPointUrl + 'customerCheckMobile', data).pipe(
      catchError(this.handleError('getUser', []))
    );
  }
  generateOtp(data): Observable<any> {
    return this.http.post(apiEndPointUrl + 'customerSignupOtp', data).pipe(
      catchError(this.handleError('getUser', []))
    );
  }
  mobileRegistration(data): Observable<any> {
    return this.http.post(apiEndPointUrl + 'customerMobileSignup', data).pipe(
      catchError(this.handleError('getUser', []))
    );
  }
  loginrider(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'customerLogin', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  verifyaccount(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'verifyAccount', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }

  getdriverdetails(data): Observable<any> {
    return this.http.post(apiEndPointUrl + 'getdriverdetails', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  riderequest(data): Observable<any> {
    return this.http.post(apiEndPointUrl + 'riderequest', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  messageList(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'messageList', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  messageHistory(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'messageHistory', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  forgetPassword(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'forgotPassword', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  getAllDriverdata(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'getAllDriverdata', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  reviewandrating(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'reviewandrating', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  resetPassword(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'resetPassword', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getDistance(origin, destination): Observable<any> {
    return this.http.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&mode=driving&key=AIzaSyAPtxJJdDVQUUW_PKvnIHaPuH6YOgGnjGA`);
  }
  userlogin(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'customerLoginPhone', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  changepassword(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'changepassword', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }

  getdriverByid(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'getdriverByid', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  getdriver(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'getdriver', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  getBookingrecent(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'getBookingrecent', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  getDriver(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'adminGetDriverByid', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  getAlldriver(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'getAlldriver1', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  currentjobDetail(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'currentjobDetail', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  addLocation(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'addLocation', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  getdistance(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'getdistance', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  getdistance1(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'getdistance1', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }

  showAvailableVehicle(data): Observable<any> {
    return this.http.post(apiEndPointUrl + 'showAvailableVehicle', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  getdistance2(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'getdistance2', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  getUpComingBooking(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'getUpComingBooking', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  getBookingByid(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'getBookingByid', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  getBooking(data): Observable<any> {
    return this.http.post(apiEndPointUrl + 'getBooking', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  deleteBooking(data): Observable<any> {
    return this.http.post(apiEndPointUrl + 'deleteBooking', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }

  getCompleteBooking(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'getCompleteBooking', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  getRecept(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'getRecept', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  addBooking(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'addBooking', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }

  addCoverJob(data): Observable<any> {
    return this.http.post(apiEndPointUrl + 'coverJob', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  adminAddDespatchJobs(data): Observable<any> {
    return this.http.post(apiEndPointUrl + 'adminAddDespatchJobs', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }

  editBooking(data): Observable<any> {
    return this.http.post(apiEndPointUrl + 'editBooking', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }

  getBookingById(data): Observable<any> {
    return this.http.post(apiEndPointUrl + 'getBookingEdit', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }


  getFavoriteLocation(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'getFavoriteLocation', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  deleteaccount(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'deleteaccount', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }



  favorite(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'favorite', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  unfavorite(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'unfavorite', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }


  updatecustomerData(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'updatecustomerData', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  getcustomerByid(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'getcustomerByid', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  otpverification(data): Observable<any> {

    return this.http.post(apiEndPointUrl + 'otpverification', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }

  rentailData(data): Observable<any> {
    console.log("serveiceData", data);

    return this.http.post(apiEndPointUrl + 'rentailEnquiry', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }

  careerData(data): Observable<any> {
    return this.http.post(apiEndPointUrl + 'saveCareerForm', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }

}
