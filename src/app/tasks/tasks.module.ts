import { NgModule } from '@angular/core';

// feature modules
import { SharedModule } from '../shared/shared.module';
import { TasksRoutingModule } from './tasks-routing.module';

// components
import { DeleteTaskModalComponent } from './delete-task-modal.component';
import { EditTaskModalComponent } from './edit-task-modal.component';
import { TaskComponent } from './task.component';
import { TaskDetailComponent } from './task-detail.component';
import { TaskListComponent } from './task-list.component';

@NgModule({
  declarations: [
    // components
    DeleteTaskModalComponent,
    EditTaskModalComponent,
    TaskComponent,
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
