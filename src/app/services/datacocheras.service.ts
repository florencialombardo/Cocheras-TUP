import { inject, Injectable } from '@angular/core';
import { Cochera } from '../interfaces/cochera';
import { DataAuthService } from './data-auth.service';
import { Estacionamiento } from '../interfaces/estacionamiento';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatacocherasService {
  cocheras: Cochera[] = []
  estacionamientos: Estacionamiento[] = []
  authService = inject(DataAuthService);

  constructor() {
    this.loadData()
  }

  async loadData(){
    await this.getCocheras(),
    await this.getEstacionamientos()
    this.asociarEstacionamientosConCocheras()
    
  }

  async getCocheras(){
    const res = await fetch(environment.API_URL+'cocheras',{
      method: 'GET',
      headers: {
        authorization: 'Bearer '+localStorage.getItem("authToken")
      },
    })
    if(res.status !== 200) return;
    const resJson:Cochera[] = await res.json();
    this.cocheras = resJson;
  }

  async getEstacionamientos(){
    const res = await fetch(environment.API_URL+'estacionamientos',{
      headers: {
        authorization:'Bearer '+ localStorage.getItem("authToken")
      },
    })
    if(res.status !== 200) return;
    const resJson: Estacionamiento[] = await res.json();
    this.estacionamientos = resJson;
    console.log(this.estacionamientos)
  }

  asociarEstacionamientosConCocheras() {
    this.cocheras = this.cocheras.map(cochera => {
      const estacionamiento = this.estacionamientos.find(e => e.idCochera === cochera.id && !e.horaEgreso)
      return {...cochera, estacionamiento}
    });
    console.log(this.cocheras)
  }

  ultimoNumero = this.cocheras[this.cocheras.length-1]?.id || 0;

  async agregarCochera(descripcion: string): Promise<Cochera | null> {
    const cochera = { descripcion };
  
    try {
      const res = await fetch(environment.API_URL + 'cocheras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + this.authService.usuario?.token
        },
        body: JSON.stringify(cochera)
      });
  
      if (!res.ok) {
        console.log("Error al intentar crear nueva cochera");
        return null;
      }
  
      console.log("Creación exitosa");
      await this.loadData(); // Refresh the data
      return await res.json(); // Return the new cochera
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return null;
    }
  }

  async borrarFila(index:number){
    const cochera = {"descripcion": "Agregada por WebApi"};

    const res = await fetch(environment.API_URL+`cocheras/${index}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer '+this.authService.usuario?.token
      }
      
    })
    if (res.status !== 200) {
      console.log('Error al intentar eliminar cochera')
    } else {
      console.log('Cochera eliminada correctamente')
      this.loadData()
    }
  }

  deshabilitarCochera(index:number){
    this.cocheras[index].deshabilitada = 1;
  }

  habilitarCochera(index:number){
    this.cocheras[index].deshabilitada = 0;
  }

  async abrirEstacionamiento(patente: string, idUsuarioIngreso: string, idCochera: number) {
    const body = {patente, idUsuarioIngreso, idCochera};
    const res = await fetch(environment.API_URL+'estacionamientos/abrir',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+ localStorage.getItem("authToken")
      },
      body: JSON.stringify(body)
    })
    if(res.status !== 200) {
      console.log("Error en abrir estacionamiento")
    } else {
      console.log("Creacion de estacionamiento exitoso")
      this.loadData()
    };
  }  

  
}
