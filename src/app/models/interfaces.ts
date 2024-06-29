export interface Incidencias {

    titulo: string ;
    fecha: string ;
    hora:string ;
    idUsuario: string ;
    descripcion: string ;
    lugar: string;
    imagen: string;
    idIncidencia: string;
    idEstado: number;
    justificacionCirre: string;
    idPrioridad: number;
    idRiesgo: number;
    idAfectacion: number;
    idCategoria: number;
    obsevaciones: string;
    idBitacora: number;
    
}

export interface Diagnosticos {
    fecha: string ;
    hora:string ;
    idUsuario: string ;
    detalles: string ;
    comprar: string;
    tiempoS: number;
    idIncidencia: string;
    idDiagnostico: string;
}

export interface Asignacion {
    ct_idAsigancion: string;
    ct_idIncidencia: string;
    cn_idUsuarioTce: number;
}

export interface Roles{
    cn_idRol : number;
    ct_tipoRol: string;
}
export interface BitacoraCambioEstado{
    cn_idBitacora: number;
    ct_idIncidencia: string;
    cf_fecha: string ;
    ch_hora:string ;
    ct_EstadoActual:string;
    ct_EstadoNuevo:string;
    ct_idUsuario: string;

}

export interface BitacoraIncidencia{
    cn_idBitacora: number;
    ct_idIncidencia: string;
    cf_fecha: string ;
    ch_hora:string ;
    idRiesgo: number;
    idAfectacion: number;
    idCategoria: number;
    ct_idUsuario: string;

}