import { Component } from '@angular/core';
import { StudentRegisterModel } from '../../../core/models/student-register-model';
import { StudentService } from '../../../core/services/student.service';
import { AlertService } from '../../../core/services/alert-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-student-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-register.component.html',
  styleUrl: './student-register.component.css'
})
export class StudentRegisterComponent {
  public studentForm: FormGroup;
  public student: StudentRegisterModel = { name: '', surName: '', email: '' };

  constructor(private fb: FormBuilder,
    private studentService: StudentService,
    private alertService: AlertService,
    private router: Router) {
      this.studentForm = this.fb.group({
        name: ['', Validators.required],
        surName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });
    }

    register() {
      if (this.studentForm.valid) {
        const student: StudentRegisterModel = this.studentForm.value;
  
        // Llama al servicio para registrar el estudiante
        this.studentService.registerStudent(student).subscribe({
          next: (student) => {
            this.alertService.success('Estudiante registrado con éxito');
            this.router.navigate(['/students']);  // Redirige a la lista de estudiantes
          },
          error: (err) => {
            this.alertService.error('Hubo un error al registrar al estudiante');
          },
        });
      } else {
        this.alertService.error('Por favor, completa todos los campos correctamente.');
      }
    }

}
