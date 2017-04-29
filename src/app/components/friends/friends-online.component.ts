import { Component, Input } from '@angular/core';
// @Input decorator tells Angular that this property
// is public and available for binding by a parent component.
// Without @Input, Angular refuses to bind to the property.
import { User } from '../../../User'

@Component({
  selector: 'friends-online',
  template: `

  <!-----------------------------------SIDENAV---------------------------------->

      <h3>Friends online</h3>
      <hr>
      <a href="profile.html">
        <img src="img/avatar.png" alt="avatar_meetlanguages" class="img-responsive4" id="avatar" title="" data-toggle="popover" data-content="Language I want to learn: English Language: Spanish" data-trigger="hover" data-original-title="Nombre Apellido">
      </a>
      <a href="profile.html">
        <img src="img/avatar.png" alt="avatar_meetlanguages" class="img-responsive4" id="avatar" title="" data-toggle="popover" data-content="Language I want to learn: English Language: Spanish" data-trigger="hover" data-original-title="Nombre Apellido">
      </a>
      <a href="profile.html">
        <img src="img/avatar.png" alt="avatar_meetlanguages" class="img-responsive4" id="avatar" title="" data-toggle="popover" data-content="Language I want to learn: English Language: Spanish" data-trigger="hover" data-original-title="Nombre Apellido">
      </a>
      <a href="profile.html">
        <img src="img/avatar.png" alt="avatar_meetlanguages" class="img-responsive4" id="avatar" title="" data-toggle="popover" data-content="Language I want to learn: English Language: Spanish" data-trigger="hover" data-original-title="Nombre Apellido">
      </a>
      <a href="profile.html">
        <img src="img/avatar.png" alt="avatar_meetlanguages" class="img-responsive4" id="avatar" title="" data-toggle="popover" data-content="Language I want to learn: English Language: Spanish" data-trigger="hover" data-original-title="Nombre Apellido">
      </a>
      <a href="profile.html">
        <img src="img/avatar.png" alt="avatar_meetlanguages" class="img-responsive4" id="avatar" title="" data-toggle="popover" data-content="Language I want to learn: English Language: Spanish" data-trigger="hover" data-original-title="Nombre Apellido">
      </a>

  `
})

export class FriendsOnlineComponent {
  user: User;
}
