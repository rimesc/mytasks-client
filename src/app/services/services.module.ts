import { NgModule } from '@angular/core';

// services
import { ProjectService } from './project.service';
import { TaskService } from './task.service';

import { environment } from '../../environments/environment';
import { API_BASE } from './service-constants';

@NgModule({
  providers: [
    ProjectService,
    TaskService,
    { provide: API_BASE, useValue: environment.apiBase }
  ]
})
export class ServicesModule { }
