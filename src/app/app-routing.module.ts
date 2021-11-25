import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'listadoComponentes', loadChildren: () => import('./pages/electronica/listado-componentes/listado-componentes.module').then(m => m.ListadoComponentesModule) }, { path: 'agregarComponentes', loadChildren: () => import('./pages/electronica/agregar-componentes/agregar-componentes.module').then(m => m.AgregarComponentesModule) }, { path: 'editarComponentes', loadChildren: () => import('./pages/electronica/editar-componentes/editar-componentes.module').then(m => m.EditarComponentesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
