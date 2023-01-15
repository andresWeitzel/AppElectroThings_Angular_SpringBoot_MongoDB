import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarComponentesComponent } from './editar-componentes.component';

const routes: Routes = [{ path: '', component: EditarComponentesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarComponentesRoutingModule { }
