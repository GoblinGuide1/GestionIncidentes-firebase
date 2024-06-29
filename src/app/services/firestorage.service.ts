import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(public FireStorage:AngularFireStorage) { }
// metodo para cargar la imagen 
  uploadImage(file: any, path: string, nombre: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const filepath = `${path}/${nombre}`;
      const ref = this.FireStorage.ref(filepath);
      const task = ref.put(file);

      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(
            res => resolve(res),
            err => reject(err)
          );
        })
      ).subscribe();
    });
  }
}
