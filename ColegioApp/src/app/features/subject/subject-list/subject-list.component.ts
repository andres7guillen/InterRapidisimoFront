import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SubjectDto } from '../../../core/models/subject-dto';
import { SubjectService } from '../../../core/services/subject.service';
import { AlertService } from '../../../core/services/alert-service.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-subject-list',
  imports: [CommonModule,RouterModule],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.css'
})
export class SubjectListComponent {
  subjects: SubjectDto[] = [];
  private subjectService = inject(SubjectService);
  private alertService = inject(AlertService);
  constructor(){}

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(){
    this.subjectService.getAllSubjects().subscribe(
      (data) => {
        this.subjects = data;
      },
      (error) => {
        this.alertService.error('No se pudieron obtener las materias. Intenta nuevamente más tarde.',error);
      }
    );
  }

  deleteSubject(subject: SubjectDto) {
    this.alertService.confirm('¿Estás seguro de que quieres eliminar esta materia?', 'Eliminar materia').then((confirmed) => {
      if (confirmed) {
        this.subjectService.deleteSubject(subject.id).subscribe({
          next: () => {
            this.alertService.success('Materia eliminada con éxito');
            // Actualizar la lista después de eliminarla (si es necesario)
            this.getSubjects();
          },
          error: (error) => {
            this.alertService.error('Hubo un error al eliminar la materia');
          }
        });
      } else {
        console.log('Eliminación cancelada');
      }
    });
  }

}
