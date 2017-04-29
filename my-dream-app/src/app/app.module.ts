import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { UsersComponent } from './components/users/users.component'
import { ProfileComponent }          from './components/profile/profile.component';
import { EditProfileComponent }          from './components/edit-profile/edit-profile.component';
import { PanelUserComponent }          from './components/panel-user/panel-user.component';
import { FriendsOnlineComponent }          from './components/friends/friends-online.component';
import { RegistryComponent }          from './components/registry/registry.component';
import { UserService }          from './services/user.service';
import { AppRoutingModule }     from './app.routing.module';

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
    UsersComponent,
    PanelUserComponent,
    FriendsOnlineComponent,
    RegistryComponent,
    ProfileComponent,
    EditProfileComponent
  ],
  providers: [ 
    UserService,
     ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
