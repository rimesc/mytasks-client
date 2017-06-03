import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';

import { ModalService } from '../../core/modal.service';
import { DiscardChangesModalComponent } from '../../shared/components/discard-changes-modal.component';

@Component({
  selector: 'my-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {

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

  constructor(private modals: ModalService) { }

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

  tryCancel(): Promise<void> {
    return this.checkForUnsavedChanges().then(() => this.discardChanges());
  }

  cancel(): void {
    this.tryCancel().catch(() => {});
  }

  private checkForUnsavedChanges(): Promise<void> {
    return this.hasUnsavedChanges() ? this.modals.ask(DiscardChangesModalComponent) : Promise.resolve();
  }

  private discardChanges(): void {
    this.draft = undefined;
  }

}

type Tab = 'edit' | 'preview';
