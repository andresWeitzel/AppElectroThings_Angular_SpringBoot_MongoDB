import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AyudaRoutingModule } from './ayuda-routing.module';
import { AyudaComponent } from './ayuda.component';


@NgModule({
  declarations: [
    AyudaComponent
  ],
  imports: [
    CommonModule,
    AyudaRoutingModule
  ]
})
export class AyudaModule { }
