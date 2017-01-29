import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'projects',
    canActivate: [AuthGuard],
    loadChildren: 'app/projects/projects.module#ProjectsModule'
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard],
    loadChildren: 'app/tasks/tasks.module#TasksModule'
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
