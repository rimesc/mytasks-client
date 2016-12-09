import { Component } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: [ './nav-bar.component.css' ]
})
export class NavBarComponent {
  showAdminOptions = true;
  constructor(private auth: AuthService) { }
}
