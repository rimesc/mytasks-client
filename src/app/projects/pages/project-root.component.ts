import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { Message } from '../../shared/components/message';
import { Project } from '../../api/project';
import { Resolved } from '../resolvers/error-handling-resolver';
import { TaskForm } from '../../api/task-form';

import { CurrentProjectService } from '../services/current-project.service';
import { MessagesService } from '../services/messages.service';
import { TaskService } from '../../services/task.service';

/**
 * The root project page.
 *
 * Displays the project header and navigation tabs and provides a router outlet for the tab contents.
 */
@Component({
  selector: 'my-project',
  templateUrl: './project-root.component.html',
  styleUrls: [],
  providers: [ CurrentProjectService, MessagesService ]
})
export class ProjectRootComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectService: CurrentProjectService,
              private messagesService: MessagesService,
              private taskService: TaskService
              ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { project: Resolved<Project> }) => {
        data.project.handle(
          project => this.projectService.project = project,
          error => this.messagesService.error(error.code, error.message)
        );
      }
    );
  }

  get project(): Project {
    return this.projectService.project;
  }

  get messages(): Message[] {
    return this.messagesService.messages;
  }

  createTask(task: TaskForm): void {
    this.taskService.createTask(this.project.id, task).then(newTask => {
      this.router.navigate(['projects', this.project.id, 'tasks', newTask.id]);
    });
  }

  // workaround for https://github.com/angular/angular/issues/7791
  // see https://github.com/angular/angular/issues/7791#issuecomment-237897149
  onActivate(e, outlet) {
    outlet.scrollTop = 0;
  }

}
