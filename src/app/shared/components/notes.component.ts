import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';

import { UnsavedChanges } from '../../core/unsaved-changes-guard.service';

@Component({
  selector: 'my-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements UnsavedChanges {

  @Input()
  title: string = 'Notes';

  @Input()
  editable: boolean = false;

  @Input()
  notes: string;

  @Output()
  update = new EventEmitter<string>();

  @ViewChild('editor')
  editor: NgControl;

  draft: string;

  activeTab: Tab = 'edit';

  get hasNotes(): boolean {
    return this.notes && this.notes.length > 0;
  }

  get editing() {
    return this.draft !== undefined;
  }

  hasUnsavedChanges(): boolean {
    return this.editing && this.editor.dirty;
  }

  edit(): void {
    if (this.editable) {
      this.draft = this.notes;
      this.activeTab = 'edit';
    }
  }

  switchTab(tab: Tab): void {
    this.activeTab = tab;
  }

  save(): void {
    this.notes = this.draft;
    this.draft = undefined;
    this.update.emit(this.notes);
  }

  cancel(): void {
    this.draft = undefined;
  }

}

type Tab = 'edit' | 'preview';
