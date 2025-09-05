import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectTheme } from './store/app/app.selectors';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private store = inject(Store);

  theme$: Observable<'light' | 'dark'> = this.store.select(selectTheme);
}
