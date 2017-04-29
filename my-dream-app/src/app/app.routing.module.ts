import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent }   from './components/profile/profile.component';
import { RegistryComponent }   from './components/registry/registry.component';
import { UsersComponent }      from './components/users/users.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component'

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users',  component: UsersComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'edit-profile/:id', component: EditProfileComponent },
  { path: 'registry', component: RegistryComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
