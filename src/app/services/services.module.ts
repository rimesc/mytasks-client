import { NgModule } from '@angular/core';

import { provideAuth } from 'angular2-jwt';

import { ProjectService } from './project.service';
import { TaskService } from './task.service';
import { environment } from '../../environments/environment';

import { API_BASE } from './service-constants';

@NgModule({
  providers: [
    provideAuth({ noJwtError: true }),
    ProjectService,
    TaskService,
    { provide: API_BASE, useValue: environment.apiBase }
  ]
})
export class ServicesModule { }
