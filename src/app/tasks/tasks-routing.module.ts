import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskComponent } from './task.component';
import { TaskListComponent } from './task-list.component';
import { TaskDetailComponent } from './task-detail.component';
import { TaskResolver } from './task-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent
  },
  {
    path: ':taskId',
    component: TaskComponent,
    children: [
      {
        path: '',
        component: TaskDetailComponent,
        resolve: {
          task: TaskResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [
    TaskResolver
  ],
  exports: [
    RouterModule
  ]
})
export class TasksRoutingModule {}
