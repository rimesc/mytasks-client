import { TestBed, async, inject, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { EnumValues } from 'enum-values';
import { TagInputComponent, TagInputModule } from 'ng2-tag-input';

import { TaskForm } from '../api/task-form';
import { Priority } from '../api/priority';
import { TaskFormComponent } from './task-form.component';
import { TitleCasePipe } from '../shared/title-case.pipe';
import { EnumValuesPipe } from '../shared/enum-values.pipe';

describe('TaskFormComponent', () => {

  let fixture: ComponentFixture<TaskFormComponent>;
  let page: Page;

  let task: TaskForm;
  let action: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, TagInputModule ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ TaskFormComponent, TitleCasePipe, EnumValuesPipe ],
      providers: [ TaskFormComponent ]
    });
  });

  describe('when opened with an existing task', () => {

    beforeEach(async(() => {
      task = { summary: 'My sample task', priority: Priority.HIGH, tags: ['foo', 'bar' ] };
      action = 'Save';
      TestBed.compileComponents().then(createComponent);
    }));

    describe('the summary field', () => {

      it('should display the task summary', () => {
        expect(page.summaryInput.value).toEqual('My sample task');
      });

      it('should have no errors', () => {
        expect((page.summaryLabel.query(By.css('.text-danger')).nativeElement as HTMLElement).hidden).toBeTrue();
      });

      it('should be invalid if left empty', () => {
        page.summaryInput.value = '';
        page.summaryInput.dispatchEvent(new Event('input'));
        page.summaryInput.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        expect((page.summaryLabel.query(By.css('.text-danger')).nativeElement as HTMLElement).hidden).toBeFalse();
      });

    });

    describe('the tag input', () => {

      it('should display the task tags', () => {
        expect(page.tags).toEqual(['foo', 'bar']);
      });

      it('should allow a tag to be removed', () => {
        page.tagInput.removeTag('foo');
        fixture.detectChanges();
        expect(page.tags).toEqual(['bar']);
      });

      it('should allow a tag to be added', () => {
        page.tagInput.addTag('baz');
        fixture.detectChanges();
        expect(page.tags).toEqual(['foo', 'bar', 'baz']);
      });

    });

    describe('the priority input', () => {

      it('should display the priority', () => {
        expect(page.prioritySelect.selectedOptions.length).toEqual(1);
        expect(+page.prioritySelect.selectedOptions.item(0).value).toEqual(Priority.HIGH);
      });

      it('should offer all the priorities as options', () => {
        expect(page.priorityOptions.map(opt => +opt.value)).toEqual(EnumValues.getValues(Priority));
      });

    });

    describe('the save button', () => {

      it('should have be labelled "save"', () => {
        expect(page.buttons.save.textContent).toEqual('Save');
      });

      it('should be enabled', () => {
        expect(page.buttons.save.disabled).toBeFalse();
      });

      it('should be disabled if the form has errors', () => {
        page.summaryInput.value = '';
        page.summaryInput.dispatchEvent(new Event('input'));
        page.summaryInput.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        expect(page.buttons.save.disabled).toBeTrue();
      });

    });

    it('should save the changes when the form is submitted', done => {
      page.summaryInput.value = 'My edited task';
      page.summaryInput.dispatchEvent(new Event('input'));
      page.prioritySelect.value = Priority.LOW.toString();
      page.prioritySelect.dispatchEvent(new Event('change'));
      page.tagInput.removeTag('foo');
      page.tagInput.addTag('baz');
      fixture.detectChanges();
      page.component.submit.subscribe(t => {
        expect(t.summary).toEqual('My edited task');
        // this comes back as a string, but it seems to work anyway
        expect(+t.priority).toEqual(Priority.LOW);
        expect(t.tags).toEqual(['bar', 'baz' ]);
        done();
      });
      fixture.detectChanges();
      page.buttons.save.click();
    });

    it('should not save the changes when the form is dismissed', done => {
      page.summaryInput.value = 'My edited task';
      page.summaryInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      page.component.submit.subscribe(t => fail('Unexpectedly saved changes on dismiss'));
      page.component.cancel.subscribe(() => done());
      fixture.detectChanges();
      page.buttons.cancel.click();
    });

  });

  describe('when opened with a new task', () => {

    beforeEach(async(() => {
      task = new TaskForm();
      action = 'Create';
      TestBed.compileComponents().then(createComponent);
    }));

    describe('the summary field', () => {

      it('should display an empty summary', () => {
        expect(page.summaryInput.value).toBeEmptyString();
      });

      it('should have no errors', () => {
        expect((page.summaryLabel.query(By.css('.text-danger')).nativeElement as HTMLElement).hidden).toBeTrue();
      });

      it('should be invalid if left empty', () => {
        page.summaryInput.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        expect((page.summaryLabel.query(By.css('.text-danger')).nativeElement as HTMLElement).hidden).toBeFalse();
      });

    });

    describe('the tag input', () => {

      it('should display no tags', () => {
        expect(page.tags).toBeEmptyArray();
      });

      it('should allow a tag to be added', () => {
        page.tagInput.addTag('baz');
        fixture.detectChanges();
        expect(page.tags).toEqual(['baz']);
      });

    });

    describe('the priority input', () => {

      it('should display the default priority', () => {
        expect(page.prioritySelect.selectedOptions.length).toEqual(1);
        expect(+page.prioritySelect.selectedOptions.item(0).value).toEqual(Priority.NORMAL);
      });

      it('should offer all the priorities as options', () => {
        expect(page.priorityOptions.map(opt => +opt.value)).toEqual(EnumValues.getValues(Priority));
      });

    });

    describe('the save button', () => {

      it('should be labelled "create"', () => {
        expect(page.buttons.save.textContent).toEqual('Create');
      });

      it('should be disabled', () => {
        expect(page.buttons.save.disabled).toBeTrue();
      });

      it('should be disabled if the form has errors', () => {
        page.summaryInput.value = '';
        page.summaryInput.dispatchEvent(new Event('input'));
        page.summaryInput.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        expect(page.buttons.save.disabled).toBeTrue();
      });

    });

  });

  function createComponent() {
    fixture = TestBed.createComponent(TaskFormComponent);
    page = new Page(fixture);
    page.component.task = task;
    page.component.action = action;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      fixture.detectChanges();
      page.addPageElements();
    });
  }

});

