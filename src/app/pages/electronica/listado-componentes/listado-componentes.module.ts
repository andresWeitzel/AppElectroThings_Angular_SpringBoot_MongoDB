import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoComponentesRoutingModule } from './listado-componentes-routing.module';
import { ListadoComponentesComponent } from './listado-componentes.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ListadoComponentesComponent,

  ],
  imports: [
    CommonModule,
    ListadoComponentesRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],

})
export class ListadoComponentesModule { }
