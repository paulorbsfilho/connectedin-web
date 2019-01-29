import {Component, OnInit} from '@angular/core';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {JwtResponse} from './response/jwt-response';
import * as JWT from 'jwt-decode';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {ContactsService} from './contacts/contacts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  jwt: string;
  jwtResponse: JwtResponse;

  successTextAlert: string;
  errorTextAlert: string;

  loginForm: FormGroup;
  registerForm: FormGroup;

  justification: string;
  active: boolean;

  constructor(private route: Router,
              private spinner: Ng4LoadingSpinnerService,
              private authService: AuthService,
              public ngxSmartModalService: NgxSmartModalService,
              private contactsService: ContactsService) {
  }

  ngOnInit(): void {
    this.jwt = window.localStorage.getItem('jwt');
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    if (this.jwt) {
      this.jwtResponse = JWT(this.jwt);
      this.redirectToHome();
      this.isActivated();
    }
  }

  redirectToHome() {
    // noinspection JSIgnoredPromiseFromCall
    this.route.navigateByUrl('');
  }

  goHome() {
    if (this.jwt) {
      this.redirectToHome();
    }
  }

  signIn(loginCredentials) {
    this.spinner.show();
    this.authService.doLogin(loginCredentials).subscribe(
      jwt => {
        window.localStorage.setItem('jwt', jwt);
        this.jwt = jwt;
        this.jwtResponse = JWT(this.jwt);
        window.localStorage.setItem('emailLogged', this.jwtResponse.sub);
        this.goHome();
        this.spinner.hide();
      },
      error => {
        this.errorTextAlert = error;
        this.spinner.hide();
      }
    );
  }

  signOut() {
    window.localStorage.removeItem('jwt');
    window.localStorage.removeItem('emailLogged');
    this.jwt = '';
  }

  register(registerCredentials) {
    this.spinner.show();
    this.authService.doRegister(registerCredentials).subscribe(
      response => {
        this.successTextAlert = 'Usuário criado, entre utilizando suas credenciais.';
        this.spinner.hide();
      },
      error => {
        this.errorTextAlert = error;
        this.spinner.hide();
      }
    );
  }

  disableAccount(justification) {
    this.spinner.show();
    this.contactsService.disableAccount(justification).subscribe(
      response => {
        this.isActivated();
        this.redirectToHome();
        this.successTextAlert = response;
        this.ngxSmartModalService.getModal('modalDisable').close();
        this.spinner.hide();
      },
      error => {
        this.errorTextAlert = error;
        this.spinner.hide();
      }
    );
  }

  activateAccount() {
    this.spinner.show();
    this.contactsService.activeAccount().subscribe(
      response => {
        this.isActivated();
        this.redirectToHome();
        this.ngxSmartModalService.getModal('modalActive').close();
        this.successTextAlert = response;
        this.spinner.hide();
      },
      error => {
        this.errorTextAlert = error;
        this.spinner.hide();
      }
    );
  }

  isActivated() {
    this.spinner.show();
    this.contactsService.isActivated().subscribe(
      response => {
        this.active = response;
        this.redirectToHome();
        if (!this.active) {
          this.openModalActive();
        }
        this.spinner.hide();
      },
      error => {
        this.errorTextAlert = error;
        this.spinner.hide();
      }
    );
  }

  openModalDisable() {
    this.ngxSmartModalService.getModal('modalDisable').open();
  }

  openModalActive() {
    this.ngxSmartModalService.getModal('modalActive').open();
  }

  closeSuccessTextAlert() {
    this.successTextAlert = '';
  }


  closeErrorTextAlert() {
    this.errorTextAlert = '';
  }

}
