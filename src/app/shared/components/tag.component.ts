import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {
  @Input()
  tag: string;
}
