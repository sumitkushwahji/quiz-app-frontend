import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attempt } from '../models/attempt.model';
import { Result } from '../models/answer.model';

@Injectable({
  providedIn: 'root',
})
export class AttemptService {
  private apiUrl = 'http://localhost:8082/api/attempts';

  constructor(private http: HttpClient) {}

  submitAttempt(attempt: Attempt): Observable<Result> {
    return this.http.post<Result>(this.apiUrl, attempt);
  }
}
