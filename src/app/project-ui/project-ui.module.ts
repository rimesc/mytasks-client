import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { MomentModule } from 'angular2-moment';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule }   from '../app-routing.module';

import { ProjectListComponent } from './project-list.component';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectHeaderComponent } from './project-header.component';
import { ProjectToolbarComponent } from './project-toolbar.component';
import { ProjectTasksComponent } from './project-tasks.component';
import { TaskItemComponent } from './task-item.component';
import { TaskListComponent } from './task-list.component';
import { NewProjectModalComponent } from './new-project-modal.component';
import { EditProjectModalComponent } from './edit-project-modal.component';
import { DeleteProjectModalComponent } from './delete-project-modal.component';
import { ProjectFormComponent } from './project-form.component';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectComponent,
    ProjectDetailComponent,
    ProjectHeaderComponent,
    ProjectToolbarComponent,
    ProjectTasksComponent,
    TaskItemComponent,
    TaskListComponent,
    NewProjectModalComponent,
    EditProjectModalComponent,
    DeleteProjectModalComponent,
    ProjectFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Angular2FontawesomeModule,
    MomentModule,
    SharedModule,
    AppRoutingModule
  ],
  entryComponents: [NewProjectModalComponent, EditProjectModalComponent, DeleteProjectModalComponent]
})
export class ProjectUiModule { }
