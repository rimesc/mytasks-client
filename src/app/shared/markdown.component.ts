import { Component, Input } from '@angular/core';

import { Note } from '../api/note';

@Component({
  selector: 'markdown-view',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent {
  @Input()
  notes: Note;
}
