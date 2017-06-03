import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  @Input()
  label: string;

  @Input()
  icon: string;

  @Input()
  context: string = 'default';
}
