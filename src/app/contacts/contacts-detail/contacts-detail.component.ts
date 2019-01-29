import {Component, OnInit} from '@angular/core';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {ActivatedRoute} from '@angular/router';
import {ContactsService} from '../contacts.service';
import {ContactResponse} from '../../response/contact-response';

@Component({
  selector: 'app-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

  emailLogged: string;

  email: string;

  successTextAlert: string;
  errorTextAlert: string;

  contactResponse: ContactResponse;

  constructor(private route: ActivatedRoute,
              private spinner: Ng4LoadingSpinnerService,
              private contactsService: ContactsService) {
  }

  ngOnInit() {
    this.emailLogged = window.localStorage.getItem('emailLogged');
    this.route.params.subscribe(params => {
      this.email = params['email'];
    });
    if (this.email) {
      this.contactDetail(this.email);
    }
  }

  contactDetail(email) {
    this.spinner.show();
    this.contactsService.contactDetail(email).subscribe(
      response => {
        this.contactResponse = response;
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

  undoFriendship(id, email) {
    this.spinner.show();
    this.contactsService.undoFriendship(id).subscribe(
      response => {
        this.contactDetail(email);
        this.successTextAlert = 'Amizade desfeita';
        this.spinner.hide();
      },
      error => {
        this.errorTextAlert = error;
        this.spinner.hide();
      }
    );
  }

  blockContact(id, email) {
    this.spinner.show();
    this.contactsService.blockContact(id).subscribe(
      response => {
        this.contactDetail(email);
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
