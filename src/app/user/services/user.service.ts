import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserAchievement } from '../models/achievement.model';
import { UserTestProgress } from '../models/test-progress.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8082/api/users';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/register`, user);
  }

  login(user: User): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/login`, user);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  saveTestProgress(progress: UserTestProgress): Observable<UserTestProgress> {
    return this.http.post<UserTestProgress>(
      `${this.baseUrl}/progress`,
      progress
    );
  }

  getUserAchievements(userId: number): Observable<UserAchievement[]> {
    return this.http.get<UserAchievement[]>(
      `${this.baseUrl}/${userId}/achievements`
    );
  }
}
