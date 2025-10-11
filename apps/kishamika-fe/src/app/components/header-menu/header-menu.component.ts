import { Component, InputSignal, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzButtonComponent } from 'ng-zorro-antd/button';

import { HeaderMenu } from './header-input.interface';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NzButtonComponent],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.less',
})
export class HeaderMenuComponent {
  menu: InputSignal<HeaderMenu[]> = input<HeaderMenu[]>([]);
}
