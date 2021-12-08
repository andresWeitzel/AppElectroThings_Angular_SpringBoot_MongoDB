import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatallesComponentesComponent } from './datalles-componentes.component';

describe('DatallesComponentesComponent', () => {
  let component: DatallesComponentesComponent;
  let fixture: ComponentFixture<DatallesComponentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatallesComponentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatallesComponentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
