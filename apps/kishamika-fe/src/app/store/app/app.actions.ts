import { createAction, props } from '@ngrx/store';

export const setTheme = createAction(
  '[Theme] Set Theme',
  props<{ theme: 'light' | 'dark' | null}>(),
);

export const toggleTheme = createAction('[Theme] Toggle Theme');
