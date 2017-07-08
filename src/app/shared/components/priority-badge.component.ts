import { Component, Input } from '@angular/core';

import { Priority } from '../../api/priority';

const ICONS = {
  LOW: 'chevron-circle-down',
  NORMAL: 'minus-circle',
  HIGH: 'chevron-circle-up',
  CRITICAL: 'exclamation-circle'
};

@Component({
  selector: 'my-priority-badge',
  templateUrl: './priority-badge.component.html',
  styleUrls: ['./priority-badge.component.scss']
})
export class PriorityBadgeComponent {
  @Input()
  priority: Priority;

  priorities = Priority;

  get icon(): string {
    return ICONS[Priority[this.priority]];
  }

}
