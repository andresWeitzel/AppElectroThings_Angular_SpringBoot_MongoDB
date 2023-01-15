import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponentesComponent } from './inicio-componentes.component';

const routes: Routes = [{ path: '', component: InicioComponentesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioComponentesRoutingModule { }
