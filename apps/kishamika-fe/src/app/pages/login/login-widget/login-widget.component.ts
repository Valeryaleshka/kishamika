import { Component, computed, inject } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';

import { HeaderMenuComponent } from '../../../components/header-menu/header-menu.component';
import { UserService } from '../../../services/user/user.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../store/app/app.selectors';
import { CenterDirective } from '../../../derectives/center-content.directive';

@Component({
  selector: 'app-login-widget',
  standalone: true,
  imports: [HeaderMenuComponent, NzButtonComponent, CenterDirective],
  templateUrl: './login-widget.component.html',
  styleUrl: './login-widget.component.less',
})
export class LoginWidgetComponent {
  private userService = inject(UserService);
  private store = inject(Store);
  protected currentUser = computed(this.store.selectSignal(selectUser));

  menuItems = [
    { title: 'Login', link: '/login' },
    { title: 'Register', link: '/register' },
  ];

  logout() {
    this.userService.logoutUser();
  }

  protected readonly selectUser = selectUser;
}
