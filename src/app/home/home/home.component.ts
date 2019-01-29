import {Component, OnInit} from '@angular/core';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {ContactsService} from '../../contacts/contacts.service';
import {TimelineService} from '../../timeline/timeline.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {UsersService} from '../../users/users.service';
import {InvitationResponse} from '../../response/invitation-response';
import {InvitationsService} from '../../invitations/invitations.service';
import {JwtResponse} from '../../response/jwt-response';
import * as JWT from 'jwt-decode';
import {TimelineResponse} from '../../response/timeline-response';
import {ContactsResponse} from '../../response/contacts-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jwt: string;
  jwtResponse: JwtResponse;

  emailLogged: string;

  successTextAlert: string;
  errorTextAlert: string;

  contactsResponse: ContactsResponse;
  timelineResponse: TimelineResponse;
  invitationsReceived: InvitationResponse[];
  invitationsSent: InvitationResponse[];

  postForm: FormGroup;
  passwordUpdateForm: FormGroup;
  postDeleteForm: FormGroup;

  name: string;
  invitationId: string;
  p: number;
  pContact: number;

  constructor(private spinner: Ng4LoadingSpinnerService,
              private contactsService: ContactsService,
              private timelineService: TimelineService,
              public ngxSmartModalService: NgxSmartModalService,
              private userService: UsersService,
              private invitationsService: InvitationsService) {
  }

  ngOnInit() {
    this.emailLogged = window.localStorage.getItem('emailLogged');
    this.jwt = window.localStorage.getItem('jwt');
    if (this.jwt) {
      this.jwtResponse = JWT(this.jwt);
    }
    this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required)
    });
    this.passwordUpdateForm = new FormGroup({
      old_password: new FormControl('', Validators.required),
      new_password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required)
    });
    this.postDeleteForm = new FormGroup({
      id: new FormControl('', Validators.required)
    });
    this.findAllContacts();
    this.findAllPosts();
    this.findAllInvitationsReceived();
    this.findAllInvitationsSent();
    this.p = 1;
    this.pContact = 1;
  }

  pageChanged(event) {
    this.p = event;
  }

  pageContactChanged(event) {
    this.pContact = event;
  }

  findAllContacts() {
    this.spinner.show();
    this.contactsService.findAll().subscribe(
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

  findAllPosts() {
    this.spinner.show();
    this.timelineService.findAllPosts().subscribe(
      timelineResponse => {
        this.timelineResponse = timelineResponse;
        this.spinner.hide();
      },
      error => {
        this.errorTextAlert = error;
        this.spinner.hide();
      }
    );
  }

  findAllInvitationsReceived() {
    this.spinner.show();
    this.invitationsService.findAllReceived().subscribe(
      response => {
        this.invitationsReceived = response;
        this.spinner.hide();
      },
      error => {
        this.errorTextAlert = error;
        this.spinner.hide();
      }
    );
  }

  findAllInvitationsSent() {
    this.spinner.show();
    this.invitationsService.findAllSent().subscribe(
      response => {
        this.invitationsSent = response;
        this.spinner.hide();
      },
      error => {
        this.errorTextAlert = error;
        this.spinner.hide();
      }
    );
  }

  newPost(post) {
    this.spinner.show();
    this.timelineService.newPost(post).subscribe(
      response => {
        this.findAllPosts();
        this.successTextAlert = 'Postagem criada';
        this.spinner.hide();
      },
      error => {
        this.errorTextAlert = error;
        this.spinner.hide();
      }
    );
  }

  passwordUpdate(passwordUpdate) {
    this.spinner.show();
    this.contactsService.passwordUpdate(
      {
        old_password: passwordUpdate.old_password,
        new_password: passwordUpdate.new_password
      }).subscribe(
      response => {
        this.successTextAlert = response;
        this.spinner.hide();
      },
      error => {
        this.errorTextAlert = error;
        this.spinner.hide();
      }
    );
  }

  deletePost(post) {
    this.spinner.show();
    this.userService.deletePost(post.id).subscribe(
      response => {
        this.successTextAlert = response;
        this.spinner.hide();
      },
      error => {
        this.errorTextAlert = error;
        this.spinner.hide();
      }
    );
  }

  openModel() {
    this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required)
    });
    this.ngxSmartModalService.getModal('myModal').open();
  }

  openModelPasswordUpdate() {
    this.passwordUpdateForm = new FormGroup({
      old_password: new FormControl('', Validators.required),
      new_password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required)
    });
    this.ngxSmartModalService.getModal('modalPasswordUpdate').open();
  }

  openModelPostDelete(id) {
    this.postDeleteForm = new FormGroup({
      id: new FormControl(id, Validators.required)
    });
    this.ngxSmartModalService.getModal('modalPostDelete').open();
  }

  openInvitationModal(id) {
    this.invitationId = id;
    this.ngxSmartModalService.getModal('modalInvitation').open();
  }

  changeStatus(id, status) {
    this.spinner.show();
    this.invitationsService.changeStatus(id, status).subscribe(
      response => {
        this.findAllInvitationsReceived();
        this.findAllContacts();
        this.successTextAlert = status === 'accepted' ? 'Convite aceito' : 'Convite rejeitado';
        this.spinner.hide();
      },
      error => {
        this.errorTextAlert = error;
        this.spinner.hide();
      }
    );
  }

  accepted(id, status) {
    this.changeStatus(id, status);
  }

  rejected(id, status) {
    this.changeStatus(id, status);
  }

  closeSuccessTextAlert() {
    this.successTextAlert = '';
  }

  closeErrorTextAlert() {
    this.errorTextAlert = '';
  }

}
