import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../models/test.model';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private apiUrl = 'http://localhost:8082/api/tests';

  constructor(private http: HttpClient) {}

  // Get all tests
  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(this.apiUrl);
  }

  getTestById(id: number): Observable<Test> {
    return this.http.get<Test>(`${this.apiUrl}/${id}`);
  }

  createTest(testData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, testData);
  }

  updateTest(test: Test): Observable<Test> {
    return this.http.put<Test>(`${this.apiUrl}/${test.id}`, test);
  }

  deleteTest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  createRandomTest(
    subject: string,
    topic: string,
    exam: string,
    numberOfQuestions: number
  ): Observable<Test> {
    // Construct the query parameters
    const params = new HttpParams()
      .set('subject', subject)
      .set('topic', topic)
      .set('exam', exam)
      .set('numberOfQuestions', numberOfQuestions.toString()); // Make sure to convert number to string

    // Send the GET request with query parameters
    return this.http.post<Test>(`${this.apiUrl}/create-random`, null, {
      params,
    });
  }
}
