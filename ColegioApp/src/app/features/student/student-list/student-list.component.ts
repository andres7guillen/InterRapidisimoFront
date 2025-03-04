import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { StudentDto } from "../../../core/models/student-dto";
import { StudentService } from "../../../core/services/student.service";
import { Router, RouterModule } from "@angular/router";
import { AlertService } from "../../../core/services/alert-service.service";


@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  students: StudentDto[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  // Cargar estudiantes
  getStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (data) => (this.students = data),
      error: (err) => this.alertService.error('Error al cargar estudiantes')
    });
  }

  // Ir al detalle del estudiante
  viewDetails(id: string): void {
    this.router.navigate(['/students/detail', id]);
  }

  navigateToRegister(): void {
    this.router.navigate(['/students/register']);
  }


  deleteStudent(id: string): void {
    this.alertService.confirm('¿Estás seguro?', 'Eliminar estudiante').then((confirmed) => {
      if (confirmed) {
        this.studentService.deleteStudent(id).subscribe({
          next: () => {
            this.alertService.success('Estudiante eliminado con éxito');
            this.getStudents(); // Recargar la lista
          },
          error: (error) => this.alertService.error(error.message)
        });
      }
    });
  }
}

