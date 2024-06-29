import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Incidencias, Roles } from '../app/models/interfaces';

interface Counter {
  lastIncidenceId: number;
  lastdiagnosceId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AutheticaService {

  public currentUserId: string = ''; // Propiedad para almacenar el ID del usuario
  private currentUserRole: string = '';
  public pressid: string = ''; // Propiedad para almacenar el ID de de la incidencia
  public pressidRol: number = 0; // Propiedad para almacenar el ID del rol

  public count: number = 0;
  constructor(private firestore: AngularFirestore, private router: Router, public database: AngularFirestore) { }

  login(email: string, password: string): Observable<any> {
    return from(this.firestore.collection('Usuarios', ref => ref.where('ct_correo', '==', email).where('cn_cedula', '==', password)).get())
      .pipe(
        map(snapshot => {
          if (!snapshot.empty) {
            const userDoc = snapshot.docs[0];
            const userData = userDoc.data();
            this.currentUserId = userDoc.id;
            this.currentUserRole = (userData as any).cn_idRol;
            // Guardar en localStorage
            localStorage.setItem('currentUserId', this.currentUserId);
            localStorage.setItem('currentUserRole', this.currentUserRole);
            localStorage.setItem('userName', (userData as any).ct_nombreUsuario);
            return { success: true, data: userData };
          } else {
            return { success: false, message: 'Invalid credentials' };
          }
        })
      );
  }

  getAllUsers() {
    return this.firestore.collection('Usuarios').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      }))
    );
  }

  getCurrentUserId(): string {
    return ""+localStorage.getItem('currentUserId');
  }

  getUserRole(userId: string): Observable<string | null> {
    return this.firestore.doc(`Usuarios/${userId}`).valueChanges().pipe(
      map(user => user ? (user as any).cn_idRol : null)
    );
  }

  getUserName(userId: string | null): Observable<string | null> {
    return of(localStorage.getItem('userName'));
  }

  getCurrentUserRole(): string {
    return ""+localStorage.getItem('currentUserRole');
  }

//creacion del crud 

    createDoc(data:any, path:string,id:string){
      const collection = this.database.collection(path);
      return collection.doc(id).set(data);
    }
//optiene el documento de la base de datos
getDoc(path: string, id:string){
  const collection = this.database.collection(path);
  return collection.doc(id).valueChanges();//muestra los cambios en tiempo real
}
//metodo para eliminar un documento
deleteDoc(path: string, id:string){
  const collection = this.database.collection(path);
  return collection.doc(id).delete();
}
  
//actualiza un documento, si este no existe lo crea
  updateDoc(data: any, path: string, id:string){
  const collection = this.database.collection(path);
  return collection.doc(id).update(data);
}




