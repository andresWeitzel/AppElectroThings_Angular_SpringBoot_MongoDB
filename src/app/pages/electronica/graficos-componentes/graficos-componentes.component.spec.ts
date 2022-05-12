import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosComponentesComponent } from './graficos-componentes.component';

describe('GraficosComponentesComponent', () => {
  let component: GraficosComponentesComponent;
  let fixture: ComponentFixture<GraficosComponentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficosComponentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosComponentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
