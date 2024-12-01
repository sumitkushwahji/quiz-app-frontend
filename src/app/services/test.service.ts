import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private baseUrl = 'http://localhost:8082/api/tests';

  constructor(private http: HttpClient) {}

  getFilteredQuestions(filters: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/filter-questions`, {
      params: filters,
    });
  }

  getRandomQuestions(filters: any, numberOfQuestions: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/random-questions`, {
      params: { ...filters, numberOfQuestions },
    });
  }

  createTest(testData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json', // Add Accept header
    });

    return this.http.post(`${this.baseUrl}/create`, testData, { headers });
  }
}
