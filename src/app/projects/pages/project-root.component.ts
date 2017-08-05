import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

import { Error } from '../../api/error';
import { Message } from '../../shared/components/message';
import { Project } from '../../api/project';
import { TaskForm } from '../../api/task-form';

import { CurrentProjectService } from '../services/current-project.service';
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
  providers: [ CurrentProjectService ]
})
export class ProjectRootComponent implements OnInit {

  messages: Message[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectService: CurrentProjectService,
              private taskService: TaskService
              ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { project: Project }) => {
        this.projectService.project = data.project;
      },
      (error: Error) => this.messages.push({ code: error.code, detail: error.message, severity: 'danger'})
    );
  }

  get project(): Project {
    return this.projectService.project;
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
