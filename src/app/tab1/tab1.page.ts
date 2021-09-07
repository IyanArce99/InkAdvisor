import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private firestoreService: FirestoreService, private afAuth: AngularFireAuth, private ngZone: NgZone, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(e => {
      this.afAuth.user.subscribe(user => {
        let userData = JSON.parse(localStorage.getItem('userData'));
        if (user && userData) {
          this.ngZone.run(()=> {
              console.log(user)
          });
        }else {
          this.router.navigate(['/login']);
        }
     });
    });
  }

  logout(): void {
    this.afAuth.signOut();

    localStorage.setItem('userData', null);
  }
  
}
