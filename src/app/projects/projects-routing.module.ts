import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListComponent } from './project-list.component';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectTasksComponent } from './project-tasks.component';

import { ProjectDetailResolver } from './project-detail-resolver.service';
import { ProjectTasksResolver } from './project-tasks-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent
  },
  {
    path: ':projectId',
    component: ProjectComponent,
    children: [
      {
        path: '',
        component: ProjectDetailComponent,
        resolve: {
          project: ProjectDetailResolver
        }
      },
      {
        path: 'tasks',
        component: ProjectTasksComponent,
        resolve: {
          project: ProjectDetailResolver,
          tasks: ProjectTasksResolver
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
    ProjectDetailResolver,
    ProjectTasksResolver
  ],
  exports: [
    RouterModule
  ]
})
export class ProjectsRoutingModule {}
