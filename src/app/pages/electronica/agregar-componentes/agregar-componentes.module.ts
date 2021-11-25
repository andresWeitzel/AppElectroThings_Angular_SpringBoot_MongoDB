import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarComponentesRoutingModule } from './agregar-componentes-routing.module';
import { AgregarComponentesComponent } from './agregar-componentes.component';


@NgModule({
  declarations: [
    AgregarComponentesComponent
  ],
  imports: [
    CommonModule,
    AgregarComponentesRoutingModule
  ]
})
export class AgregarComponentesModule { }
