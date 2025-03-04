import { Routes } from '@angular/router';


import { StudentListComponent } from './features/student/student-list/student-list.component';
import { SubjectListComponent } from './features/subject/subject-list/subject-list.component';
import { ProfessorListComponent } from './features/professor/professor-list/professor-list.component';
import { StudentRegisterComponent } from './features/student/student-register/student-register.component';
import { StudentEditComponent } from './features/student/student-edit/student-edit.component';
import { StudentDetailComponent } from './features/student/student-detail/student-detail.component';
import { SubjectCreateComponent } from './features/subject/subject-create/subject-create.component';
import { SubjectEditComponent } from './features/subject/subject-edit/subject-edit.component';
import { SubjectDetailComponent } from './features/subject/subject-detail/subject-detail.component';
import { StudentSubjectCreateComponent } from './features/student-subject/student-subject-create/student-subject-create.component';
import { ProfessorCreateComponent } from './features/professor/professor-create/professor-create.component';
import { ProfessorEditComponent } from './features/professor/professor-edit/professor-edit.component';
import { ProfessorDetailComponent } from './features/professor/professor-detail/professor-detail.component';
import { ProfessorSubjectCreateComponent } from './features/professor-subject/professor-subject-create/professor-subject-create.component';

const loadStudentListComponent = () => import('./features/student/student-list/student-list.component').then(m => m.StudentListComponent);
const loadStudentRegisterComponent = () => import('./features/student/student-register/student-register.component').then(m => m.StudentRegisterComponent);
const loadStudentEditComponent = () => import('./features/student/student-edit/student-edit.component').then(m => m.StudentEditComponent);
const loadStudentDetailComponent = () => import('./features/student/student-detail/student-detail.component').then(m => m.StudentDetailComponent);
const loadStudentClassMatesComponent = () => import('./features/student/student-classmates/student-classmates.component').then(m => m.StudentClassmatesComponent);

const loadSubjectListComponent = () => import('./features/subject/subject-list/subject-list.component').then(m => m.SubjectListComponent);
const loadSubjectCreateComponent = () => import('./features/subject/subject-create/subject-create.component').then(m => m.SubjectCreateComponent);
const loadSubjectEditComponent = () => import('./features/subject/subject-edit/subject-edit.component').then(m => m.SubjectEditComponent);
const loadSubjectDetailComponent = () => import('./features/subject/subject-detail/subject-detail.component').then(m => m.SubjectDetailComponent);
const loadStudentSubjectCreateComponent = () => import('./features/student-subject/student-subject-create/student-subject-create.component').then(m => m.StudentSubjectCreateComponent);
const loadProfessorListComponent = () => import('./features/professor/professor-list/professor-list.component').then(m => m.ProfessorListComponent);
const loadProfessorCreateComponent = () => import('./features/professor/professor-create/professor-create.component').then(m => m.ProfessorCreateComponent);
const loadProfessorEditComponent = () => import('./features/professor/professor-edit/professor-edit.component').then(m => m.ProfessorEditComponent);
const loadProfessorDetailComponent = () => import('./features/professor/professor-detail/professor-detail.component').then(m => m.ProfessorDetailComponent);

const loadProfessorSubjectCreateComponent = () => import('./features/professor-subject/professor-subject-create/professor-subject-create.component').then(m => m.ProfessorSubjectCreateComponent);

export const appRoutes: Routes = [
  // Estudiantes
  { path: 'students', loadComponent: loadStudentListComponent },
  { path: 'student/register', loadComponent: loadStudentRegisterComponent },
  { path: 'student/edit/:id', loadComponent: loadStudentEditComponent },
  { path: 'student/detail/:id', loadComponent: loadStudentDetailComponent },
  { path: 'student-classmates', loadComponent: loadStudentClassMatesComponent },

  // Materias
  { path: 'subjects', loadComponent: loadSubjectListComponent },
  { path: 'subjects/create', loadComponent: loadSubjectCreateComponent },
  { path: 'subjects/edit/:id', loadComponent: loadSubjectEditComponent },
  { path: 'subjects/detail/:id', loadComponent: loadSubjectDetailComponent },

  // Relación Estudiante-Materia
  { path: 'student-subjects', loadComponent: loadStudentSubjectCreateComponent },

  // Profesores
  { path: 'professors', loadComponent: loadProfessorListComponent },
  { path: 'professors/create', loadComponent: loadProfessorCreateComponent },
  { path: 'professors/edit/:id', loadComponent: loadProfessorEditComponent },
  { path: 'professors/detail/:id', loadComponent: loadProfessorDetailComponent },

  // Relación Profesor-Materia
  { path: 'professor-subjects', loadComponent: loadProfessorSubjectCreateComponent },

  // Redirecciones
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: '**', redirectTo: '/students' }
];

