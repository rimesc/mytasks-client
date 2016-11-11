import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { MomentModule } from 'angular2-moment';

import { SharedModule } from '../shared/shared.module';

import { ProjectListComponent } from './project-list.component';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectHeaderComponent } from './project-header.component';
import { ProjectToolbarComponent } from './project-toolbar.component';
import { ProjectTasksComponent } from './project-tasks.component';
import { TaskItemComponent } from './task-item.component';
import { NewProjectModalComponent } from './new-project-modal.component';
import { EditProjectModalComponent } from './edit-project-modal.component';
import { DeleteProjectModalComponent } from './delete-project-modal.component';
import { NewTaskModalComponent } from './new-task-modal.component';
import { ProjectFormComponent } from './project-form.component';
import { ProjectUiRoutingModule } from './project-ui-routing.module';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectComponent,
    ProjectDetailComponent,
    ProjectHeaderComponent,
    ProjectToolbarComponent,
    ProjectTasksComponent,
    TaskItemComponent,
    NewProjectModalComponent,
    EditProjectModalComponent,
    DeleteProjectModalComponent,
    NewTaskModalComponent,
    ProjectFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    Angular2FontawesomeModule,
    MomentModule,
    SharedModule,
    ProjectUiRoutingModule
  ],
  entryComponents: [NewProjectModalComponent, EditProjectModalComponent, DeleteProjectModalComponent, NewTaskModalComponent]
})
export class ProjectUiModule { }
