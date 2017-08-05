import { NgModule } from '@angular/core';

// feature modules
import { SharedModule } from '../shared/shared.module';
import { TasksRoutingModule } from './tasks-routing.module';

// pages
import { TasksRootComponent } from './tasks-root.component';
import { TaskListComponent } from './pages/task-list.component';

@NgModule({
  declarations: [
    // components
    TasksRootComponent,
    TaskListComponent
  ],
  imports: [
    // feature modules
    SharedModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
