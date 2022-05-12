import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficosComponentesRoutingModule } from './graficos-componentes-routing.module';
import { GraficosComponentesComponent } from './graficos-componentes.component';

import { HighchartsChartModule } from 'highcharts-angular';




@NgModule({
  declarations: [
    GraficosComponentesComponent
  ],
  imports: [
    CommonModule,
    GraficosComponentesRoutingModule,
    HighchartsChartModule
  ]
})
export class GraficosComponentesModule { }
