import { NgModule } from '@angular/core';

// external modules
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

// services
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';

import { environment } from '../../environments/environment';
import { CLIENT_ID, DOMAIN, CALLBACK } from './auth-constants';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({ tokenName: 'id_token', noJwtError: true }), http, options);
}

@NgModule({
  providers: [
    AuthService,
    AuthGuard,
    { provide: CLIENT_ID, useValue: environment.authClient },
    { provide: DOMAIN, useValue: environment.authDomain },
    { provide: CALLBACK, useValue: environment.authCallback },
    { provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http, RequestOptions] }
  ]
})
export class AuthModule { }
