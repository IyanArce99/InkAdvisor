import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentData, DocumentReference, DocumentSnapshot } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }
  addProduct(product: any, collection: string) : void {
    this.firestore.collection(collection).add(product).then(_elem => {
      console.log("Add ");
    }).catch(err => {
      console.log(err);
    });
  }

  addElementToCollection(element: any, collection: string, id: string) : Promise<void> {
    return this.firestore.collection(collection).doc(id).set(element);
  }

  getElementOfCollection(collection: string, id: string): Observable<any>{
    return this.firestore.collection(collection).doc(id).get();
  }
}
