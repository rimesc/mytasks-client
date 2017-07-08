import { Component, Input } from '@angular/core';

import { State } from '../../api/state';

const ICONS = {
  TO_DO: 'clock-o',
  IN_PROGRESS: 'play-circle-o',
  ON_HOLD: 'pause-circle-o',
  DONE: 'check-circle-o'
};

@Component({
  selector: 'my-state-badge',
  template: `<span class="state state-{{states[state] | lowercase}}">
               <fa [name]="icon"></fa> {{states[state] | titlecase}}
            </span>`,
  styleUrls: ['./state-badge.component.scss']
})
export class StateBadgeComponent {

  @Input()
  state: State;

  @Input()
  mode = 'normal';

  states = State;

  get icon(): string {
    return ICONS[State[this.state]];
  }

}
