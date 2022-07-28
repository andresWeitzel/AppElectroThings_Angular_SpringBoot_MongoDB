import { TestBed } from '@angular/core/testing';

import { InterceptorsProductosService } from './interceptors-productos.service';

describe('InterceptorsProductosService', () => {
  let service: InterceptorsProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorsProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
