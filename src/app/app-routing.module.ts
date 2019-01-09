import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home/home.component';
import {InvitationsComponent} from './invitations/invitations/invitations.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'invitations', component: InvitationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
