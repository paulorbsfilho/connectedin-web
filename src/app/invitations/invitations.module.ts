import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitationsRoutingModule } from './invitations-routing.module';
import { InvitationsComponent } from './invitations/invitations.component';

@NgModule({
  imports: [
    CommonModule,
    InvitationsRoutingModule
  ],
  declarations: [InvitationsComponent]
})
export class InvitationsModule { }
