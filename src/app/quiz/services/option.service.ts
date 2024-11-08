import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Option } from '../models/option.model';

@Injectable({
  providedIn: 'root',
})
export class OptionService {
  private apiUrl = 'http://localhost:8082/api/options';

  constructor(private http: HttpClient) {}

  getOptionsByQuestionId(questionId: number): Observable<Option[]> {
    return this.http.get<Option[]>(`${this.apiUrl}/question/${questionId}`);
  }

  createOption(option: Option): Observable<Option> {
    return this.http.post<Option>(this.apiUrl, option);
  }

  updateOption(option: Option): Observable<Option> {
    return this.http.put<Option>(`${this.apiUrl}/${option.id}`, option);
  }

  deleteOption(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
