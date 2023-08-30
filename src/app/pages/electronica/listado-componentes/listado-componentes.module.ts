import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoComponentesRoutingModule } from './listado-componentes-routing.module';
import { ListadoComponentesComponent } from './listado-componentes.component';
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
