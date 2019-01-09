import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContactsDetailComponent} from '../contacts/contacts-detail/contacts-detail.component';
import {UsersComponent} from '../users/users/users.component';

const routes: Routes = [
  {path: 'contacts-detail/:email', component: ContactsDetailComponent},
  {path: 'users/:name', component: UsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
