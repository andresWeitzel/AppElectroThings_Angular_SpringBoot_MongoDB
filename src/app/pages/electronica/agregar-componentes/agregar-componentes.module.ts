import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarComponentesRoutingModule } from './agregar-componentes-routing.module';
import { AgregarComponentesComponent } from './agregar-componentes.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgregarComponentesComponent
  ],
  imports: [
    CommonModule,
    AgregarComponentesRoutingModule,
    ReactiveFormsModule

  ],
})
export class AgregarComponentesModule {}
