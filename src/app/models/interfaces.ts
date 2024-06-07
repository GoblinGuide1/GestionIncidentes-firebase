export interface Incidencias {

    titulo: string ;
    fecha: string ;
    hora:string ;
    idUsuario: string ;
    descripcion: string ;
    lugar: string;
    imagen: string;
    idIncidencia: string;
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