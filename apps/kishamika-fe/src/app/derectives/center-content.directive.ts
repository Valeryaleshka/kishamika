import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[centerContent]',
})
export class CenterDirective {
  @HostBinding('style.display') display = 'flex';
  @HostBinding('style.justify-content') justifyContent = 'center';
  @HostBinding('style.align-items') alignItems = 'center';
}
