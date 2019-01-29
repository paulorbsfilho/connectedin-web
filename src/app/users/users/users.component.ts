import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../users.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {ContactsService} from '../../contacts/contacts.service';
import {JwtResponse} from '../../response/jwt-response';
import * as JWT from 'jwt-decode';
import {ContactsResponse} from '../../response/contacts-response';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  name: string;

  successTextAlert: string;
  errorTextAlert: string;

  contactsResponse: ContactsResponse;

  jwt: string;
  jwtResponse: JwtResponse;

  p: number;

  constructor(private route: ActivatedRoute,
              private spinner: Ng4LoadingSpinnerService,
              private usersService: UsersService,
              private contactsService: ContactsService) {
  }

  ngOnInit() {
    this.jwt = window.localStorage.getItem('jwt');
    if (this.jwt) {
      this.jwtResponse = JWT(this.jwt);
    }
    this.route.params.subscribe(params => {
      this.name = params['name'];
    });
    if (this.name) {
      this.searchByName(this.name);
    }
    this.p = 1;
  }

  pageChanged(event) {
    this.p = event;
  }

  searchByName(name) {
    this.spinner.show();
    this.usersService.searchByName(name).subscribe(
      response => {
        this.contactsResponse = response;
        this.spinner.hide();
      },
      error => {
        this.errorTextAlert = error;
        this.spinner.hide();
      }
    );
  }

  invite(email) {
    this.spinner.show();
    this.contactsService.invite(email).subscribe(
      response => {
        this.successTextAlert = 'Convite enviado';
        this.spinner.hide();
      },
      error => {
        this.errorTextAlert = error;
        this.spinner.hide();
      }
    );
  }

  adminNew(email) {
    this.spinner.show();
    this.usersService.adminNew({email: email}).subscribe(
      response => {
        this.successTextAlert = 'Novo Super Usuário criado';
        this.spinner.hide();
      },
      error => {
        this.errorTextAlert = error;
        this.spinner.hide();
      }
    );
  }

  blockContact(id, name) {
    this.spinner.show();
    this.contactsService.blockContact(id).subscribe(
      response => {
        this.searchByName(name);
        this.successTextAlert = response;
        this.spinner.hide();
      },
      error => {
        this.errorTextAlert = error;
        this.spinner.hide();
      }
    );
  }

  closeSuccessTextAlert() {
    this.successTextAlert = '';
  }

  closeErrorTextAlert() {
    this.errorTextAlert = '';
  }

}
