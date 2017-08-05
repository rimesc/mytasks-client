import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-project-toolbar',
  templateUrl: './project-toolbar.component.html',
  styleUrls: ['./project-toolbar.component.css']
})
export class ProjectToolbarComponent {
  @Output()
  edit = new EventEmitter<void>();
  @Output()
  delete = new EventEmitter<void>();

}
