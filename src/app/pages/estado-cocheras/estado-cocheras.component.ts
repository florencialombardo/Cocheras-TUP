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
  esAdmin = true;
  

  cocheras: Cochera[] = []

  dataCocherasService = inject(DatacocherasService)
  borrarFila: any;

  toggleDisponibilidad(index: number) {
    if (this.cocheras[index].deshabilitada === 1) {
      this.cocheras[index].deshabilitada = 0;
    } else {
      this.cocheras[index].deshabilitada = 1;
    }
  }

  ultimoNumero = this.cocheras[this.cocheras.length-1]?.id || 0;
  agregarCochera(){
    
  }

  confirmdelete(cocheraId: number){
    Swal.fire({
      title: "Estas seguro que deseas eliminar permanentemente esta cochera?",
      text: "No vas a poder revertir este cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar de todos modos",
      cancelButtonText: "No eliminar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.borrarFila(cocheraId)
        Swal.fire({
          title: "Eliminada!",
          text: "Su cochera fue eliminada",
          icon: "success"
        });
      } else if (result.isDenied) {
        Swal.fire("No se han guardado los cambios", "", "info");
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

  abrirEstacionamiento(idCochera: number) {
    const idUsuarioIngreso = "ADMIN"
    Swal.fire({
      title: "Abrir Cochera",
      html: `<input type="text" id="patente" class="swal2-input" placeholder="Ingrese patente">`,
      showCancelButton: true,
      confirmButtonText: "Abrir",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const patenteInput = document.getElementById("patente") as HTMLInputElement
        if (!patenteInput || !patenteInput.value) {
          Swal.showValidationMessage("Por favor, ingrese una patente")
          return false;
        }
        return { patente: patenteInput.value };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { patente } = result.value;
        await this.dataCocherasService.abrirEstacionamiento(patente, idUsuarioIngreso, idCochera);
      }
    })
  }

  


  getCocheras(){};

  


  

}




