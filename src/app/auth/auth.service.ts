import { Injectable, Inject } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';
import 'rxjs/add/operator/take';

import { CLIENT_ID, DOMAIN, CALLBACK, LOGOUT } from './auth-constants';

const ID_TOKEN = 'id_token';
const ACCESS_TOKEN = 'access_token';
const EXPIRES_AT = 'expires_at';

const RETURN_URL = 'return_url';
const USER_PROFILE = 'user_profile';

@Injectable()
export class AuthService {
  lock: any;
  returnUrl: string;

  constructor(
    private router: Router,
    @Inject(CLIENT_ID) private client: string,
    @Inject(DOMAIN) private domain: string,
    @Inject(CALLBACK) private callback: string) {

    this.lock = new Auth0Lock(client, domain, { auth: { redirectUrl: callback, responseType: 'token'}, closable: false });
    this.lock.on('hide', this.onCancel);
    this.handleRedirectWithHash();
  }

  public login(returnUrl: string, isLogout = false) {
    console.log(`Logging in. Will redirect to ${returnUrl}.`);
    this.setReturnUrl(returnUrl);
    let opts: Auth0LockShowOptions = isLogout ? { flashMessage: { type: 'success', text: 'Logged out' } } : {};
    this.lock.show(opts);
  };

  public logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(ID_TOKEN);
    localStorage.removeItem(EXPIRES_AT);
    localStorage.removeItem(USER_PROFILE);
    this.router.navigate([LOGOUT]);
  };

  // See https://github.com/auth0/lock/pull/790#issuecomment-274267707
  // and https://github.com/angular/angular/issues/14976
  private handleRedirectWithHash() {
    this.router.events
      .filter(event => event instanceof NavigationStart)
      .filter((event: NavigationStart) => (/access_token|id_token|error/).test(event.url))
      .subscribe((event: NavigationStart) => {
        console.log('Resuming authentication after redirect.');
        this.lock.resumeAuth(window.location.hash, (error, authResult) => {
          if (error) {
            this.onFailure(error);
          }
          this.onSuccess(authResult);
        });
      });
  }

  public authenticated(): boolean {
    const authenticated = tokenNotExpired(ID_TOKEN);
    if (!authenticated) {
      this.clear();
    }
    return authenticated;
  };

  public profile(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.authenticated()) {
        reject('Not authenticated');
      }
      let storedProfile = localStorage.getItem(USER_PROFILE);
      if (storedProfile) {
        resolve(JSON.parse(storedProfile));
      }
      this.lock.getProfile(this.getToken(), (error, profile) => {
        if (error) {
          reject(error);
        } else {
          localStorage.setItem(USER_PROFILE, JSON.stringify(profile));
          resolve(profile);
        }
      });
    });
  }

  private onSuccess(authResult) {
    console.log('Successfully authenticated.');
    this.setSession(authResult);
    this.redirect();
  }

  private onFailure(error) {
    console.log('Failed to authenticate.');
    this.clear();
  }

  private onCancel(error) {
    console.log('Authentication cancelled.');
    this.clear();
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem(ID_TOKEN, authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  private getToken() {
    return localStorage.getItem(ID_TOKEN);
  }

  private setReturnUrl(url) {
    localStorage.setItem(RETURN_URL, url);
  }

  private redirect() {
    const url = localStorage.getItem(RETURN_URL);
    console.log(`Redirecting to ${url}`);
    localStorage.removeItem(RETURN_URL);
    this.router.navigate([url ? url : '/']);
  }

  private clear() {
    localStorage.removeItem(ID_TOKEN);
    localStorage.removeItem(USER_PROFILE);
  }

}
