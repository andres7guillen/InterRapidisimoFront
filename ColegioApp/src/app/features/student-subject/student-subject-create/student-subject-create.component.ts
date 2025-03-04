import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentDto } from '../../../core/models/student-dto';
import { SubjectDto } from '../../../core/models/subject-dto';
import { StudentService } from '../../../core/services/student.service';
import { SubjectService } from '../../../core/services/subject.service';
import { StudentSubjectService } from '../../../core/services/student-subject.service';
import { AlertService } from '../../../core/services/alert-service.service';
import { AssignSubjectToStudentRequest } from '../../../core/models/asign-subject-to-student-request';
import { ProfessorDto } from '../../../core/models/professor-dto';
import { ProfessorService } from '../../../core/services/professor.service';

@Component({
  selector: 'app-student-subject-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-subject-create.component.html',
  styleUrl: './student-subject-create.component.css'
})
export class StudentSubjectCreateComponent {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);
  private subjectService = inject(SubjectService);
  private studentSubjectService = inject(StudentSubjectService);
  private alertService = inject(AlertService);
  private professorService = inject(ProfessorService);
  studentSubjectForm: FormGroup;
  students: StudentDto[] = [];
  subjects: SubjectDto[] = [];
  enrolledSubjects: SubjectDto[] = [];
  professors: ProfessorDto[] = [];

  constructor() {
    this.studentSubjectForm = this.fb.group({
      studentId: [null, Validators.required],
      subjectId: [null, Validators.required],
      professorId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getStudents();
    this.getSubjects();
  }

  getStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (data) => this.students = data,
      error: () => this.alertService.error('Error al cargar estudiantes')
    });
  }

  getSubjects(): void {
    this.subjectService.getAllSubjects().subscribe({
      next: (data) => this.subjects = data,
      error: () => this.alertService.error('Error al cargar materias')
    });
  }

  onStudentChange(): void {
    const studentId = this.studentSubjectForm.get('studentId')?.value;
    if (!studentId) return;

    this.studentSubjectService.getEnrolledSubjects(studentId).subscribe({
      next: (data) => this.enrolledSubjects = data,
      error: (error) => {
        this.alertService.error(error.error);
        //this.studentSubjectForm.reset();
      }
    });
  }

  onSubjectChange(): void {
    const subjectId = this.studentSubjectForm.get('subjectId')?.value;
    if (!subjectId) {
      this.professors = [];
      return;      
    }else{
      this.professorService.getProfessorsBySubject(subjectId).subscribe({
        next: (professors) => this.professors = professors,
        error: (error) => {
          this.alertService.error(error.error);
          this.professors = [];
        }
      });
    }
  }

  assignSubject(): void {
    if (this.studentSubjectForm.invalid) return;

    const request: AssignSubjectToStudentRequest = this.studentSubjectForm.value;
    this.studentSubjectService.enrollStudentInSubject(request.studentId, request).subscribe({
      next: () => {
        this.alertService.success('Materia inscrita correctamente');
        this.studentSubjectForm.reset();
        this.enrolledSubjects = [];
      },
      error: (error) => {
        this.alertService.error(error.error)
      }
    });
  }


  

}
