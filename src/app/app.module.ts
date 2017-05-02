import { NgModule }                       from '@angular/core';
import { BrowserModule }                  from '@angular/platform-browser';
import { FormsModule }                    from '@angular/forms';
import { HttpModule, Http }               from '@angular/http';

import { AppComponent }                   from './app.component';
import { TemplateComponent }              from './components/template/main.component';
import { UsersComponent }                 from './components/users/users.component';
import { GroupsComponent }                from './components/groups/groups.component';
import { MeetingsComponent }              from './components/meetings/meetings.component'
import { ProfileComponent }               from './components/profile/profile.component';
import { SearchComponent }                from './components/search/search.component';
import { HomeComponent }                  from './components/home/home.component';
import { MessagesComponent }              from './components/messages/messages.component';
import { NotificationsComponent }         from './components/notifications/notifications.component';
import { MyFriendsComponent }             from './components/my-friends/my-friends.component';
import { MyGroupsComponent }              from './components/my-groups/my-groups.component';
import { MyProfileComponent }             from './components/my-profile/my-profile.component';
import { EditProfileComponent }           from './components/edit-profile/edit-profile.component';
import { PanelUserComponent }             from './components/panel-user/panel-user.component';
import { FriendsOnlineComponent }         from './components/friends/friends-online.component';
import { UserSearchComponent }            from './components/user-search/user-search.component';
import { RegistryComponent }              from './components/registry/registry.component';
import { LoginComponent }                 from './components/registry/login.component';
// import { UserService }          from './services/user.service';
import { AppRoutingModule }               from './app.routing.module';

import { AlertComponent }                 from './_directives/alert.component';
import { AuthGuard }                      from './_guards/auth.guard';
import { AlertService }                   from './_services/alert.service';
import { AuthenticationService }          from './_services/authentication.service';
import { UserService }                    from './_services/user.service';
import { UserSearchService }              from './_services/user-search.service';
import { AppConfig }                      from './app.config';


// @NgModule metadata's imports array, which contains the list of external modules that the app uses
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    RegistryComponent,
    LoginComponent,
    TemplateComponent,
    UsersComponent,
    GroupsComponent,
    MeetingsComponent,
    SearchComponent,
    HomeComponent,
    MessagesComponent,
    NotificationsComponent,
    MyFriendsComponent,
    MyGroupsComponent,
    ProfileComponent,
    MyProfileComponent,
    PanelUserComponent,
    EditProfileComponent,
    FriendsOnlineComponent,
    UserSearchComponent,
    AlertComponent
  ],
  providers: [ 
    UserService,
    UserSearchService,
    AppConfig,
    AuthGuard,
    AuthenticationService,
    AlertService
     ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
