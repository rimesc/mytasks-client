import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { MomentModule } from 'angular2-moment';

import { ApiModule } from '../api/api.module';

import { MessagesComponent } from './messages.component';
import { EnumValuesPipe } from './enum-values.pipe';
import { ProjectService } from './project.service';
import { TaskService } from './task.service';

@NgModule({
  declarations: [
    MessagesComponent,
    EnumValuesPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    NgbModule,
    Angular2FontawesomeModule,
    MomentModule,
    ApiModule
  ],
  exports: [
    FormsModule,
    NgbModule,
    Angular2FontawesomeModule,
    MomentModule,
    ApiModule,
    MessagesComponent,
    EnumValuesPipe
  ],
  providers: [ProjectService, TaskService],
})
export class SharedModule { }
