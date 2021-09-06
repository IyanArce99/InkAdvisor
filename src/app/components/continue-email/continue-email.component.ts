import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-continue-email',
  templateUrl: './continue-email.component.html',
  styleUrls: ['./continue-email.component.scss'],
})
export class ContinueEmailComponent implements OnInit {
  isDisabled: boolean;
  showLoader: boolean;
  mode: string;

  // texts
  title: string;
  link: string;
  changeModeInformation: string;

  showPassword;
  passwordToggleIcon = 'eye';
  constructor() { }

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

}
