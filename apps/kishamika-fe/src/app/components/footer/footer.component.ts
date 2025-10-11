import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTheme } from '../../store/app/app.selectors';
import { AsyncPipe } from '@angular/common';
import { setTheme } from '../../store/app/app.actions';
import { AppSelectComponent } from '../app-select/app-select.component';
import { ISelect } from '../app-select/app-select.types';

@Component({
  selector: 'app-footer',
  imports: [FormsModule, RouterLink, AsyncPipe, AppSelectComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.less',
})
export class FooterComponent {
  store = inject(Store);

  theme$: Observable<'light' | 'dark'> = this.store.select(selectTheme);

  items: ISelect<string>[] = [
    {
      title: 'Light',
      value: 'light',
    },
    {
      title: 'Dark',
      value: 'dark',
    },
  ];

  handleTheme(event: 'light' | 'dark' | null) {
    this.store.dispatch(setTheme({ theme: event }));
  }
}
