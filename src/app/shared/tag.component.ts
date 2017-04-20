import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-tag',
  template: `<my-badge [label]="tag" icon="tag"></my-badge>`,
  styles: []
})
export class TagComponent {
  @Input()
  tag: string;
}
