import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadesComponentesComponent } from './novedades-componentes.component';

describe('NovedadesComponentesComponent', () => {
  let component: NovedadesComponentesComponent;
  let fixture: ComponentFixture<NovedadesComponentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovedadesComponentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovedadesComponentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
