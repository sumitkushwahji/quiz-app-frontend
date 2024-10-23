import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = 'http://localhost:8082/api/question'; // Your Spring Boot API URL

  constructor(private http: HttpClient) {}

  // Function to save the question
  saveQuestion(question: any): Observable<any> {
    return this.http.post(this.apiUrl, question);
  }

  // Fetch all questions
  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
