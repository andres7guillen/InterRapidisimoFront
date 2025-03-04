import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  success(message: string, title: string = '¡Éxito!') {
    Swal.fire({
      title,
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  error(message: string, title: string = '¡Error!') {
    Swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Cerrar',
    });
  }

  warning(message: string, title: string = '¡Advertencia!') {
    Swal.fire({
      title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Entendido',
    });
  }

  confirm(message: string, title: string = 'Confirmación', confirmButtonText: string = 'Sí', cancelButtonText: string = 'No') {
    return Swal.fire({
      title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      reverseButtons: true,
    }).then(result => result.isConfirmed);
  }

}
