import { Injectable, Inject } from '@angular/core';
import {Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';

import { CLIENT_ID, DOMAIN, CALLBACK } from './auth-constants';

const ID_TOKEN = 'id_token';
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

    this.lock = new Auth0Lock(client, domain, { auth: { redirectUrl: callback, responseType: 'token'}});
    this.lock.on('authenticated', result => this.onSuccess(result));
    this.lock.on('authorization_error', this.onFailure);
    this.lock.on('unrecoverable_error', this.onFailure);
    this.lock.on('hide', this.onCancel);
  }

  public login(returnUrl: string) {
    console.log('Will redirect to ' + returnUrl);
    this.setReturnUrl(returnUrl);
    this.lock.show();
  };

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  };

  public authenticated(): boolean {
    const authenticated = tokenNotExpired();
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
      let profile = localStorage.getItem(USER_PROFILE);
      if (profile) {
        resolve(JSON.parse(profile));
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
    this.setToken(authResult.idToken);
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

  private setToken(token) {
    localStorage.setItem(ID_TOKEN, token);
  }

  private getToken() {
    return localStorage.getItem(ID_TOKEN);
  }

  private setReturnUrl(url) {
    localStorage.setItem(RETURN_URL, url);
  }

  private redirect() {
    const url = localStorage.getItem(RETURN_URL);
    localStorage.removeItem(RETURN_URL);
    this.router.navigate([url ? url : '/']);
  }

  private clear() {
    localStorage.removeItem(ID_TOKEN);
    localStorage.removeItem(USER_PROFILE);
  }

}