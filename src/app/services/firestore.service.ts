import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }
  addProduct(product: any) : void {
    this.firestore.collection('productos').add(product).then(_elem => {
      console.log("HOLIS");
    }).catch(err => {
      console.log(err);
    });
  }
}
