import { Component, Input } from '@angular/core';

import { Priority } from '../api/priority';

@Component({
  selector: 'my-priority-badge',
  template: '<my-badge label="{{priorities[priority] | titlecase}}" icon="warning" [context]="context()"></my-badge>',
  styles: []
})
export class PriorityBadgeComponent {
  @Input()
  priority: Priority;

  priorities = Priority;

  context(): string {
    switch (this.priority) {
      case Priority.LOW:
        return 'success';
      case Priority.NORMAL:
        return 'info';
      case Priority.HIGH:
        return 'warning';
      case Priority.CRITICAL:
        return 'danger';
      default:
        return 'default';
    }
  }
}
