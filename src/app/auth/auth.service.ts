import { Injectable, Inject } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';

import { CLIENT_ID, DOMAIN } from './auth-constants';

@Injectable()
export class AuthService {
  lock: any;

  constructor(@Inject(CLIENT_ID) client: string, @Inject(DOMAIN) domain: string) {
    this.lock = new Auth0Lock(client, domain, {});
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
    });
  }

  public login() {
    this.lock.show();
  };

  public authenticated() {
    return tokenNotExpired();
  };

  public logout() {
    localStorage.removeItem('id_token');
  };
}