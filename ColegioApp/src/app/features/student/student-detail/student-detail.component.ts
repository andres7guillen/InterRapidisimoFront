import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StudentDto } from '../../../core/models/student-dto';
import { StudentService } from '../../../core/services/student.service';


@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css'
})
export class StudentDetailComponent implements OnInit {
  student: StudentDto | null = null;
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getStudent(this.id);
    }
  }

  getStudent(id: string): void {
    this.studentService.getStudentById(id).subscribe({
      next: (data) => (this.student = data),
      error: () => console.error('Error al obtener el estudiante')
    });
  }
}
