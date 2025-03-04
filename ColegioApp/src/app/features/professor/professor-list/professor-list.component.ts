import { Component, inject } from '@angular/core';
import { ProfessorDto } from '../../../core/models/professor-dto';
import { ProfessorService } from '../../../core/services/professor.service';
import { AlertService } from '../../../core/services/alert-service.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-professor-list',
  imports: [CommonModule,RouterModule],
  templateUrl: './professor-list.component.html',
  styleUrl: './professor-list.component.css'
})
export class ProfessorListComponent {
  public professors: ProfessorDto[] = [];

  private professorService = inject(ProfessorService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getProfessors();
  }

  getProfessors(): void {
    this.professorService.getAllProfessors().subscribe((data) => {
      this.professors = data;
    });
  }

  deleteProfessor(id: string): void {
    this.alertService.confirm('¿Estás seguro de que deseas eliminar este profesor?').then((isConfirmed) => {
      if (isConfirmed) {
        this.professorService.deleteProfessor(id).subscribe(() => {
          this.professors = this.professors.filter((p) => p.id !== id);
          this.alertService.success('Profesor eliminado correctamente');
        });
      }
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/professors/detail', id]);
  }

  createProfessor(): void {
    this.router.navigate(['/professors/create']);
  }

}
