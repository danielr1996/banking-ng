import { TestBed, async, inject } from '@angular/core/testing';

import { IsLoggedInGuard } from './is-logged-in-guard.service';

describe('AuthorizationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsLoggedInGuard]
    });
  });

  it('should ...', inject([IsLoggedInGuard], (guard: IsLoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
