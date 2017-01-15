import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListComponent } from './project-list.component';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectTasksComponent } from './project-tasks.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent
  },
  {
    path: ':id',
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {}
