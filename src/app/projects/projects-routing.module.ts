import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { ProjectsRootComponent } from './projects-root.component';
import { ProjectListComponent } from './pages/project-list.component';
import { ProjectDetailComponent } from './pages/project-detail.component';
import { ProjectTasksComponent } from './pages/project-tasks.component';

// resolvers
import { ProjectDetailResolver } from './resolvers/project-detail-resolver.service';
import { ProjectTasksResolver } from './resolvers/project-tasks-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent
  },
  {
    path: ':projectId',
    component: ProjectsRootComponent,
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
