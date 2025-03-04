import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfessorDto } from '../models/professor-dto';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private apiUrl = 'https://localhost:7057/api/Professor';
  private http = inject(HttpClient);

  constructor() { }

  getAllProfessors(): Observable<ProfessorDto[]> {
    return this.http.get<ProfessorDto[]>(this.apiUrl);
  }

  deleteProfessor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProfessorById(id: string): Observable<ProfessorDto> {
    return this.http.get<ProfessorDto>(`${this.apiUrl}/${id}`);
  }

  getProfessorsBySubject(subjectId: string): Observable<ProfessorDto[]> {
    return this.http.get<ProfessorDto[]>(`${this.apiUrl}/by-subject/${subjectId}`);
  }

  registerProfessor(professor: { name: string; surname: string; email: string }): Observable<ProfessorDto> {
    return this.http.post<ProfessorDto>(this.apiUrl, professor);
  }

}
