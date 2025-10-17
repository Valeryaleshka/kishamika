import { createAction, props } from '@ngrx/store';

import { User } from '../../../../../kishamika-be/src/auth/services/users.service';

export const setTheme = createAction(
  '[Theme] Set Theme',
  props<{ theme: 'light' | 'dark' | null }>(),
);

export const toggleTheme = createAction('[Theme] Toggle Theme');
export const setUser = createAction(
  '[Theme] Set user',
  props<{ user: User | null }>(),
);
