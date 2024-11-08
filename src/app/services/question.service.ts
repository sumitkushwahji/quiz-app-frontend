import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = 'http://localhost:8082/api/questions'; // Your Spring Boot API URL

  constructor(private http: HttpClient) {}

  // Function to save the question
  saveQuestion(question: any): Observable<any> {
    return this.http.post(this.apiUrl, question);
  }

  // Fetch all questions
  getAllQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // fetch unique subjects
  getSubjects(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/unique/subjects`);
  }
  // fetch unique subjects
  getExams(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/unique/exams`);
  }
  // fetch unique subjects
  getTopics(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/unique/topics`);
  }

  getQuestionsBySubject(subject: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?subject=${subject}`);
  }

  getQuestionsByTopic(topic: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?topic=${topic}`);
  }

  getQuestionsByExam(exam: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?exam=${exam}`);
  }

  getQuestionsBySubjectTopic(
    subject: string,
    topic: string
  ): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}?subject=${subject}&topic=${topic}`
    );
  }

  getQuestionsBySubjectExam(subject: string, exam: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}?subject=${subject}&exam=${exam}`
    );
  }

  getQuestionsByTopicExam(topic: string, exam: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?topic=${topic}&exam=${exam}`);
  }

  getQuestionsBySubjectTopicExam(
    subject: string,
    topic: string,
    exam: string
  ): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}?subject=${subject}&topic=${topic}&exam=${exam}`
    );
  }
}
