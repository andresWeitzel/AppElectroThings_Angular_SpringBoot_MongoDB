import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcercaProductosComponent } from './acerca-productos.component';

describe('AcercaProductosComponent', () => {
  let component: AcercaProductosComponent;
  let fixture: ComponentFixture<AcercaProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcercaProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcercaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
