import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { TasksRootComponent } from './tasks-root.component';
import { TaskListComponent } from './pages/task-list.component';
import { TaskDetailComponent } from './pages/task-detail.component';

// guards
import { UnsavedChangesGuard } from '../core/unsaved-changes-guard.service';

// resolvers
import { TaskResolver } from './resolvers/task-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent
  },
  {
    path: ':taskId',
    component: TasksRootComponent,
    children: [
      {
        path: '',
        component: TaskDetailComponent,
        canDeactivate: [UnsavedChangesGuard],
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
