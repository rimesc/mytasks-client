import { Injectable } from '@angular/core';
import { Message } from '../../shared/components/message';

/**
 * Service used by the children of `ProjectsRootComponent` to display messages in the parent view.
 */
@Injectable()
export class MessagesService {

  messages: Message[] = [];

  error(code: string, detail: string) {
    this.messages.push({ code: code, detail: detail, severity: 'danger'});
  }

  warn(code: string, detail: string) {
    this.messages.push({ code: code, detail: detail, severity: 'warning'});
  }

  success(code: string, detail: string) {
    this.messages.push({ code: code, detail: detail, severity: 'success'});
  }

  info(code: string, detail: string) {
    this.messages.push({ code: code, detail: detail, severity: 'info'});
  }

}
