import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarComponentesComponent } from './editar-componentes.component';

describe('EditarComponentesComponent', () => {
  let component: EditarComponentesComponent;
  let fixture: ComponentFixture<EditarComponentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarComponentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarComponentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
