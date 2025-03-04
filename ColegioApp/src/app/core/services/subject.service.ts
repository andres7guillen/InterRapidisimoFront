import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubjectDto } from '../models/subject-dto';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'https://localhost:7057/api/Subject';

  constructor(private http: HttpClient) { }

  getAllSubjects(): Observable<SubjectDto[]> {
    return this.http.get<SubjectDto[]>(this.apiUrl);
  }

  getSubjectById(id: string): Observable<SubjectDto> {
    return this.http.get<SubjectDto>(`${this.apiUrl}/${id}`);
  }

  createSubject(name: string): Observable<SubjectDto> {
    const command = { name };
    return this.http.post<SubjectDto>(`${this.apiUrl}`, command);
  }

  deleteSubject(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

}
