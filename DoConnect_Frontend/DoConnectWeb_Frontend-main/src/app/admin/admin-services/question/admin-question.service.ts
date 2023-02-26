import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class AdminQuestionService {

  constructor(private http: HttpClient,
  ) { }

  getAllpendingQuestions():Observable<any>{
    return this.http.get(BASIC_URL+"api/admin/allQuestions");
  }

  getAllpendingAnswers():Observable<any>{
    return this.http.get(BASIC_URL+"api/admin/allAnswers");
  }

  deleteAnswer(id):Observable<any>{
    return this.http.delete(BASIC_URL+`api/admin/answer/${id}`);
  }

  deleteQuestion(id):Observable<any>{
    return this.http.delete(BASIC_URL+`api/admin/${id}`);
  }

  approveQuestion(id):Observable<any>{
    return this.http.post(BASIC_URL+`api/admin/approveQuestion/${id}`,null);
  }

  approveAnswer(id):Observable<any>{
    return this.http.post(BASIC_URL+`api/admin/approveAnswer/${id}`,null);
  }
}
