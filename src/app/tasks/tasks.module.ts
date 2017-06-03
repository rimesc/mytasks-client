import { NgModule } from '@angular/core';

// feature modules
import { SharedModule } from '../shared/shared.module';
import { TasksRoutingModule } from './tasks-routing.module';

// pages
import { TasksRootComponent } from './tasks-root.component';
import { TaskDetailComponent } from './pages/task-detail.component';
import { TaskListComponent } from './pages/task-list.component';

// modal dialogs
import { DeleteTaskModalComponent } from './modals/delete-task-modal.component';
import { EditTaskModalComponent } from './modals/edit-task-modal.component';

@NgModule({
  declarations: [
    // components
    DeleteTaskModalComponent,
    EditTaskModalComponent,
    TasksRootComponent,
    TaskDetailComponent,
    TaskListComponent
  ],
  imports: [
    // feature modules
    SharedModule,
    TasksRoutingModule
  ],
  entryComponents: [
    // modal dialogs
    EditTaskModalComponent,
    DeleteTaskModalComponent
  ]
})
export class TasksModule { }
