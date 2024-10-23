export interface Estacionamiento{
    id: number,
    patente: string,
    horaIngreso: Date,
    horaEgreso: Date,
    costo: number,
    idUsuarioIngreso: string,
    idUsuarioEgreso: string,
    idCochera: number,
    eliminado: boolean
}