import { TestBed } from '@angular/core/testing';

import { KontoService } from './konto.service';

describe('KontoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KontoService = TestBed.get(KontoService);
    expect(service).toBeTruthy();
  });
});
