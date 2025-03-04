import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubjectDto } from '../models/subject-dto';
import { AssignSubjectToStudentRequest } from '../models/asign-subject-to-student-request';

@Injectable({
  providedIn: 'root'
})
export class StudentSubjectService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7057/api/Student';

  constructor() { }

  enrollStudentInSubject(studentId: string, request: AssignSubjectToStudentRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${studentId}/enroll-subject`, request);
  }


  getEnrolledSubjects(studentId: string): Observable<SubjectDto[]> {
    return this.http.get<SubjectDto[]>(`${this.baseUrl}/${studentId}/subjects`);
  }

}
