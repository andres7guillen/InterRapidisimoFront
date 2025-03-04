import { Component, inject, OnInit } from '@angular/core';
import { ProfessorDto } from '../../../core/models/professor-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService } from '../../../core/services/professor.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-professor-detail',
  imports: [CommonModule],
  templateUrl: './professor-detail.component.html',
  styleUrl: './professor-detail.component.css'
})
export class ProfessorDetailComponent implements OnInit{
  professor: ProfessorDto = { id: '', name: '', surName: '', email: '' };
  private route = inject(ActivatedRoute);
  private professorService = inject(ProfessorService);
  private router = inject(Router);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getProfessor(id);
    }
  }

  getProfessor(id: string): void {
    this.professorService.getProfessorById(id).subscribe({
      next: (data) => (this.professor = data),
      error: () => this.router.navigate(['/professors']), // Redirige si el ID no es válido
    });
  }

  goBack(): void {
    this.router.navigate(['/professors']);
  }


}
