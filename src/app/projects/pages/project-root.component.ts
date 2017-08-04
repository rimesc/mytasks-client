import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

import { Error } from '../../api/error';
import { Message } from '../../shared/components/message';
import { Project } from '../../api/project';

import { CurrentProjectService } from '../services/current-project.service';

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

  constructor(private route: ActivatedRoute, private projectService: CurrentProjectService) { }

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

}
