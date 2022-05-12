import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficosComponentesComponent } from './graficos-componentes.component';

const routes: Routes = [{ path: '', component: GraficosComponentesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficosComponentesRoutingModule { }
