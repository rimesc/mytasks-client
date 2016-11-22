import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskComponent } from './task.component';
import { TaskListComponent } from './task-list.component';
import { TaskDetailComponent } from './task-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent
  },
  {
    path: ':id',
    component: TaskComponent,
    children: [
      {
        path: '',
        component: TaskDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskUiRoutingModule {}
