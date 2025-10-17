import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notGithubGuard } from './not-github.guard';

describe('notGithubGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notGithubGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
