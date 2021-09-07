import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ContinueEmailComponent } from 'src/app/components/continue-email/continue-email.component';
import * as firebase from 'firebase/app';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  checks: any = {
    usuario: true,
    tatuador: false,
    estudio: false
  }

  constructor(private afAuth: AngularFireAuth, private ngZone: NgZone, private router: Router, private modalController: ModalController, private firestoreService: FirestoreService) { }

  ngOnInit() {
    // this.afAuth.signOut();
    /*this.afAuth.user.subscribe(user => {
      if (user) {
        this.ngZone.run(()=> {
          this.router.navigate(['/tabs/tab1']);
        });
      }else {
        this.crearCongmail();
      }
    });*/
  }

  getTypeUser(): string {
    if (this.checks.usuario){
      return 'usuario';
    }else if (this.checks.tatuador){
      return 'tatuador';
    }else {
      return 'estudio';
    }
  }
  selectedTypeUser(type: string): void {
    setTimeout(() => {
      if (type === 'usuario') {
        this.checks.tatuador = false;
        this.checks.estudio = false;
        this.checks.usuario = true;
      }else if (type === 'tatuador') {
        this.checks.usuario = false;
        this.checks.estudio = false;
        this.checks.tatuador = true;
      }else {
        this.checks.tatuador = false;
        this.checks.usuario = false;
        this.checks.estudio = true;
      }
    })
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ContinueEmailComponent,
      cssClass: 'my-custom-class',
      mode: 'ios',
      swipeToClose: true,
      componentProps: {typeUser: this.getTypeUser()}
    });
    return await modal.present();
  }
  crearCongmail(){
   /* const provider = new auth.GoogleAuthProvider();
    return this.AuthLogin(provider)
      .then(value => {
     console.log('Sucess', value),
     this.router.navigateByUrl('/profile');
   })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });*/
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
        console.log('You have been successfully logged in!')
    }).catch((error) => {
        console.log(error)
    })
  }
  login (typeLogin: string) : void {
    console.log("Login");
    if (typeLogin === 'email'){
      this.presentModal();
    }
  }

  loginWithGoogle() {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider).then(e => {
      console.log(e)
      if (e.user?.email && e.user?.uid){
        this.firestoreService.addElementToCollection({email: e.user.email, typeUser: this.getTypeUser()}, 'users', e.user.uid).then(_snap => {
          console.log("Add element correctly!");
            let user = {
              email: e.user.email,
              typeUser: this.getTypeUser()
            };

            localStorage.setItem('userData', JSON.stringify(user));
        }).catch(err => {
          console.error('Error: ', err);
        });
      }
    });
  }

  loginWithFacebook() {
    const provider = new firebase.default.auth.FacebookAuthProvider();
    this.afAuth.signInWithPopup(provider).then(e => {
      console.log(e)
      if (e.user?.email && e.user?.uid){
        this.firestoreService.addElementToCollection({email: e.user.email, typeUser: this.getTypeUser()}, 'users', e.user.uid).then(_snap => {
          console.log("Add element correctly!");
            let user = {
              email: e.user.email,
              typeUser: this.getTypeUser()
            };

            localStorage.setItem('userData', JSON.stringify(user));
        }).catch(err => {
          console.error('Error: ', err);
        });
      }
    });
  }

  // Para crear usuario
  crear() {
    this.afAuth.createUserWithEmailAndPassword("alejokope@gmail.com", "311387alejo").then(() => {
      this.router.navigate(['/tabs/tab1']);
    }).catch(response => {
      console.log("Error: ", response.message)
    });
  }
  

}
