import { Routes } from '@angular/router';

import { RootComponent } from './pages/root/root.component';
import { UserResolver } from './shared/resolvers/user.resolver';

export const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    resolve: {
      userData: UserResolver,
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/compress' },
      {
        path: 'compress',
        loadComponent: () =>
          import('./pages/compress/compress.component').then((m) => m.CompressComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login-page/login-page.component').then(
            (m) => m.LoginPageComponent,
          ),
      },
      {
        path: 'register',
        data: { register: true },
        loadComponent: () =>
          import('./pages/login/login-page/login-page.component').then(
            (m) => m.LoginPageComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];
