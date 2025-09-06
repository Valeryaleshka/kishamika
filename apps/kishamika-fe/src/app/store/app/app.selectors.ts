import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ThemeState } from './app.reducers';

export const selectThemeState = createFeatureSelector<ThemeState>('theme');

export const selectTheme = createSelector(
  selectThemeState,
  (state) => state.theme
);

export const selectUser = createSelector(
  selectThemeState,
  (state) => state.user
);
