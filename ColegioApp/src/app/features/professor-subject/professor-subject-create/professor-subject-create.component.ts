import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfessorSubjectService } from '../../../core/services/professor-subject.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../core/services/alert-service.service';
import { ProfessorDto } from '../../../core/models/professor-dto';
import { SubjectDto } from '../../../core/models/subject-dto';
import { ProfessorService } from '../../../core/services/professor.service';
import { SubjectService } from '../../../core/services/subject.service';
import { AssignSubjectRequest } from '../../../core/models/asign-subject-to-professor-request';

@Component({
  standalone: true,
  selector: 'app-professor-subject-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './professor-subject-create.component.html',
  styleUrl: './professor-subject-create.component.css'
})
export class ProfessorSubjectCreateComponent {
  private fb = inject(FormBuilder);
  private professorService = inject(ProfessorService);
  private subjectService = inject(SubjectService);
  private professorSubjectService = inject(ProfessorSubjectService);
  private router = inject(Router);
  private alertService = inject(AlertService);

  professorSubjectForm: FormGroup;
  professors: ProfessorDto[] = [];
  subjects: SubjectDto[] = [];
  professorSubjects: SubjectDto[] = [];

  constructor() {
    this.professorSubjectForm = this.fb.group({
      professorId: ['', Validators.required],
      subjectId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getProfessors();
    this.getSubjects();
  }

  getProfessors() {
    this.professorService.getAllProfessors().subscribe({
      next: (data) => (this.professors = data),
      error: () => this.alertService.error('Error al cargar profesores')
    });
  }

  getSubjects() {
    this.subjectService.getAllSubjects().subscribe({
      next: (data) => (this.subjects = data),
      error: () => this.alertService.error('Error al cargar materias')
    });
  }

  assignSubject() {
    if (this.professorSubjectForm.invalid) return;

    const request: AssignSubjectRequest = this.professorSubjectForm.value;
    this.professorSubjectService.assignSubjectToProfessor(request).subscribe({
      next: () => {
        this.professorSubjectForm.reset();
        this.professorSubjects = [];
        this.alertService.success('Materia asignada correctamente');
        this.router.navigate(['/professor-subjects']);
      },
      error: (error) =>{
        this.alertService.error(error.error);
        this.professorSubjectForm.reset();
        this.professorSubjects = [];
      } 
    });
  }

  onProfessorChange(): void {
    this.professorSubjects = [];
    const professorId = this.professorSubjectForm.get('professorId')?.value;
    if (!professorId) return;

    this.professorSubjectService.getSubjectsByProfessor(professorId).subscribe(professorSubjects => {
      this.professorSubjects = professorSubjects;

      // Filtrar las materias disponibles excluyendo las que ya dicta el profesor
      // this.subjects = this.subjects.filter(subject =>
      //   !this.professorSubjects.some(ps => ps.id === subject.id)
      // );
    });
  }

  cancel(): void {
    this.router.navigate(['/professor-subjects']); 
  }

}


