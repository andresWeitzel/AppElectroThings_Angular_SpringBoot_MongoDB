import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatallesComponentesComponent } from './datalles-componentes.component';

const routes: Routes = [{ path: '', component: DatallesComponentesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatallesComponentesRoutingModule { }
