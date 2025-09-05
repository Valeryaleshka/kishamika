import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideAntIcons } from '@ant-design/icons-angular';
import { AccountBookFill } from '@ant-design/icons-angular/icons';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { appReducer } from './store/app/app.reducers';
import { environment } from '../../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideStore(),
    provideState({ name: 'theme', reducer: appReducer }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !environment.production,
    }),
    provideAntIcons([AccountBookFill]),
    provideRouter(routes),
  ],
};
