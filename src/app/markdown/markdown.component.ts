import { Component, Input } from '@angular/core';

import { Notes } from '../api/notes';

@Component({
  selector: 'my-markdown-view',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent {
  @Input()
  notes: Notes;
}
