import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarComponentesRoutingModule } from './agregar-componentes-routing.module';
import { AgregarComponentesComponent } from './agregar-componentes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';


@NgModule({
  declarations: [
    AgregarComponentesComponent
  ],
  imports: [
    CommonModule,
    AgregarComponentesRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MdbValidationModule,

  ],
})
export class AgregarComponentesModule {}
