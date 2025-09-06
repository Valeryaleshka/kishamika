import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';

import { setTheme } from '../../store/app/app.actions';
import { ThemeState } from '../../store/app/app.reducers';
import { selectTheme } from '../../store/app/app.selectors';


@Component({
  selector: 'app-footer',
  imports: [
    FormsModule,
    RouterLink,
    NzSelectComponent,
    NzOptionComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  private store = inject(Store<{ theme: ThemeState }>);
  theme = this.store.selectSignal(selectTheme);

  themes = [
    {
      label: 'Light',
      value: 'light',
    },
    {
      label: 'Dark',
      value: 'dark',
    },
  ];

  click() {
    console.log('clicked', this.theme());
  }

  onThemeChange(value: 'light' | 'dark') {
    this.store.dispatch(setTheme({ theme: value }));
  }
}
