import { NgModule }                       from '@angular/core';
import { BrowserModule }                  from '@angular/platform-browser';
import { FormsModule }                    from '@angular/forms';
import { HttpModule, Http }               from '@angular/http';

import { AppComponent }                   from './app.component';
import { TemplateComponent }              from './components/template/main.component';
import { UsersComponent }                 from './components/users/users.component';
import { GroupsComponent }                from './components/groups/groups.component';
import { CreateGroupComponent }           from './components/create-group/create-group.component';
import { MeetingsComponent }              from './components/meetings/meetings.component';
import { MeetingPageComponent }           from './components/meeting-page/meeting-page.component'
import { ProfileComponent }               from './components/profile/profile.component';
import { GroupPageComponent }             from './components/group-page/group-page.component';
import { SearchComponent }                from './components/search/search.component';
import { SearchFormComponent }            from './components/search/search-form/search-form.component';
import { SearchUsersComponent }           from './components/search/search-users/search-users.component';
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
import { imgUploadComponent }             from './components/imgupload/imgupload.component';

import { AlertComponent }                 from './_directives/alert.component';
import { AuthGuard }                      from './_guards/auth.guard';
import { AlertService }                   from './_services/alert.service';
import { AuthenticationService }          from './_services/authentication.service';
import { UserService }                    from './_services/user.service';
import { GroupService }                   from './_services/group.service';
import { MeetingService }                 from './_services/meeting.service';
import { UserSearchService }              from './_services/user-search.service';
import { AppConfig }                      from './app.config';
import { imgService }                     from './_services/img.service';
import { MessageService }                 from './_services/message.service';
import { FriendRequestService }           from './_services/friend-request.service';

// CUSTOM PIPES
import { SubString }                      from './_pipes/sub-string.pipe';
import { Length }                         from './_pipes/length.pipe';
import { numNewMsg }                      from './_pipes/num-new-msg.pipe';
import { ReversePipe }                    from './_pipes/reverse.pipe';



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
    GroupPageComponent,
    CreateGroupComponent,
    MeetingsComponent,
    MeetingPageComponent,
    SearchComponent,
    SearchFormComponent,
    SearchUsersComponent,
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
    AlertComponent,
    SubString,
    Length,
    numNewMsg,
    ReversePipe,
    imgUploadComponent
  ],
  providers: [
    UserService,
    GroupService,
    MeetingService,
    UserSearchService,
    AppConfig,
    AuthGuard,
    AuthenticationService,
    AlertService,
    imgService,
    MessageService,
    FriendRequestService
     ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
