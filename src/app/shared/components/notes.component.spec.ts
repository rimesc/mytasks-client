import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MarkdownModule } from 'angular2-markdown';

import { NotesComponent } from './notes.component';
import { ModalService } from '../../core/modal.service';
import { DiscardChangesModalComponent } from './discard-changes-modal.component';

import { ModalServiceSpy } from '../../testing/modal-service-spy';
import { click } from '../../testing/component-utils';

describe('NotesComponent', () => {
  const TITLE = 'My notes';
  const MARKDOWN = `# Lorem ipsum
  Lorem ipsum dolor sit amet, [consectetur adipiscing elit](http://www.example.com).
  `;

  let modalService: ModalServiceSpy;

  let fixture: ComponentFixture<NotesComponent>;
  let component: NotesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MarkdownModule.forRoot(), FormsModule ],
      declarations: [ NotesComponent ],
      providers: [
        { provide: ModalService, useClass: ModalServiceSpy }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    modalService = TestBed.get(ModalService);
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(createComponent);
  }));

  beforeEach(() => {
    component.title = TITLE;
    component.editable = true;
    component.notes = MARKDOWN;
    fixture.detectChanges();
  });

  describe('in viewing mode', () => {

    let page: ViewingPage;

    beforeEach(async(() => {
      page = new ViewingPage(fixture);
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        page.addPageElements();
      });
    }));

    it('displays the configured title', () => {
      expect(page.title).toEqual(TITLE);
    });

    it('displays an HTML rendering of the note', () => {
      expect(page.markdown.h1).toEqual('Lorem ipsum');
      expect(page.markdown.p).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
      expect(page.markdown.a.href).toEqual('http://www.example.com');
      expect(page.markdown.a.textContent).toEqual('consectetur adipiscing elit');
      expect(page.placeholder).toBeNull();
    });

    it('displays a placeholder if the note is undefined', () => {
      component.notes = undefined;
      fixture.detectChanges();
      expect(page.placeholder).not.toBeNull();
      expect(page.placeholder.nativeElement.textContent.trim()).toEqual('No notes.');
      expect(page.markdown).toBeNull();
    });

    it('displays a placeholder if the note is empty', () => {
      component.notes = '';
      fixture.detectChanges();
      expect(page.placeholder).not.toBeNull();
      expect(page.placeholder.nativeElement.textContent.trim()).toEqual('No notes.');
      expect(page.markdown).toBeNull();
    });

    describe('the edit button', () => {

      it('is present if the component is configured to be editable', () => {
        component.editable = true;
        fixture.detectChanges();
        expect(page.editButton).not.toBeNull();
      });

      it('is absent if the component is configured to be read-only', () => {
        component.editable = false;
        fixture.detectChanges();
        expect(page.editButton).toBeNull();
      });

      it ('switches to editing mode when clicked', () => {
        expect(component.editing).toBeFalse();
        click(page.editButton);
        expect(component.editing).toBeTrue();
      });

    });

  });

  describe('in editing mode', () => {

    let page: EditingPage;

    beforeEach(async(() => {
      component.edit();
      page = new EditingPage(fixture);
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        page.addPageElements();
      });
    }));

    describe('the header', () => {

      it('contains tabs for the edit and preview tabs', () => {
        expect(page.tabs.map(e => e.nativeElement.textContent.trim())).toEqual(['Edit', 'Preview']);
        expect(page.activeTab.nativeElement.textContent.trim()).toEqual('Edit');
      });

      it('can switch between edit and preview tabs', () => {
        expect(component.activeTab).toEqual('edit');
        click(page.previewTab);
        fixture.detectChanges();
        expect(component.activeTab).toEqual('preview');
        click(page.editTab);
        fixture.detectChanges();
        expect(component.activeTab).toEqual('edit');
      });

    });

    describe('the edit tab', () => {

      it('has an input area containing the raw markdown', () => {
        expect(page.editor).not.toBeNull();
        expect(page.editor.nativeElement.value).toEqual(MARKDOWN);
      });

      it('updates the draft note', () => {
        let editedMarkdown = '# Lorem ipsum dolor';
        page.editor.triggerEventHandler('input', { target: { value: editedMarkdown } });
        fixture.detectChanges();
        expect(component.draft).toEqual(editedMarkdown);
      });

    });

    describe('the preview tab', () => {

      it('displays an HTML rendering of the initial draft note', () => {
        expect(page.preview).not.toBeNull();
        expect(page.preview.h1).toEqual('Lorem ipsum');
        // N.B. this assertion will fail without https://github.com/dimpu/angular2-markdown/pull/59
        expect(page.preview.p).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        expect(page.preview.a.href).toEqual('http://www.example.com');
        expect(page.preview.a.textContent).toEqual('consectetur adipiscing elit');
      });

      it('updates when the draft note is edited', () => {
        let editedMarkdown = '# Lorem ipsum dolor';
        component.draft = editedMarkdown;
        fixture.detectChanges();
        expect(page.preview.h1).toEqual('Lorem ipsum dolor');
        expect(page.preview.p).toBeNull();
        expect(page.preview.a).toBeNull();
      });

    });

    describe('the save button', () => {

      it('is initially disabled', () => {
        expect(page.saveButton.nativeElement.disabled).toBeTrue();
      });

      it('is enable once the note has been edited', () => {
        page.editor.triggerEventHandler('input', { target: { value: '# Lorem ipsum dolor' } });
        fixture.detectChanges();
        expect(page.saveButton.nativeElement.disabled).toBeFalse();
      });

      it ('saves the current draft note when clicked', () => {
        let editedMarkdown = '# Lorem ipsum dolor';
        component.draft = editedMarkdown;
        click(page.saveButton);
        fixture.detectChanges();
        expect(component.notes).toEqual(editedMarkdown);
      });

      it ('triggers a save event', () => {
        let editedMarkdown = '# Lorem ipsum dolor';
        component.draft = editedMarkdown;
        component.update.subscribe(t => {
          expect(t).toEqual(editedMarkdown);
        });
        click(page.saveButton);
      });

    });

    describe('the cancel button', () => {

      const EDITED_MARKDOWN = '# Lorem ipsum dolor';

      beforeEach(() => {
        component.draft = EDITED_MARKDOWN;
        modalService.ask.and.callFake(() => Promise.reject(''));
        page.editor.triggerEventHandler('input', { target: { value: '# Lorem ipsum dolor' } });
        fixture.detectChanges();
      });

      it ('displays a confirmation dialog when clicked if there are changes', () => {
        click(page.cancelButton);
        fixture.detectChanges();
        expect(modalService.ask.calls.mostRecent().args).toEqual([DiscardChangesModalComponent]);
      });

      describe('when the dialog is confirmed', () => {

        beforeEach(() => {
          modalService.ask.and.returnValue(Promise.resolve({}));
        });

        it('discards the current draft and exits editing mode', fakeAsync(() => {
          click(page.cancelButton);
          tick();
          expect(component.editing).toBeFalse();
          expect(component.notes).toEqual(MARKDOWN);
        }));

      });

      describe('when the dialog is dismissed', () => {

        it('keeps the current draft and remains in editing mode', fakeAsync(() => {
          click(page.cancelButton);
          tick();
          expect(component.editing).toBeTrue();
          expect(component.draft).toEqual(EDITED_MARKDOWN);
        }));

      });

    });

  });

  function createComponent() {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
  }

});

