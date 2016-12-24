import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  @Input()
  tags: string[];
}
