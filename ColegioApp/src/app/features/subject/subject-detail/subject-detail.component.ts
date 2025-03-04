import { Component } from '@angular/core';
import { SubjectDto } from '../../../core/models/subject-dto';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SubjectService } from '../../../core/services/subject.service';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../core/services/alert-service.service';

@Component({
  selector: 'app-subject-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './subject-detail.component.html',
  styleUrl: './subject-detail.component.css',
  providers: [SubjectService, AlertService]
})
export class SubjectDetailComponent {
  subject: SubjectDto | null = null;
  id: string | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _subjectService: SubjectService,
    private _alertService: AlertService
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.getSubjectById(this.id);
      }
    });
  }

  getSubjectById(id: string): void {
    this._subjectService.getSubjectById(id).subscribe(
      (data) => {
        this.subject = data;  // Asignar los datos a la propiedad subject
      },
      (error) => {
        this._alertService.error('Error al obtener los detalles del subject:','Error');
      }
    );
  }


}
