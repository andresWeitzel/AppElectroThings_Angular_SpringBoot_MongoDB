import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarComponentesRoutingModule } from './editar-componentes-routing.module';
import { EditarComponentesComponent } from './editar-componentes.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductoFormModule } from 'src/app/shared/components/producto-form/producto-form.module';


@NgModule({
  declarations: [
    EditarComponentesComponent
  ],
  imports: [
    CommonModule,
    EditarComponentesRoutingModule,
    ReactiveFormsModule,
    ProductoFormModule
  ]
})
export class EditarComponentesModule { }
