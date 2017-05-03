import { NgModule }                       from '@angular/core';
import { RouterModule, Routes }           from '@angular/router';

import { RegistryComponent }              from './components/registry/registry.component';
import { UsersComponent }                 from './components/users/users.component';
import { GroupsComponent }                from './components/groups/groups.component';
import { GroupPageComponent }             from './components/group-page/group-page.component';
import { CreateGroupComponent }           from './components/create-group/create-group.component';
import { MeetingsComponent }              from './components/meetings/meetings.component';
import { SearchComponent }                from './components/search/search.component';
import { HomeComponent }                  from './components/home/home.component';
import { MessagesComponent }              from './components/messages/messages.component';
import { NotificationsComponent }         from './components/notifications/notifications.component';
import { MyFriendsComponent }             from './components/my-friends/my-friends.component';
import { MyGroupsComponent }              from './components/my-groups/my-groups.component';
import { ProfileComponent }               from './components/profile/profile.component';
import { MyProfileComponent }             from './components/my-profile/my-profile.component';
import { TemplateComponent }              from './components/template/main.component';
import { EditProfileComponent }           from './components/edit-profile/edit-profile.component';
import { AuthGuard }                      from './_guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'template', canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'registry',  component: RegistryComponent },
  { path: 'template', component: TemplateComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'group-page/:id', component: GroupPageComponent },
      { path: 'create-group', component: CreateGroupComponent },
      { path: 'meetings', component: MeetingsComponent },
      { path: 'search', component: SearchComponent },
      { path: 'home', component: HomeComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'my-friends', component: MyFriendsComponent },
      { path: 'my-groups', component: MyGroupsComponent },
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
