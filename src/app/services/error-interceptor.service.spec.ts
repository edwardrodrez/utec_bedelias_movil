import { TestBed } from '@angular/core/testing';

import { HttpErrorInterceptor } from './error-interceptor.service';

describe('ErrorInterceptorService', () => {
  let service: HttpErrorInterceptor ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpErrorInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
