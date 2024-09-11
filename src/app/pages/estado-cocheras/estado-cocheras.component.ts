import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cochera } from '../../interfaces/cochera';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './estado-cocheras.component.html',
  styleUrl: './estado-cocheras.component.scss'
})
export class EstadoCocherasComponent {

  cocheras: Cochera[] = [{
    number: 1,
    disponibilidad: 'Disponible',
    fechaIngreso: 'monday',
    acciones: '-',
  },
  {
    number: 2,
    disponibilidad: 'Disponible',
    fechaIngreso: 'monday',
    acciones: '-',
  },
  {
    number: 3,
    disponibilidad: 'Disponible',
    fechaIngreso: 'monday',
    acciones: '-',
  }]

  toggleDisponibilidad(index: number) {
    if (this.cocheras[index].disponibilidad === 'Disponible') {
      this.cocheras[index].disponibilidad = 'Deshabilitada';
    } else {
      this.cocheras[index].disponibilidad = 'Disponible';
    }
  }

  ultimoNumero = this.cocheras[this.cocheras.length-1]?.number || 0;
  agregarCochera(){
    this.cocheras.push({
      number: this.ultimoNumero + 1,
      disponibilidad: 'Disponible',
      fechaIngreso: '03/09/2024 18:45',
      acciones: '-',
    })
    this.ultimoNumero++;
  }

  confirmdelete(){
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    

  }

  confirmdeshabilitar(){
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

  }


  

}




