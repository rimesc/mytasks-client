import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { environment } from '../../environments/environment';

import { CLIENT_ID, DOMAIN, CALLBACK } from './auth-constants';

@NgModule({
  providers: [
    AuthService,
    AuthGuard,
    { provide: CLIENT_ID, useValue: environment.authClient },
    { provide: DOMAIN, useValue: environment.authDomain },
    { provide: CALLBACK, useValue: environment.authCallback }
  ]
})
export class AuthModule { }
