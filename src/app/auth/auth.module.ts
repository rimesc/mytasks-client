import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

import { CLIENT_ID, DOMAIN } from './auth-constants';

@NgModule({
  providers: [
    AuthService,
    { provide: CLIENT_ID, useValue: environment.authClient },
    { provide: DOMAIN, useValue: environment.authDomain },
    ]
})
export class AuthModule { }
