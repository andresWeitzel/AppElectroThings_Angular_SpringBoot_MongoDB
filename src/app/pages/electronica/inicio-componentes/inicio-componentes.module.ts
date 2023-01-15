import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioComponentesRoutingModule } from './inicio-componentes-routing.module';
import { InicioComponentesComponent } from './inicio-componentes.component';


@NgModule({
  declarations: [
    InicioComponentesComponent
  ],
  imports: [
    CommonModule,
    InicioComponentesRoutingModule
  ]
})
export class InicioComponentesModule { }
