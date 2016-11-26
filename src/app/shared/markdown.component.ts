import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Note } from '../api/note';
import { EditNotesModalComponent } from '../shared/edit-notes-modal.component';

@Component({
  selector: 'markdown-view',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent {
  @Input()
  notes: Note;

  @Output()
  update = new EventEmitter<string>();

  constructor(private modalService: NgbModal) { }

  edit(): void {
    let ref = this.modalService.open(EditNotesModalComponent);
    let markdown = this.notes ? this.notes.markdown : '';
    (ref.componentInstance as EditNotesModalComponent).markdown = markdown;
    ref.result.then((markdown: string) => this.update.emit(markdown), () => {});
  }

  hasNotes(): boolean {
    return this.notes && this.notes.markdown.length > 0;
  }
}
