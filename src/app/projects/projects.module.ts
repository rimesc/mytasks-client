import { NgModule } from '@angular/core';

// feature modules
import { ProjectsRoutingModule } from './projects-routing.module';
import { SharedModule } from '../shared/shared.module';

// components
import { DeleteProjectModalComponent } from './delete-project-modal.component';
import { EditProjectModalComponent } from './edit-project-modal.component';
import { NewProjectModalComponent } from './new-project-modal.component';
import { NewTaskButtonComponent } from './new-task-button.component';
import { NewTaskModalComponent } from './new-task-modal.component';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectFormComponent } from './project-form.component';
import { ProjectHeaderComponent } from './project-header.component';
import { ProjectListComponent } from './project-list.component';
import { ProjectTasksComponent } from './project-tasks.component';
import { ProjectToolbarComponent } from './project-toolbar.component';
import { TaskItemComponent } from './task-item.component';

@NgModule({
  imports: [
    // feature modules
    SharedModule,
    ProjectsRoutingModule
  ],
  declarations: [
    // components
    DeleteProjectModalComponent,
    EditProjectModalComponent,
    NewProjectModalComponent,
    NewTaskButtonComponent,
    NewTaskModalComponent,
    ProjectComponent,
    ProjectDetailComponent,
    ProjectFormComponent,
    ProjectHeaderComponent,
    ProjectListComponent,
    ProjectToolbarComponent,
    ProjectTasksComponent,
    TaskItemComponent
  ],
  entryComponents: [
    // modal dialogs
    DeleteProjectModalComponent,
    EditProjectModalComponent,
    NewProjectModalComponent,
    NewTaskModalComponent
  ]
})
export class ProjectsModule { }
