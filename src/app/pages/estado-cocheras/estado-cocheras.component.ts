import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cochera } from '../../interfaces/cochera';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { DatacocherasService } from '../../services/datacocheras.service';
import { DataAuthService } from '../../services/data-auth.service';
import { DataTarifasService } from '../../services/data-tarifa.service';


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
  

  dataTarifasService = inject(DataTarifasService)

  toggleDisponibilidad(index: number) {
    if (this.cocheras[index].deshabilitada === 1) {
      this.cocheras[index].deshabilitada = 0;
    } else {
      this.cocheras[index].deshabilitada = 1;
    }
  }

  ultimoNumero = this.cocheras[this.cocheras.length-1]?.id || 0;
  agregarCochera(){
    console.log('Agregar cochera button clicked');
    Swal.fire({
      title: 'Agregar Nueva Cochera',
      input: 'text',
      inputLabel: 'Descripción',
      inputPlaceholder: 'Ingrese la descripción de la cochera',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      
    }).then(async (result) => {
      if (result.isConfirmed) {
        const nuevaCochera = await this.dataCocherasService.agregarCochera(result.value);
        if (nuevaCochera) {
          Swal.fire('Éxito', 'Cochera agregada correctamente', 'success');
        } else {
          Swal.fire('Error', 'No se pudo agregar la cochera', 'error');
        }
      }
    });
  }

  borrarFila(cocheraId: number){
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
        await this.dataCocherasService.confirmdelete(cocheraId)
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
      title: "Deshabilitar cochera?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.toggleDisponibilidad(index);

        Swal.fire("Cochera Deshabilitada!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Cambio no guardado", "", "info");
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

  cerrarEstacionamiento(cochera: Cochera) {
    const horario = cochera.estacionamiento?.horaIngreso;
    let fechaIngreso;
    let horasPasadas = 0; 
    let minutosPasados = 0; 
    let patente: string;
    let tarifaABuscar: string;
    let total;

    if (horario) {
        fechaIngreso = new Date(horario);

        if (fechaIngreso) {
            const fechaActual = new Date();
            const diferenciaEnMilisegundos = fechaActual.getTime() - fechaIngreso.getTime();
            horasPasadas = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60));
            minutosPasados = Math.floor((diferenciaEnMilisegundos % (1000 * 60 * 60)) / (1000 * 60));
        }

        patente = cochera.estacionamiento?.patente!;

        const totalMinutos = horasPasadas * 60 + minutosPasados;
        if (totalMinutos <= 30) {
            tarifaABuscar = "MEDIAHORA";
        } else if (totalMinutos <= 60) {
            tarifaABuscar = "PRIMERAHORA";
        } else {
            tarifaABuscar = "VALORHORA";
        }

        total = this.dataTarifasService.tarifas.find(t => t.id === tarifaABuscar)?.valor;
    }

    const horaFormateada = fechaIngreso ? fechaIngreso.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    Swal.fire({
        html: `
            <div style="text-align: left;">
                <h4>Horario de inicio: ${horaFormateada}</h4>
                <h4>Tiempo transcurrido: ${horasPasadas} horas y ${minutosPasados} minutos</h4>
                <hr style="border: 1px solid #ccc;">
                <h2 style="margin: 20px 0 10px; text-align: center;">Total a cobrar</h2>
                <div style="background-color: #28a745; color: white; font-size: 24px; padding: 10px; border-radius: 5px; text-align: center; margin: 0 auto; display: block; width: fit-content;">
                    $${total}
                </div>
                <div style="margin-top: 20px; text-align: center;">
                    <button id="cobrar" class="swal2-confirm swal2-styled" style="background-color: #007bff; padding: 10px 24px;">Cobrar</button>
                    <button id="volver" class="swal2-cancel swal2-styled" style="background-color: #aaa; padding: 10px 24px;">Volver</button>
                </div>
            </div>`,
        showConfirmButton: false,
        didOpen: () => {
            const cobrarButton = document.getElementById('cobrar');
            const volverButton = document.getElementById('volver');
            
            if (cobrarButton) {
                cobrarButton.addEventListener('click', async () => {
                    const idUsuarioEgreso = "ADMIN";
                    await this.dataCocherasService.cerrarEstacionamiento(patente, idUsuarioEgreso);
                    Swal.close();
                });
            }
            
            if (volverButton) {
                volverButton.addEventListener('click', () => {
                    Swal.close();
                });
            }
        }
    });
  }

  


  

  


  

}




