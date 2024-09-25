import { inject, Injectable } from '@angular/core';
import { Cochera } from '../interfaces/cochera';
import { DataAuthService } from './data-auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatacocherasService {
  cocheras: Cochera[] = []
  authService = inject(DataAuthService);

  constructor() {
    this.getCocheras()
   }

  async getCocheras(){
    const res = await fetch('http://localhost:4000/cocheras',{
      headers: {
        authorization: 'Bearer '+this.authService.usuario?.token
      },
    })
    if(res.status !== 200) return;
    const resJson:Cochera[] = await res.json();
    this.cocheras = resJson;
  }
  ultimoNumero = this.cocheras[this.cocheras.length-1]?.id || 0;

  agregarCochera(){
    this.cocheras.push({
      id: this.ultimoNumero + 1,
      deshabilitada: 0,
      descripcion: '-',
      eliminada: 0
    })
    this.ultimoNumero++;
  }

  borrarFila(index:number){
    this.cocheras.splice(index,1);
  }

  deshabilitarCochera(index:number){
    this.cocheras[index].deshabilitada = 1;
  }

  habilitarCochera(index:number){
    this.cocheras[index].deshabilitada = 0;
  }

  
}
