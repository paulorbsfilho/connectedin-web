import {Component, OnInit} from '@angular/core';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {ContactResponse} from '../../response/contact-response';
import {ContactsService} from '../../contacts/contacts.service';
import {TimelineService} from '../../timeline/timeline.service';
import {PostResponse} from '../../response/post-response';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  successTextAlert: string;
  errorTextAlert: string;

  contactsResponse: ContactResponse[];
  timelineResponse: PostResponse[];

  postForm: FormGroup;
  passwordUpdateForm: FormGroup;

  name: string;

  constructor(private spinner: Ng4LoadingSpinnerService,
              private contactsService: ContactsService,
              private timelineService: TimelineService,
              public ngxSmartModalService: NgxSmartModalService) {
  }

  ngOnInit() {
    this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required)
    });
    this.passwordUpdateForm = new FormGroup({
      old_password: new FormControl('', Validators.required),
      new_password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required)
    });
    this.findAllContacts();
    this.findAllPosts();
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

  openModel() {
    this.ngxSmartModalService.getModal('myModal').open();
  }

  openModelPasswordUpdate() {
    this.ngxSmartModalService.getModal('modalPasswordUpdate').open();
  }

  closeSuccessTextAlert() {
    this.successTextAlert = '';
  }

  closeErrorTextAlert() {
    this.errorTextAlert = '';
  }

}
