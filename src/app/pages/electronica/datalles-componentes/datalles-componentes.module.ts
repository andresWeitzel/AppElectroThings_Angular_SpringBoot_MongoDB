import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatallesComponentesRoutingModule } from './datalles-componentes-routing.module';
import { DatallesComponentesComponent } from './datalles-componentes.component';


@NgModule({
  declarations: [
    DatallesComponentesComponent
  ],
  imports: [
    CommonModule,
    DatallesComponentesRoutingModule
  ]
})
export class DatallesComponentesModule { }
