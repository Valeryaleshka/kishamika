import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputDirective, NzInputModule } from 'ng-zorro-antd/input';
import { take } from 'rxjs';

import { User } from '../../../../../../kishamika-be/src/auth/services/users.service';
import { BorderedCardComponent } from '../../../components/bordered-card/bordered-card.component';
import { ContentWrapperComponent } from '../../../components/content-wrapper/content-wrapper.component';
import { CenterDirective } from '../../../derectives/center-content.directive';
import { ApiService } from '../../../services/api/api.service';
import { UserService } from '../../../services/user/user.service';
import { matchValidator } from '../../../shared/common/helpers/form.helper';

@Component({
  selector: 'app-login-page',
  standalone: true,
  providers: [ApiService],
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ContentWrapperComponent,
    CenterDirective,
    BorderedCardComponent,
    NzInputDirective,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private api = inject(ApiService);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private router = inject(Router);
  protected isRegisterForm = false;
  protected formValidationErrors = {
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  };

  protected form = new FormGroup<Record<string, FormControl>>({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });

  constructor() {
    this.isRegisterForm = this.route.snapshot.data['register'];
    if (this.isRegisterForm) {
      this.form.addControl('name', new FormControl('', [Validators.required]));
      this.form.addControl(
        'confirmPassword',
        new FormControl('', [Validators.required, matchValidator('password')]),
      );
      this.form
        .get('password')
        ?.addValidators([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(25),
        ]);
    }
  }

  onSubmit() {
    if (this.isRegisterForm) {
      this.api
        .post('auth/register', this.form.value)
        .pipe(take(1))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((_) => {
          this.router.navigate(['/login']).then();
        });
    } else {
      this.api
        .post<User>('auth/login', this.form.value)
        .pipe(take(1))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((user) => {
          this.userService.loginUser(user);
          this.router.navigate(['/']).then();
        });
    }
  }
}
