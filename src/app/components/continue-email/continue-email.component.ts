import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-continue-email',
  templateUrl: './continue-email.component.html',
  styleUrls: ['./continue-email.component.scss'],
})
export class ContinueEmailComponent implements OnInit {

  @Input() typeUser: string;
  
  email: string = '';
  pass: string = '';

  isDisabled: boolean;
  showLoader: boolean;
  mode: string;

  // texts
  title: string;
  link: string;
  changeModeInformation: string;

  showPassword;
  passwordToggleIcon = 'eye';
  constructor(private firestoreService: FirestoreService, private afAuth: AngularFireAuth, private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.mode = 'register';

    this.title = 'Registrarse';
    this.link = 'Logearse';
    this.changeModeInformation = 'Ya tienes una cuenta?';
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;

    if (this.passwordToggleIcon === 'eye') {
      this.passwordToggleIcon = 'eye-off';
    }else {
      this.passwordToggleIcon = 'eye';
    }
  }

  changeMode(): void {
    this.showLoader = true;
    setTimeout(() => {
      if (this.mode === 'register'){
        this.mode = 'login';
  
        this.title = 'Logearse';
        this.link = 'Registrase';
        this.changeModeInformation = 'No tienes cuenta?';
      }else {
        this.mode = 'register';
  
        this.title = 'Registrase';
        this.link = 'Logearse';
        this.changeModeInformation = 'Ya tienes una cuenta?';
      }
      this.showLoader = false;
    }, 1500);
  }

  submitButton(): void {
    if (this.mode === 'register'){
      this.afAuth.createUserWithEmailAndPassword(this.email, this.pass).then((e) => {
        if (e.user?.email && e.user?.uid){
          this.firestoreService.addElementToCollection({email: e.user.email, typeUser: this.typeUser}, 'users', e.user.uid).then(_snap => {
            console.log("Add element correctly!");
            this.mode = 'login';
          }).catch(err => {
            console.error('Error: ', err);
          });
        }
      }).catch(response => {
        console.error("Error: ", response.message)
      });
    }else {
      this.afAuth.signInWithEmailAndPassword(this.email, this.pass).then(e => {
        if (e.user?.uid){
          this.firestoreService.getElementOfCollection('users', e.user.uid).subscribe(snapshot=>{
            let user = {
              email: snapshot.data().email,
              typeUser: snapshot.data().typeUser
            };

            localStorage.setItem('userData', JSON.stringify(user));

            this.router.navigate(['/tabs/tab1']);
            this.modalCtrl.dismiss();
          });
        }
      }).catch(err => {
        console.error('Error: ', err);
      });
    }
  }

}
