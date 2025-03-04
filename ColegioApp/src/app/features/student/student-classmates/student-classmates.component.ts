import { Component, inject } from '@angular/core';
import { StudentService } from '../../../core/services/student.service';
import { AlertService } from '../../../core/services/alert-service.service';
import { StudentDto } from '../../../core/models/student-dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClassmateDto } from '../../../core/models/classmate-dto';

@Component({
  selector: 'app-student-classmates',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-classmates.component.html',
  styleUrl: './student-classmates.component.css'
})
export class StudentClassmatesComponent {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);
  private alertService = inject(AlertService);
  studentClassmateForm: FormGroup;

  studentsForm: StudentDto[] = [];
  studentsClassmates: ClassmateDto[] = [];

  /**
   *
   */
  constructor() {
    this.studentClassmateForm = this.fb.group({
          studentId: [null, Validators.required]
        });
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getClassmates(): void {
      if (this.studentClassmateForm.invalid) return;  
      const idStudent= this.studentClassmateForm.get('studentId')?.value;
      this.studentService.getClassMates(idStudent).subscribe({
        next: (data) => {
          this.studentsClassmates = data;
          this.alertService.success('Estudiantes con clases en común: ');
          this.studentClassmateForm.reset();
        },
        error: (error) => {
          this.alertService.error(error.error)
        }
      });
    }

  getStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (data) => this.studentsForm = data,
      error: () => this.alertService.error('Error al cargar estudiantes')
    });
  }

}
