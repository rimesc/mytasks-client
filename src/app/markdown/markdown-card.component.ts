import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  notes: string;

  @Output()
  update = new EventEmitter<string>();

  draft: string;

  activeTab: Tab = 'edit';

  get hasNotes(): boolean {
    return this.notes && this.notes.length > 0;
  }

  get editing() {
    return this.draft !== undefined;
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
