import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = environment['BASIC_URL'];
export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private http: HttpClient,
    private userStorageService : UserStorageService) { }

    sigin(data):Observable<any>{
      console.log(data);
      return this.http.post(BASIC_URL+"api/admin/login",data);
    }
  
  registerAdmin(data):Observable<any>{
    console.log(data);
    return this.http.post(BASIC_URL+"api/admin/sign-up",data);
  }



  log(message: string): void {
    console.log(`User Auth Service: ${message}`);
  }

  handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