generateIncidenceId(): Observable<string> {
  const counterDocRef = this.firestore.doc('counters/lastIncidenceId');

  return from(this.firestore.firestore.runTransaction(async transaction => {
    const counterDoc = await transaction.get(counterDocRef.ref);
    if (!counterDoc.exists) {
      throw new Error('Counter document does not exist!');
    }
    const counterData = counterDoc.data() as Counter;
    const lastIncidenceId = counterData.lastIncidenceId || 0;
    const newIncidenceId = lastIncidenceId + 1;
    const newIncidenceCode = `2024-${newIncidenceId.toString().padStart(6, '0')}`;

    // Actualizar el contador
    transaction.update(counterDocRef.ref, { lastIncidenceId: newIncidenceId });

    return newIncidenceCode;
  }));
}

  generateDiagnosId(): Observable<string> {
    const counterDocRef = this.firestore.doc('counters/lastdiagnosceId');
    return from(this.firestore.firestore.runTransaction(async transaction => {
      const counterDoc = await transaction.get(counterDocRef.ref);
      if (!counterDoc.exists) {
        throw new Error('Counter document does not exist!');
      }
      const counterData = counterDoc.data() as Counter;
      const lastdiagnosceId = counterData.lastdiagnosceId || 0;
      const newgdiagnosceId = lastdiagnosceId + 1;
      const newDiagnosCode = `diag-${newgdiagnosceId.toString().padStart(6, '0')}`;
      //actualizar contador
      transaction.update(counterDocRef.ref, { lastdiagnosceId: newgdiagnosceId });
      return newDiagnosCode;
    }));
  }

  generateAsig(): Observable<string> {
    const counterDocRef = this.firestore.doc('counters/lastAsigid');
    return from(this.firestore.firestore.runTransaction(async transaction => {
      const counterDoc = await transaction.get(counterDocRef.ref);
      if (!counterDoc.exists) {
        throw new Error('Counter document does not exist!');
      }
      const counterData = counterDoc.data() as Counter;
      const lastdiagnosceId = counterData.lastdiagnosceId || 0;
      const newgdiagnosceId = lastdiagnosceId + 1;
      const newDiagnosCode = `asig-${newgdiagnosceId.toString().padStart(6, '0')}`;
      //actualizar contador
      transaction.update(counterDocRef.ref, { lastdiagnosceId: newgdiagnosceId });
      return newDiagnosCode;
    }));
  }

  generateRolesId(): Observable<string> {
    const counterDocRef = this.firestore.doc('counters/lastRolesceId');
    return from(this.firestore.firestore.runTransaction(async transaction => {
      const counterDoc = await transaction.get(counterDocRef.ref);
      if (!counterDoc.exists) {
        throw new Error('Counter document does not exist!');
      }
      const counterData = counterDoc.data() as Counter;
      const lastdiagnosceId = counterData.lastdiagnosceId || 0;
      this.count = lastdiagnosceId;
      const newgdiagnosceId = lastdiagnosceId + 1;
      const newDiagnosCode = `${newgdiagnosceId.toString()}`;
      //actualizar contador
      transaction.update(counterDocRef.ref, { lastdiagnosceId: newgdiagnosceId });
      return newDiagnosCode;
    }));
  }

  // metodo para generar el id de las bitacoras
  generateBitacoraId(): Observable<string> {
    const counterDocRef = this.firestore.doc('counters/lastBitacora');
    return from(this.firestore.firestore.runTransaction(async transaction => {
      const counterDoc = await transaction.get(counterDocRef.ref);
      if (!counterDoc.exists) {
        throw new Error('Counter document does not exist!');
      }
      const counterData = counterDoc.data() as Counter;
      const lastdiagnosceId = counterData.lastdiagnosceId || 0;
      this.count = lastdiagnosceId;
      const newgdiagnosceId = lastdiagnosceId + 1;
      const newDiagnosCode = `${newgdiagnosceId.toString()}`;
      //actualizar contador
      transaction.update(counterDocRef.ref, { lastdiagnosceId: newgdiagnosceId });
      return newDiagnosCode;
    }));
  }

  generateBitacoraIncidenciaId(): Observable<string> {
    const counterDocRef = this.firestore.doc('counters/lastBitacoraIncidencia');
    return from(this.firestore.firestore.runTransaction(async transaction => {
      const counterDoc = await transaction.get(counterDocRef.ref);
      if (!counterDoc.exists) {
        throw new Error('Counter document does not exist!');
      }
      const counterData = counterDoc.data() as Counter;
      const lastdiagnosceId = counterData.lastdiagnosceId || 0;
      this.count = lastdiagnosceId;
      const newgdiagnosceId = lastdiagnosceId + 1;
      const newDiagnosCode = `${newgdiagnosceId.toString()}`;
      //actualizar contador
      transaction.update(counterDocRef.ref, { lastdiagnosceId: newgdiagnosceId });
      return newDiagnosCode;
    }));
  }
  getCollectionChanges<tipo>(enlace: string) {
    const ref = this.firestore.collection<tipo>(enlace);
    return ref.valueChanges(); // Evalua todos los cambios y devuelve un observable
  }

  getCollectionData<T>(enlace: string): Observable<T[]> {
    return this.firestore.collection<T>(enlace).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as T;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  asigRoles(userId: number): Observable<string[]> {
    return this.firestore.collection('t_usuariosRoles', ref => ref.where('cn_idUsuario', '==', userId)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        console.log( data.cn_idRol)
        return data.cn_idRol;
      })),
      map(roleIds => {
        const roles = roleIds.map(roleId => this.mapRoleIdToRoleName(roleId));
        return roles;
      })
    );
  }

  private mapRoleIdToRoleName(roleId: number): string {
    switch (roleId) {
      case 1: return 'Administrador';
      case 2: return 'Usuario';
      case 3: return 'Encargado';
      case 4: return 'Tecnico';
      case 5: return 'Supervisor';
      default: return 'Unknown Role';
    }
    
  }



  updateIncidencia(incidenciaId: string, newData: Partial<Incidencias>): Observable<void> {
    const collection = this.firestore.collection('t_Incidencias');
    return from(collection.doc(incidenciaId).update(newData));
  }

  updateRoles(idRoles: number, newData: Partial<Roles>): Observable<void> {
    const idRolesStr = idRoles.toString(); // Convertir el ID a cadena para Firestore
    const collection = this.firestore.collection('t_roles');
    return from(collection.doc(idRolesStr).update({ ...newData, idRoles }));
  }


  getUsersWithRole(roleId: number): Observable<any[]> {
    return this.firestore.collection('Usuarios', ref => ref.where('cn_idRol', '==', 4)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as { [key: string]: any }; // Aseguramos que data es un objeto
        const id = a.payload.doc.id;
        console.log({  ...data })
        return { id, ...data };
      }))
    );
  }

  getTecnicoAsignacionesCount(): Observable<any[]> {
    return this.firestore.collection('t_Asignacion').snapshotChanges().pipe(
      map(actions => {
        const contador: { [key: string]: number } = {};
        actions.forEach(a => {
          const data = a.payload.doc.data() as { cn_idUsuarioTce: string };
          const idTecnico = data.cn_idUsuarioTce;
          if (!contador[idTecnico]) {
            contador[idTecnico] = 0;
          }
          contador[idTecnico]++;
        });
        const carga = Object.keys(contador).map(idTecnico => ({
          idTecnico,
          count: contador[idTecnico]
        }));
        console.log("la carga es para"+carga)
        return carga;
      })
    );
  }

  deleteRole(idRoles: number): Observable<void> {
    const idRolesStr = idRoles.toString(); // Convertir el ID a cadena
    const collection = this.firestore.collection('t_roles');
    return from(collection.doc(idRolesStr).delete());
  }

  updateIncidenciaEstado(idIncidencia: string, estado: number): Observable<void> {
    const collection = this.firestore.collection('t_Incidencias');
    return from(collection.doc(idIncidencia).update({ idEstado: estado }));
  }
}