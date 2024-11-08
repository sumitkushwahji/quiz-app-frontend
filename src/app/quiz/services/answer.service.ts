import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Answer } from '../models/attempt.model';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private apiUrl = 'http://localhost:8082/api/answers';

  constructor(private http: HttpClient) {}

  submitAnswers(answers: Answer[]): Observable<void> {
    return this.http.post<void>(this.apiUrl, answers);
  }
}
