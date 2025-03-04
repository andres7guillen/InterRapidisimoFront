import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfessorService } from '../../../core/services/professor.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../core/services/alert-service.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-professor-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './professor-create.component.html',
  styleUrl: './professor-create.component.css'
})
export class ProfessorCreateComponent {
  private fb = inject(FormBuilder);
  private professorService = inject(ProfessorService);
  private router = inject(Router);
  private alertService = inject(AlertService);

  professorForm: FormGroup;

  constructor() {
    this.professorForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  registerProfessor() {
    if (this.professorForm.invalid) return;

    this.professorService.registerProfessor(this.professorForm.value).subscribe({
      next: () => {
        this.alertService.success('Profesor registrado con éxito');
        this.router.navigate(['/professors']);
      },
      error: () => this.alertService.error('Error al registrar profesor')
    });
  }

  navigateToList() {
    this.router.navigate(['/professors']);
  }

}
