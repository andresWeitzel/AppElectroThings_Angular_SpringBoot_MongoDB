import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarComponentesComponent } from './agregar-componentes.component';

describe('AgregarComponentesComponent', () => {
  let component: AgregarComponentesComponent;
  let fixture: ComponentFixture<AgregarComponentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarComponentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarComponentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
