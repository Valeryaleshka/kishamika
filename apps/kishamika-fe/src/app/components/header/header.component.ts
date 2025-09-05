import { Component, computed, inject } from '@angular/core';

import { LoginWidgetComponent } from '../../pages/login/login-widget/login-widget.component';
import { UserService } from '../../services/user/user.service';
import { insertIf } from '../../shared/utils/utils';
import { HeaderMenuComponent } from '../header-menu/header-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginWidgetComponent, HeaderMenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private userService = inject(UserService);

  menuItems = computed(() => {
    return [
      { title: 'Home', link: '/home' },
      ...insertIf(this.userService.getUser(), {
        title: 'Users',
        link: '/users',
      }),
    ];
  });
}
