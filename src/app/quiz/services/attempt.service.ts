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

  startAttempt(attempt: Attempt): Observable<Attempt> {
    return this.http.post<Attempt>(`${this.apiUrl}`, attempt);
  }

  // submitAttempt(id: number, attempt: Attempt): Observable<Attempt> {
  //   return this.http.put<Attempt>(`${this.apiUrl}/${id}`, attempt);
  // }

  getAttemptsByTestId(testId: number): Observable<Attempt[]> {
    return this.http.get<Attempt[]>(`${this.apiUrl}/${testId}`);
  }

  getAttemptById(id: number): Observable<Attempt> {
    return this.http.get<Attempt>(`${this.apiUrl}/id/${id}`);
  }
  submitAttempt(attempt: Attempt): Observable<Attempt> {
    return this.http.put<Attempt>(`${this.apiUrl}/${attempt.testId}`, attempt);
  }
}
