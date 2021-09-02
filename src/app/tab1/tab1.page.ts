import { Component } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private firestoreService: FirestoreService) {}

  test() {
    this.firestoreService.addProduct({name: 'nazi'});
  }
}
