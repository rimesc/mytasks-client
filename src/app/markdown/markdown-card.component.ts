import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Notes } from '../api/notes';
import { EditNotesModalComponent } from './edit-notes-modal.component';

@Component({
  selector: 'my-markdown-card',
  templateUrl: './markdown-card.component.html',
  styleUrls: ['./markdown-card.component.scss']
})
export class MarkdownCardComponent {
  @Input()
  title: string = 'Notes';

  @Input()
  editable: boolean = false;

  @Input()
  notes: Notes;

  @Output()
  update = new EventEmitter<string>();

  constructor(private modalService: NgbModal) { }

  edit(): void {
    let ref = this.modalService.open(EditNotesModalComponent);
    let markdown = this.notes ? this.notes.raw : '';
    (ref.componentInstance as EditNotesModalComponent).markdown = markdown;
    ref.result.then((text: string) => this.update.emit(text), () => {});
  }

  hasNotes(): boolean {
    return this.notes && this.notes.raw.length > 0;
  }

}
