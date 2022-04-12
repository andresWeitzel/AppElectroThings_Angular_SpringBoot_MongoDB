import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NovedadesComponentesRoutingModule } from './novedades-componentes-routing.module';
import { NovedadesComponentesComponent } from './novedades-componentes.component';


@NgModule({
  declarations: [
    NovedadesComponentesComponent
  ],
  imports: [
    CommonModule,
    NovedadesComponentesRoutingModule
  ]
})
export class NovedadesComponentesModule { }
