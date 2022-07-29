import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoComponentesRoutingModule } from './listado-componentes-routing.module';
import { ListadoComponentesComponent } from './listado-componentes.component';
import { CarouselModule } from 'src/app/components/carousel/carousel.module';
import { CarouselComponent } from 'src/app/components/carousel/carousel.component';


@NgModule({
  declarations: [
    ListadoComponentesComponent,

  ],
  imports: [
    CommonModule,
    ListadoComponentesRoutingModule,

  ]
})
export class ListadoComponentesModule { }
