import { createReducer, on } from '@ngrx/store';

import { setTheme, setUser, toggleTheme } from './app.actions';
import { User } from '../../../../../kishamika-be/src/auth/services/users.service';

export type themeType = 'light' | 'dark';

export interface ThemeState {
  theme: themeType;
  user: User | null;
}

export const initialState: ThemeState = {
  theme: 'dark',
  user: null,
};

export const appReducer = createReducer(
  initialState,
  on(setTheme, (state, { theme }) => ({ ...state, theme: theme ?? 'light' })),
  on(toggleTheme, (state) => ({
    ...state,
    theme: state.theme === 'light' ? 'dark' : 'light' as themeType,
  })),
  on(setUser, (state, { user }) => ({
    ...state,
    user: user,
  }))
);
