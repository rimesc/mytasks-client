import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'my-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: [ './nav-bar.component.css' ]
})
export class NavBarComponent {
  showAdminOptions = true;
  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.auth.login(this.router.routerState.snapshot.url);
  }
}
