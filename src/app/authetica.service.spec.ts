import { TestBed } from '@angular/core/testing';

import { AutheticaService } from './authetica.service';

describe('AutheticaService', () => {
  let service: AutheticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutheticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
