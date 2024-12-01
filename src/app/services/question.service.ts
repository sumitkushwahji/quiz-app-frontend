import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionType } from '../models/question-type.enum';

export interface Question {
  id: number;
  text: string;
  subject: string;
  topic: string;
  exam: string;
  difficulty: string;
  questionType: string;
}

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
  getAllQuestions(
    subject?: string,
    topic?: string,
    exam?: string,
    difficulty?: string,
    questionType?: QuestionType // Optional filter for questionType
  ): Observable<any[]> {
    let params = new HttpParams();

    // Add filters to the params if they are provided
    if (subject) params = params.set('subject', subject);
    if (topic) params = params.set('topic', topic);
    if (exam) params = params.set('exam', exam);
    if (difficulty) params = params.set('difficulty', difficulty);
    if (questionType) params = params.set('questionType', questionType); // Add questionType filter

    return this.http.get<any[]>(this.apiUrl, { params }); // Pass the params to the HTTP request
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

  getFilteredQuestions(filters: any = {}): Observable<any> {
    // Use HttpParams to handle filters properly
    const params = new HttpParams({ fromObject: filters });
    return this.http.get(`${this.apiUrl}/filter`, { params });
  }
}
