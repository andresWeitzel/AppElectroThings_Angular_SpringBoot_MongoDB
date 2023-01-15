import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcercaProductosComponent } from './acerca-productos.component';

const routes: Routes = [{ path: '', component: AcercaProductosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcercaProductosRoutingModule { }
