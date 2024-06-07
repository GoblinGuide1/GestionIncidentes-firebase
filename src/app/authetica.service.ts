import { Injectable } from '@angular/core';
import  firebase  from "firebase/compat/app";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { from,Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Counter {
  lastIncidenceId: number;
  lastdiagnosceId: number;
}
@Injectable({
  providedIn: 'root'
})
export class AutheticaService {

  public currentUserId: string ='' ; // Propiedad para almacenar el ID del usuario
  private currentUserRole: string | null = null;
  public pressid: string ='' ; // Propiedad para almacenar el ID del usuario
  
  constructor(private firestore: AngularFirestore, private router: Router,public database:AngularFirestore ) { }


  login(email: string, password: string): Observable<any> {
    return from(this.firestore.collection('Usuarios', ref => ref.where('ct_correo', '==', email).where('cn_cedula', '==', password)).get())
      .pipe(
        map(snapshot => {
          if (!snapshot.empty) {
            const userDoc = snapshot.docs[0];
            const userData = userDoc.data();
            this.currentUserId = userDoc.id;
            this.currentUserRole = (userData as any).cn_idRol;
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
      return this.currentUserId;
    }
    getUserRole(userId: string): Observable<string | null> {
      return this.firestore.doc(`Usuarios/${userId}`).valueChanges().pipe(
        map(user => user ? (user as any).cn_idRol : null)
      );
    }

    getUserName(userId: string): Observable<string | null> {
      return this.firestore.doc(`Usuarios/${userId}`).valueChanges().pipe(
        map(user => user ? (user as any).ct_nombreUsuario : null)
      );
    }
    getCurrentUserRole(): string | null {
      return this.currentUserRole;
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
    const newIncidenceCode = `Cod-${newIncidenceId.toString().padStart(6, '0')}`;

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

    // Actualizar el contador
    transaction.update(counterDocRef.ref, { lastdiagnosceId: newgdiagnosceId });

    return newDiagnosCode;
  }));
}

// funcion generica para obtener todos los datos de una biblioteca(tabal)
getCollectionChanges <tipo>(enlace: string){
const ref = this.firestore.collection  <tipo>(enlace);
return ref.valueChanges();//evalua todos los cambio y devuelve un opservable
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


  }



