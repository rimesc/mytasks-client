import { Component } from '@angular/core';

/**
 * The root tasks page.
 */
@Component({
  selector: 'my-project-tasks',
  templateUrl: './project-tasks-root.component.html'
})
export class ProjectTasksRootComponent {

  // workaround for https://github.com/angular/angular/issues/7791
  // see https://github.com/angular/angular/issues/7791#issuecomment-237897149
  onActivate(e, outlet) {
    outlet.scrollTop = 0;
  }

}
