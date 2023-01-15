import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcercaProductosRoutingModule } from './acerca-productos-routing.module';
import { AcercaProductosComponent } from './acerca-productos.component';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';


@NgModule({
  declarations: [
    AcercaProductosComponent
  ],
  imports: [
    CommonModule,
    AcercaProductosRoutingModule,
    MdbScrollspyModule
  ]
})
export class AcercaProductosModule { }
