// components/registry.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'registry',
  templateUrl: `./registry.component.html`,
  providers: [AuthService]
})
export class RegistryComponent {
  constructor(private auth: AuthService) {}
  login() {
  }
  logout() {
  }
}