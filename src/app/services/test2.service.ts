import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Test2Service {
  private baseUrl = 'http://localhost:8082/api/tests2';

  constructor(private http: HttpClient) {}
  createTest(testData: any): Observable<any> {
    const params = new HttpParams()
      .set('name', testData.name)
      .set('description', testData.description)
      .set('subject', testData.subject || '')
      .set('topic', testData.topic || '')
      .set('exam', testData.exam || '')
      .set('difficulty', testData.difficulty || '')
      .set('questionCount', testData.questionCount.toString())
      .set('duration', testData.duration ? testData.duration.toString() : '')
      .set('startTime', testData.startTime || '')
      .set('endTime', testData.endTime || '');

    return this.http.post(`${this.baseUrl}/dynamic`, {}, { params });
  }
}
