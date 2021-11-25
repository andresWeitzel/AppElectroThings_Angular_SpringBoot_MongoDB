import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoComponentesRoutingModule } from './listado-componentes-routing.module';
import { ListadoComponentesComponent } from './listado-componentes.component';


@NgModule({
  declarations: [
    ListadoComponentesComponent
  ],
  imports: [
    CommonModule,
    ListadoComponentesRoutingModule
  ]
})
export class ListadoComponentesModule { }
