import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ContactsRoutingModule
  ],
  declarations: [ContactsDetailComponent]
})
export class ContactsModule { }
