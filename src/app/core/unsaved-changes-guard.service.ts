import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';

import { ModalService } from './modal.service';

/**
 * Components that take input and want to prevent navigating away without saving
 * should implement this interface and return `true` if it is safe to leave.
 */
export interface CanDeactivateComponent {
  canDeactivate: () => boolean | Promise<boolean>;
}

/**
 * Prevents navigation away from a page that has unsaved changes unless confirmed by the user.
 * Delegates to the page component to ask the user for confirmation if necessary.
 */
@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<CanDeactivateComponent> {

  constructor(private modals: ModalService) { }

  canDeactivate(component: CanDeactivateComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot): boolean | Promise<boolean> {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}