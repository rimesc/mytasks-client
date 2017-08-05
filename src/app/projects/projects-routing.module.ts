import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { ProjectRootComponent } from './pages/project-root.component';
import { ProjectListComponent } from './pages/project-list.component';
import { ProjectOverviewComponent } from './pages/project-overview.component';
import { ProjectTasksRootComponent } from './pages/project-tasks-root.component';
import { ProjectTasksComponent } from './pages/project-tasks.component';
import { TaskDetailComponent } from './pages/task-detail.component';

// guards
import { UnsavedChangesGuard } from '../core/unsaved-changes-guard.service';

// resolvers
import { ProjectDetailResolver } from './resolvers/project-detail-resolver.service';
import { ProjectTasksResolver } from './resolvers/project-tasks-resolver.service';
import { TaskResolver } from './resolvers/task-resolver.service';

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
        component: ProjectTasksRootComponent,
        children: [
          {
            path: '',
            component: ProjectTasksComponent,
            resolve: {
              tasks: ProjectTasksResolver
            }
          },
          {
            path: ':taskId',
            component: TaskDetailComponent,
            canDeactivate: [UnsavedChangesGuard],
            resolve: {
              task: TaskResolver
            }
          }
        ]
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
    ProjectTasksResolver,
    TaskResolver
  ],
  exports: [
    RouterModule
  ]
})
export class ProjectsRoutingModule {}
