import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetallesComponentesRoutingModule } from './detalles-componentes-routing.module';
import { DetallesComponentesComponent } from './detalles-componentes.component';


@NgModule({
  declarations: [
    DetallesComponentesComponent
  ],
  imports: [
    CommonModule,
    DetallesComponentesRoutingModule
  ]
})
export class DetallesComponentesModule { }
