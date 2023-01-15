import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesComponentesComponent } from './detalles-componentes.component';

const routes: Routes = [{ path: '', component: DetallesComponentesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetallesComponentesRoutingModule { }
