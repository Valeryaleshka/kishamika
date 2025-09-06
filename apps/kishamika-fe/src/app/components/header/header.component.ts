import { Component, computed } from '@angular/core';

import { LoginWidgetComponent } from '../../pages/login/login-widget/login-widget.component';
import { HeaderMenuComponent } from '../header-menu/header-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginWidgetComponent, HeaderMenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  menuItems = computed(() => {
    return [
      { title: 'Home', link: '/home' },
    ];
  });
}
