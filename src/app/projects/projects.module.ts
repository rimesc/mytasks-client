import { NgModule } from '@angular/core';

// feature modules
import { ProjectsRoutingModule } from './projects-routing.module';
import { SharedModule } from '../shared/shared.module';

// pages
import { ProjectRootComponent } from './pages/project-root.component';
import { ProjectOverviewComponent } from './pages/project-overview.component';
import { ProjectListComponent } from './pages/project-list.component';
import { ProjectTasksRootComponent } from './pages/project-tasks-root.component';
import { ProjectTasksComponent } from './pages/project-tasks.component';
import { TaskDetailComponent } from './pages/task-detail.component';

// components
import { ProjectHeaderComponent } from './components/project-header.component';
import { NewTaskButtonComponent } from './components/new-task-button.component';
import { ProjectFormComponent } from './components/project-form.component';
import { ProjectToolbarComponent } from './components/project-toolbar.component';
import { TaskListComponent } from './components/task-list.component';

// modal dialogs
import { DeleteProjectModalComponent } from './modals/delete-project-modal.component';
import { EditProjectModalComponent } from './modals/edit-project-modal.component';
import { NewProjectModalComponent } from './modals/new-project-modal.component';
import { NewTaskModalComponent } from './modals/new-task-modal.component';
import { DeleteTaskModalComponent } from './modals/delete-task-modal.component';
import { EditTaskModalComponent } from './modals/edit-task-modal.component';


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
    ProjectRootComponent,
    ProjectOverviewComponent,
    ProjectFormComponent,
    ProjectListComponent,
    ProjectHeaderComponent,
    ProjectToolbarComponent,
    ProjectTasksRootComponent,
    ProjectTasksComponent,
    TaskListComponent,
    TaskDetailComponent,
    DeleteTaskModalComponent,
    EditTaskModalComponent
  ],
  entryComponents: [
    // modal dialogs
    DeleteProjectModalComponent,
    EditProjectModalComponent,
    NewProjectModalComponent,
    NewTaskModalComponent,
    EditTaskModalComponent,
    DeleteTaskModalComponent
  ]
})
export class ProjectsModule { }
