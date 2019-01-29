import {Component, OnInit} from '@angular/core';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {JwtResponse} from './response/jwt-response';
import * as JWT from 'jwt-decode';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';

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

  constructor(private route: Router,
              private spinner: Ng4LoadingSpinnerService,
              private authService: AuthService) {
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

  closeSuccessTextAlert() {
    this.successTextAlert = '';
  }


  closeErrorTextAlert() {
    this.errorTextAlert = '';
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

}
