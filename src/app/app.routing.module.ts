import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistryComponent }   from './components/registry/registry.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent }          from './components/profile/profile.component';
import { MyProfileComponent }          from './components/my-profile/my-profile.component';
import { TemplateComponent }          from './components/template/main.component';
import { EditProfileComponent }          from './components/edit-profile/edit-profile.component';
import { AuthGuard } from './_guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'template', canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'registry',  component: RegistryComponent },
  { path: 'template', component: TemplateComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'my-profile/:id', component: MyProfileComponent },
      { path: 'edit-profile/:id', component: EditProfileComponent },
    ]},

  { path: '**', redirectTo: 'registry' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
