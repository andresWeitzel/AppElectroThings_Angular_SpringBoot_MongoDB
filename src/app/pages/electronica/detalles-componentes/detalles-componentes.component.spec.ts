import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesComponentesComponent } from './detalles-componentes.component';

describe('DetallesComponentesComponent', () => {
  let component: DetallesComponentesComponent;
  let fixture: ComponentFixture<DetallesComponentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesComponentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesComponentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
