import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cochera } from '../../interfaces/cochera';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { DatacocherasService } from '../../services/datacocheras.service';
import { DataAuthService } from '../../services/data-auth.service';

@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './estado-cocheras.component.html',
  styleUrl: './estado-cocheras.component.scss'
})
export class EstadoCocherasComponent {

  authService = inject(DataAuthService);
  

  cocheras: Cochera[] = []

  dataCocherasService = inject(DatacocherasService)

  toggleDisponibilidad(index: number) {
    if (this.cocheras[index].deshabilitada === 1) {
      this.cocheras[index].deshabilitada = 0;
    } else {
      this.cocheras[index].deshabilitada = 1;
    }
  }

  ultimoNumero = this.cocheras[this.cocheras.length-1]?.id || 0;
  agregarCochera(){
    this.cocheras.push({
      id: this.ultimoNumero + 1,
      deshabilitada: 1,
      descripcion: '03/09/2024 18:45',
      eliminada: 1,
    })
    this.ultimoNumero++;
  }

  confirmdelete(){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
    

  }

  confirmdeshabilitar(index: number){
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.toggleDisponibilidad(index);

        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

  }

  getCocheras(){};


  

}




