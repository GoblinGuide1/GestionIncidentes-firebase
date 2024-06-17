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

export interface Asignacion{
    cn_idAsigancion: number;
    cn_idIncidencia: number;
    cn_idRiesgo: number;
    cn_idPrioridad: number;
    cn_idUsuarioTce: number;
    cn_idCategoria: number

}