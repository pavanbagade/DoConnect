import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient,
    private userStorageService : UserStorageService) { }

  postQuestion(data: any): Observable<any> {
    data.user_id = UserStorageService.getUserId();
    return this.http
      .post<[]>(BASIC_URL+"api/question",data, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Question Added successfully')),
        catchError(this.handleError<[]>('Error Posting New Question', []))
      );
  }


  getAllQuestions(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL+"api/question/all", {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Question Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Question', []))
      );
  }

  getQuestionById(id): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http
      .get<[]>(BASIC_URL+`api/question/${id}/${userId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Question Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Question', []))
      );
  }

  searchQuestionByTitle(pageNum, title): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL+`api/question/search/${pageNum}/${title}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Question Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Question', []))
      );
  }

  addAnswer(data): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL+`api/question/addAnswer`, data,{
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Answer Added successfully')),
        catchError(this.handleError<[]>('Error Adding Answer', []))
      );
  }

  getLatestQuestions(pageNum): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL+`api/question/latest/${pageNum}`,{
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Question Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Question', []))
      );
  }

  getQuestionsByUser(pageNum): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http
      .get<[]>(BASIC_URL+`api/question/user/${userId}/${pageNum}`,{
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Question Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Question', []))
      );
  }





  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
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