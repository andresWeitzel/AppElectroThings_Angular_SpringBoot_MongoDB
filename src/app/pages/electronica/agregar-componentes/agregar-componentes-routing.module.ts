import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponentesComponent } from './agregar-componentes.component';

const routes: Routes = [{ path: '', component: AgregarComponentesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarComponentesRoutingModule { }
