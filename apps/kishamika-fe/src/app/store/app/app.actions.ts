import { createAction, props } from '@ngrx/store';

import { themeType } from './app.reducers';
import { User } from '../../../../../kishamika-be/src/auth/services/users.service';

export const setTheme = createAction(
  '[Theme] Set Theme',
  props<{ theme: themeType }>(),
);

export const toggleTheme = createAction('[Theme] Toggle Theme');

export const setUser = createAction(
  '[Theme] Set User',
  props<{ user: User | null }>(),
);
