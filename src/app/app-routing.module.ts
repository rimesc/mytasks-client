import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProjectListComponent } from './project-list.component';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectTasksComponent } from './project-tasks.component';
import { TaskListComponent } from './task-list.component';

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
