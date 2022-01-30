import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioComponentesComponent } from './inicio-componentes.component';

describe('InicioComponentesComponent', () => {
  let component: InicioComponentesComponent;
  let fixture: ComponentFixture<InicioComponentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioComponentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioComponentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
