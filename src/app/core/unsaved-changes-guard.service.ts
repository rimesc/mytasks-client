import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';

import { ModalService } from './modal.service';
import { DiscardChangesModalComponent } from '../shared/components/discard-changes-modal.component';

export interface UnsavedChanges {
  hasUnsavedChanges: () => boolean | Promise<boolean>;
}

@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<UnsavedChanges> {

  constructor(private modals: ModalService) { }

  canDeactivate(component: UnsavedChanges,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot): boolean | Promise<boolean> {
    if (component.hasUnsavedChanges && component.hasUnsavedChanges()) {
      return this.modals.open(DiscardChangesModalComponent).then(() => true).catch(() => false);
    }
    return true;
  }
}