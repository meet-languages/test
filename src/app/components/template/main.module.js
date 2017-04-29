/*import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, Http }    from '@angular/http';

import { TemplateComponent }  from './main.component';
import { UsersComponent } from '../../components/users/users.component'
import { ProfileComponent }          from '../../components/profile/profile.component';
import { EditProfileComponent }          from '../../components/edit-profile/edit-profile.component';
import { PanelUserComponent }          from '../../components/panel-user/panel-user.component';
import { FriendsOnlineComponent }          from '../../components/friends/friends-online.component';
import { RegistryComponent }          from '../../components/registry/registry.component';
import { UserService }          from '../../services/user.service';
import { AuthService }          from '../../services/auth.service';
import { TemplateRoutingModule }     from '../template/main.routing.module';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';

// @NgModule metadata's imports array, which contains the list of external modules that the app uses
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    TemplateRoutingModule
  ],
  declarations: [
    PanelUserComponent,
    FriendsOnlineComponent,
    EditProfileComponent
  ],
  providers: [
    UserService,
    AuthService,
    AuthHttp,
    AUTH_PROVIDERS,
    {
      provide: AuthConfig,
      
      useFactory: () => {
        return new AuthConfig();
      },
      deps: [Http]
    },
     ],
  bootstrap: [ TemplateComponent ]
})
export class TemplateModule { }
*/ 
//# sourceMappingURL=main.module.js.map