import { Component, Input } from '@angular/core';

import { Message } from './message';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  @Input()
  messages: Message[];

  public close(message: Message) {
    const index: number = this.messages.indexOf(message);
    this.messages.splice(index, 1);
  }
}
