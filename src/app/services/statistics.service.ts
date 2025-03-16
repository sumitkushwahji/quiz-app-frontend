import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Statistics {
  questionCount: number;
  testCount: number;
  userCount: number;
  questionsPerTest: number;
  totalAttempts: number;
  completedAttempts: number;
  activeUsers: number;
  averageTestScore: number;
}

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private baseUrl = 'http://localhost:8082/api/statistics';

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>(this.baseUrl);
  }
}
