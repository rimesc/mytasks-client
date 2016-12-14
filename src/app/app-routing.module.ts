import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'projects',
    canActivate: [AuthGuard],
    loadChildren: 'app/project-ui/project-ui.module#ProjectUiModule'
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard],
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
