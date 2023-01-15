import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarComponentesRoutingModule } from './editar-componentes-routing.module';
import { EditarComponentesComponent } from './editar-componentes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';



@NgModule({
  declarations: [
    EditarComponentesComponent
  ],
  imports: [
    CommonModule,
    EditarComponentesRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MdbValidationModule,
  ],
})
export class EditarComponentesModule { }
