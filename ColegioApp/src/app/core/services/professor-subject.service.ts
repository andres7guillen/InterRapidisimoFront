import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignSubjectRequest } from '../models/asign-subject-to-professor-request';
import { SubjectDto } from '../models/subject-dto';

@Injectable({
  providedIn: 'root'
})
export class ProfessorSubjectService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7057/api/Professor';

  constructor() { }

  assignSubjectToProfessor(request: AssignSubjectRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/assign-subject`, request);
  }

  getSubjectsByProfessor(professorId: string): Observable<SubjectDto[]> {
    return this.http.get<SubjectDto[]>(`${this.baseUrl}/${professorId}/subjects`);
  }

}
