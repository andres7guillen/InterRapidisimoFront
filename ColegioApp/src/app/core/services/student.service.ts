import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentRegisterModel } from '../models/student-register-model';
import { StudentDto } from '../models/student-dto';
import { ClassmateDto } from '../models/classmate-dto';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://localhost:7057/api/Student';

  constructor(private http: HttpClient) { }

  registerStudent(student: StudentRegisterModel): Observable<StudentDto> {
    return this.http.post<StudentDto>(`${this.apiUrl}`, student);
  }

  getAllStudents(): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(this.apiUrl);
  }

  deleteStudent(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  getStudentById(id: string): Observable<StudentDto> {
    return this.http.get<StudentDto>(`${this.apiUrl}/${id}`);
  }

  getClassMates(id:string): Observable<ClassmateDto[]>{
    return this.http.get<ClassmateDto[]>(`${this.apiUrl}/${id}/classmates`);
  }

}
