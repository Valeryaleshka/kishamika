import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

import { User } from '../../../../../kishamika-be/src/auth/services/users.service';
import { ApiService } from '../../services/api/api.service';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<boolean> {
  private apiService = inject(ApiService);
  private userService = inject(UserService);

  resolve(): Observable<boolean> {
    if(!environment.github){
      return this.apiService.get<User>('auth/me').pipe(
        take(1),
        switchMap((user) => {
          if (user) {
            this.userService.loginUser(user);
          }
          return of(true); // Return user if exists, otherwise true
        }),
        catchError((error) => {
          console.error('Error fetching user data:', error);
          // Return a value that allows the route to activate
          return of(false);
        }),
      );
    }

    return of(true);

  }
}
