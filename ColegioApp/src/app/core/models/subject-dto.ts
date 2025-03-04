import { ProfessorDto } from "./professor-dto";
import { StudentDto } from "./student-dto";

export interface SubjectDto {
    id: string;            // Convertimos el GUID a string, ya que es lo que generalmente se maneja en el frontend
    name: string;
    credits: number;
    professors: ProfessorDto[];
    students: StudentDto[];
  }