class Page {

  component: TaskFormComponent;

  summaryInput: HTMLInputElement;
  summaryLabel: DebugElement;
  tagInput: TagInput;
  prioritySelect: HTMLSelectElement;
  priorityOptions: HTMLOptionElement[];
  buttons: { save: HTMLInputElement, cancel: HTMLInputElement };

  constructor(private fixture: ComponentFixture<TaskFormComponent>) {
    this.component = this.fixture.componentInstance;
  }

  addPageElements() {
    this.summaryInput = this.fixture.debugElement.query(By.css('input#taskSummary')).nativeElement;
    this.summaryLabel = this.fixture.debugElement.query(By.css('label#taskSummaryLabel'));
    this.tagInput = new TagInput(this.fixture.debugElement.query(By.css('tag-input')));
    this.prioritySelect = this.fixture.debugElement.query(By.css('select#taskPriority')).nativeElement;
    this.priorityOptions = this.fixture.debugElement.queryAll(By.css('select#taskPriority>option')).map(e => e.nativeElement);
    this.buttons = {
      save: this.fixture.debugElement.query(By.css('button.btn-primary')).nativeElement,
      cancel: this.fixture.debugElement.query(By.css('button.btn-default')).nativeElement
    };
  }

  get tags(): string[] {
    return this.tagInput.tags.map(tag => tag.value);
  }

  get task() {
    return this.component.task;
  }

}

class TagInput {

  private form: HTMLFormElement;
  private formInput: HTMLInputElement;

  constructor(private element: DebugElement) {
    this.form = this.element.query(By.css('form')).nativeElement;
    this.formInput = this.element.query(By.css('form>input')).nativeElement;
  }

  get tags(): Tag[] {
    return this.element.queryAll(By.css('.ng2-tag')).map(e => new Tag(e));
  }

  addTag(tag: string) {
    this.formInput.value = 'baz';
    this.formInput.dispatchEvent(new Event('input'));
    this.form.dispatchEvent(new Event('submit'));
  }

  removeTag(tag: string) {
    this.tags.filter(t => t.value === tag)[0].deleteButton.dispatchEvent(new Event('click'));
  }

}

class Tag {

  value: string;
  deleteButton: Element;

  constructor(private element: DebugElement) {
    this.value = element.nativeElement.textContent.trim();
    this.deleteButton = element.query(By.css('.ng2-tag__remove-button')).nativeElement;
  }
}
