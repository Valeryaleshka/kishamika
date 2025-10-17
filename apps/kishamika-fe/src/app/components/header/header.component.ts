import { Component, computed, OnInit } from '@angular/core';

import { LoginWidgetComponent } from '../../pages/login/login-widget/login-widget.component';
import { HeaderMenuComponent } from '../header-menu/header-menu.component';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginWidgetComponent, HeaderMenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit{
  protected readonly environment = environment;

  menuItems = computed(() => {
    return [{ title: 'Home', link: '/compress' }];
  });

  ngOnInit(): void {
    console.log(this.environment);
  }

}
