import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistryComponent }   from './components/registry/registry.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent }          from './components/profile/profile.component';
import { TemplateComponent }          from './components/template/main.component';
import { EditProfileComponent }          from './components/edit-profile/edit-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'registry', pathMatch: 'full' },
  { path: 'registry',  component: RegistryComponent },
  { path: 'template', component: TemplateComponent, children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'edit-profile/:id', component: EditProfileComponent },
    ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
