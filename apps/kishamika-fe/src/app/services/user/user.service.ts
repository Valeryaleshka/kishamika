import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { User } from '../../../../../kishamika-be/src/auth/services/users.service';
import { setUser } from '../../store/app/app.actions';
import { ThemeState } from '../../store/app/app.reducers';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private store = inject(Store<{ user: ThemeState }>);
  private api = inject(ApiService);
  private destroyRef = inject(DestroyRef);

  public loginUser(user: User) {
    this.store.dispatch(setUser({ user: user }));
  }

  public logoutUser() {
    this.api
      .post('auth/logout', {})
      .pipe(take(1))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((_) => {
        this.store.dispatch(setUser({ user: null }));
      });
  }
}
