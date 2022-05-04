import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarComponentesRoutingModule } from './editar-componentes-routing.module';
import { EditarComponentesComponent } from './editar-componentes.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditarComponentesComponent
  ],
  imports: [
    CommonModule,
    EditarComponentesRoutingModule,
    ReactiveFormsModule,
  ],
})
export class EditarComponentesModule { }
