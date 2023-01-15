import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponentesComponent } from './listado-componentes.component';

const routes: Routes = [{ path: '', component: ListadoComponentesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListadoComponentesRoutingModule { }
