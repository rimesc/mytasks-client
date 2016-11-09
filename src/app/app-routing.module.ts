import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProjectListComponent } from './project-ui/project-list.component';
import { ProjectComponent } from './project-ui/project.component';
import { ProjectDetailComponent } from './project-ui/project-detail.component';
import { ProjectTasksComponent } from './project-ui/project-tasks.component';
import { TaskListComponent } from './project-ui/task-list.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'projects',
    component: ProjectListComponent
  },
  {
    path: 'projects/:id',
    component: ProjectComponent,
    children: [
      {
        path: '',
        component: ProjectDetailComponent
      },
      {
        path: 'tasks',
        component: ProjectTasksComponent
      }
    ]
  },
  {
    path: 'tasks',
    component: TaskListComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
