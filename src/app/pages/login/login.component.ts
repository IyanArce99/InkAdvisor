import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private ngZone: NgZone, private router: Router) { }

  ngOnInit() {
    this.afAuth.signOut();
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.ngZone.run(()=> {
          this.router.navigate(['/tabs/tab1']);
        });
      }else {
        this.crearCongmail();
      }
    });
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

  // Para crear usuario
  crear() {
    this.afAuth.createUserWithEmailAndPassword("alejokope@gmail.com", "311387alejo").then(() => {
      this.router.navigate(['/tabs/tab1']);
    }).catch(response => {
      console.log("Error: ", response.message)
    });
  }
  

}
