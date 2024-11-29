// question.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question, QuestionType } from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private baseUrl = 'http://localhost:8082/api/questions'; // Adjust this URL to your backend endpoint

  constructor(private http: HttpClient) {}

  // Get all questions for a specific test
  getQuestionsByTestId(testId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/${testId}`);
  }

  // Get a specific question by ID
  getQuestionById(questionId: number): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/${questionId}`);
  }

  // Add a new question
  createQuestion(testId: number, questionData: Question): Observable<Question> {
    return this.http.post<Question>(
      `${this.baseUrl}/test/${testId}`,
      questionData
    );
  }

  // Edit an existing question
  updateQuestion(
    questionId: number,
    questionData: Question
  ): Observable<Question> {
    return this.http.put<Question>(
      `${this.baseUrl}/${questionId}`,
      questionData
    );
  }

  // Delete a question
  deleteQuestion(questionId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${questionId}`);
  }
  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.baseUrl);
  }

  getFilteredQuestions(filters: {
    subject?: string;
    topic?: string;
    exam?: string;
    questionType?: QuestionType;
  }): Observable<Question[]> {
    let params = new HttpParams();
    if (filters.subject) params = params.set('subject', filters.subject);
    if (filters.topic) params = params.set('topic', filters.topic);
    if (filters.exam) params = params.set('exam', filters.exam);
    if (filters.questionType)
      params = params.set('questionType', filters.questionType);

    return this.http.get<Question[]>(this.baseUrl, { params }); // Updated to use base URL without '/filter'
  }
  // Fetch unique subjects
  getUniqueSubjects(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/unique/subjects`);
  }

  // Fetch unique topics
  getUniqueTopics(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/unique/topics`);
  }

  // Fetch unique exams
  getUniqueExams(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/unique/exams`);
  }
}
