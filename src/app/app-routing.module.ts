import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProjectListComponent } from './project-ui/project-list.component';
import { ProjectComponent } from './project-ui/project.component';
import { ProjectDetailComponent } from './project-ui/project-detail.component';
import { ProjectTasksComponent } from './project-ui/project-tasks.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'projects',
    loadChildren: 'app/project-ui/project-ui.module#ProjectUiModule'
  },
  {
    path: 'tasks',
    loadChildren: 'app/task-ui/task-ui.module#TaskUiModule'
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
