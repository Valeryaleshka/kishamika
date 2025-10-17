import { CanActivateFn, UrlTree } from '@angular/router';

import { environment } from '../../../environments/environment';

export const notGithubGuard: CanActivateFn = () => {
  if (!environment.github) {
    return true;
  }

  return new UrlTree();
};
