import { DebugElement } from '@angular/core';

/** Click on an element. */
export function click(element: DebugElement): void {
  element.triggerEventHandler('click', null);
}

/** Enter a value into an input element. */
export function input(element: DebugElement, value: string): void {
    element.triggerEventHandler('input', { target: { value: value } });
}
