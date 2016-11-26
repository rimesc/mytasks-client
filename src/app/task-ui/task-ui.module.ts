import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { MomentModule } from 'angular2-moment';

import { SharedModule } from '../shared/shared.module';

import { TaskComponent } from './task.component';
import { TaskListComponent } from './task-list.component';
import { TaskDetailComponent } from './task-detail.component';
import { TaskUiRoutingModule } from './task-ui-routing.module';

@NgModule({
  declarations: [
    TaskComponent,
    TaskListComponent,
    TaskDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    Angular2FontawesomeModule,
    MomentModule,
    SharedModule,
    TaskUiRoutingModule
  ]
})
export class TaskUiModule { }