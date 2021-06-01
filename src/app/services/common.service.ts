import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  toggleSidebar: Boolean = false;
  apiEndPointUrl = environment.url

  constructor(private http: HttpClient) { }

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


  contactSubmit(data: any): Observable<any> {
    return this.http.post(this.apiEndPointUrl + 'contactEnquiry', data).pipe(
      catchError(this.handleError('getUser', []))
    )
  }

}