/** Page for accessing components in 'viewing' mode. */
class ViewingPage {

  title: DebugElement;

  constructor(private fixture: ComponentFixture<NotesComponent>) { }

  addPageElements(): void {
    this.title = this.fixture.debugElement.query(By.css('h2')).nativeElement.textContent;
  }

  get editButton(): DebugElement {
    return this.fixture.debugElement.query(By.css('.btn.edit'));
  }

  get markdown(): Markdown {
    let element = this.fixture.debugElement.query(By.css('markdown'));
    return element ? new Markdown(element) : null;
  }

  get placeholder(): DebugElement {
    return this.fixture.debugElement.query(By.css('.placeholder')); ;
  }

}

/** Page for accessing components in 'editing' mode. */
class EditingPage {

  tabs: DebugElement[];
  editTab: DebugElement;
  previewTab: DebugElement;
  editor: DebugElement;
  preview: Markdown;
  saveButton: DebugElement;
  cancelButton: DebugElement;

  constructor(private fixture: ComponentFixture<NotesComponent>) { }

  addPageElements(): void {
    this.tabs = this.fixture.debugElement.queryAll(By.css('.nav-link'));
    this.editTab = this.tabs[0];
    this.previewTab = this.tabs[1];
    this.editor = this.fixture.debugElement.query(By.css('textarea'));
    this.preview = new Markdown(this.fixture.debugElement.query(By.css('markdown')));
    let buttons = this.fixture.debugElement.queryAll(By.css('button'));
    this.saveButton = buttons[0];
    this.cancelButton = buttons[1];
  }

  get activeTab(): DebugElement {
    return this.fixture.debugElement.query(By.css('.nav-link.active'));
  }

}

class Markdown {

  constructor(private element: DebugElement) { }

  // Note that the following accessors work with native elements rather than debug elements
  // because the latter don't work properly if you've directly set innerHtml, e.g.
  // http://stackoverflow.com/questions/40508153/angular2-how-to-unit-test-a-component-with-dynamically-created-html

  get h1(): string {
    let h1 = this.element.nativeElement.querySelector('h1');
    return h1 == null ? null : h1.textContent.trim();
  }

  get p(): string {
    let paragraph = this.element.nativeElement.querySelector('p');
    return paragraph == null ? null : paragraph.textContent.trim();
  }

  get a(): Anchor {
    let anchor = this.element.nativeElement.querySelector('a');
    return anchor === null ? null : { href: anchor.getAttribute('href').trim(), textContent: anchor.textContent.trim() };
  }

}

interface Anchor {
  href: string;
  textContent: Promise<string>;
}

