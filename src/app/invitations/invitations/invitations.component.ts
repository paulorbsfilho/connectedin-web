import {Component, OnInit} from '@angular/core';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {InvitationsService} from '../invitations.service';
import {InvitationResponse} from '../../response/invitation-response';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {

  successTextAlert: string;
  errorTextAlert: string;

  invitationsResponse: InvitationResponse[];

  constructor(private spinner: Ng4LoadingSpinnerService,
              private invitationsService: InvitationsService) {
  }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.spinner.show();
    this.invitationsService.findAll().subscribe(
      response => {
        this.invitationsResponse = response;
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

  changeStatus(id, status) {
    this.spinner.show();
    this.invitationsService.changeStatus(id, status).subscribe(
      response => {
        this.findAll();
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

}
