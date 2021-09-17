import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  publications: any[] = [];
  @ViewChild("search") public searchElementRef: ElementRef;
  private geoCoder;

  constructor(private firestoreService: FirestoreService, private afAuth: AngularFireAuth, private ngZone: NgZone, private router: Router, private activatedRoute: ActivatedRoute, private mapsApi: MapsAPILoader) {}

  ngOnInit(): void {
    this.mapsApi.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          const place: any = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          let locationInfo: any = this.getProvince(place.formatted_address);
          locationInfo.lat = place.geometry.location.lat();
          locationInfo.lng = place.geometry.location.lng();
          console.log(locationInfo)
        });
      });
    });
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

    // Busco las publicaciones.
    this.firestoreService.getAllPublications().subscribe(_snapshot => {
      _snapshot.forEach(_snap => {
        this.publications.push(_snap.data());
      });
    });
  }

  logout(): void {
    this.afAuth.signOut();

    localStorage.setItem('userData', null);
  }
  
  getProvince(addres: string) {
    let arrayAddres: string[] = addres.split(',');
    let lastElement: number = arrayAddres.length - 1;
    let provincia: string = arrayAddres[lastElement - 1];
    let pais: string = arrayAddres[lastElement];

    if (provincia){
        provincia = provincia.replace(/[\d.-]/g, '').trim();
    }

    if (pais){
        pais = pais.replace(/[\d.-]/g, '').trim();
    }
    
    return {
        pais, provincia
    };
}
}
