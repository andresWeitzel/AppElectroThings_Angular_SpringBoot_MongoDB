import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'listadoComponentes', loadChildren: () => import('./pages/electronica/listado-componentes/listado-componentes.module').then(m => m.ListadoComponentesModule) }, { path: 'agregarComponentes', loadChildren: () => import('./pages/electronica/agregar-componentes/agregar-componentes.module').then(m => m.AgregarComponentesModule) }, { path: 'editarComponentes', loadChildren: () => import('./pages/electronica/editar-componentes/editar-componentes.module').then(m => m.EditarComponentesModule) }, { path: 'listado-componentes', loadChildren: () => import('./pages/electronica/listado-componentes/listado-componentes.module').then(m => m.ListadoComponentesModule) }, { path: 'agregar-componentes', loadChildren: () => import('./pages/electronica/agregar-componentes/agregar-componentes.module').then(m => m.AgregarComponentesModule) }, { path: 'editar-componentes', loadChildren: () => import('./pages/electronica/editar-componentes/editar-componentes.module').then(m => m.EditarComponentesModule) }, { path: 'ayuda', loadChildren: () => import('./pages/utilidades/ayuda/ayuda.module').then(m => m.AyudaModule) }, { path: 'detalles-componentes', loadChildren: () => import('./pages/electronica/detalles-componentes/detalles-componentes.module').then(m => m.DetallesComponentesModule) }, { path: 'inicio-componentes', loadChildren: () => import('./pages/electronica/inicio-componentes/inicio-componentes.module').then(m => m.InicioComponentesModule) },{ path: 'novedades-componentes', loadChildren: () => import('./pages/electronica/novedades-componentes/novedades-componentes.module').then(m => m.NovedadesComponentesModule) }, { path: 'novedades-componentes', loadChildren: () => import('./pages/electronica/novedades-componentes/novedades-componentes.module').then(m => m.NovedadesComponentesModule) },
{path:'', loadChildren: () => import('./pages/electronica/inicio-componentes/inicio-componentes.module').then(m => m.InicioComponentesModule)},
{ path: 'graficos-componentes', loadChildren: () => import('./pages/electronica/graficos-componentes/graficos-componentes.module').then(m => m.GraficosComponentesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
