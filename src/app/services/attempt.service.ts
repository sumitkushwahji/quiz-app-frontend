import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttemptService {
  private baseUrl = 'http://localhost:8082/api/attempts';

  constructor(private http: HttpClient) {}

  /**
   * Start an attempt by providing userId and testId.
   * @param userId - The ID of the user starting the attempt.
   * @param testId - The ID of the test to attempt.
   * @returns Observable containing the Attempt object.
   */
  startAttempt(userId: number, testId: number): Observable<any> {
    const url = `${this.baseUrl}/start?userId=${userId}&testId=${testId}`;
    return this.http.post<any>(url, {});
  }

  /**
   * Submit an answer for a specific question in an attempt.
   * @param attemptId - The ID of the current attempt.
   * @param questionId - The ID of the question being answered.
   * @param userAnswer - The user's answer to the question.
   * @returns Observable containing a success message.
   */
  submitAnswer(
    attemptId: number,
    questionId: number,
    userAnswer: string
  ): Observable<string> {
    const url = `${this.baseUrl}/${attemptId}/answers`;
    return this.http.post<string>(url, null, {
      params: {
        questionId: questionId.toString(),
        userAnswer: userAnswer,
      },
    });
  }

  /**
   * End an attempt and retrieve the final score.
   * @param attemptId - The ID of the attempt to end.
   * @returns Observable containing the final score.
   */
  endAttempt(attemptId: number): Observable<number> {
    const url = `${this.baseUrl}/${attemptId}/end`;
    return this.http.post<number>(url, {});
  }

  getAttemptReview(attemptId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${attemptId}/review`);
  }

  getAttemptedTests(userId: number): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.baseUrl}/user/${userId}/attempted-tests`
    );
  }
}
