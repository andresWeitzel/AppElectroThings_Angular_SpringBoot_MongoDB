import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NovedadesComponentesComponent } from './novedades-componentes.component';

const routes: Routes = [{ path: '', component: NovedadesComponentesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NovedadesComponentesRoutingModule { }
