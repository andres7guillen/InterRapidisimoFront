import { Component } from '@angular/core';
import { SubjectService } from '../../../core/services/subject.service';
import { Router, RouterModule } from '@angular/router';
import { SubjectDto } from '../../../core/models/subject-dto';
import { AlertService } from '../../../core/services/alert-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subject-create',
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './subject-create.component.html',
  styleUrl: './subject-create.component.css'
})
export class SubjectCreateComponent {
  public name: string = '';

  constructor(
    private _subjectService: SubjectService,
    private _alertService: AlertService,
    private _router: Router
  ) {}

  createSubject() {
    this._subjectService.createSubject(this.name).subscribe(
      (response: SubjectDto) => {
        this._alertService.success('Materia creada con éxito:','OK');
        this._router.navigate(['/subjects']);
      },
      (error) => {
        console.error('Error al crear la materia:', error);
      }
    );
  }

}
