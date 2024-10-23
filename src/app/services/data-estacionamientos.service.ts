import { inject, Injectable } from '@angular/core';
import { DatacocherasService } from './datacocheras.service';
import { Estacionamiento } from '../interfaces/estacionamiento';

@Injectable({
  providedIn: 'root'
})
export class DataEstacionamientosService {
  dataCocherasService = inject(DatacocherasService)
  ultimasTransacciones: Estacionamiento[] = [];

  constructor() {
    this.getUltimasTransacciones();
  }

  async getUltimasTransacciones(cantidad = 5) {
    if (!this.dataCocherasService.estacionamientos || this.dataCocherasService.estacionamientos.length === 0) {
      console.error("No hay estacionamientos disponibles");
    }

    const transaccionesFiltradas = this.dataCocherasService.estacionamientos.filter(estacionamiento => 
        estacionamiento.horaEgreso !== null && estacionamiento.horaEgreso !== undefined
    );

    const ultimasTransacciones = transaccionesFiltradas
        .sort((a, b) => new Date(b.horaIngreso).getTime() - new Date(a.horaIngreso).getTime()) // Ordenar de más reciente a más antiguo
        .slice(0, cantidad);

    this.ultimasTransacciones = ultimasTransacciones;
  }
}
