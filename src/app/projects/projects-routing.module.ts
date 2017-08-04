import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { ProjectRootComponent } from './pages/project-root.component';
import { ProjectListComponent } from './pages/project-list.component';
import { ProjectOverviewComponent } from './pages/project-overview.component';
import { ProjectTasksComponent } from './pages/project-tasks.component';

// guards
import { UnsavedChangesGuard } from '../core/unsaved-changes-guard.service';

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
    component: ProjectRootComponent,
    resolve: {
      project: ProjectDetailResolver
    },
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: ProjectOverviewComponent,
        canDeactivate: [UnsavedChangesGuard]
      },
      {
        path: 'tasks',
        component: ProjectTasksComponent,
        resolve: {
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
