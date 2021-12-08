import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-listado-componentes',
  templateUrl: './listado-componentes.component.html',
  styleUrls: ['./listado-componentes.component.css']
})
export class ListadoComponentesComponent implements OnInit {

  navigationExtras : NavigationExtras = {

      state : {
        value :null
      }
  };

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  // Métodos CRUD para los Componentes Electrónicos

  // Mostrar Productos
  detallesProducto(item : any): void{
    this.navigationExtras.state.value = item;
    this.router.navigate(['detalles-componentes' , this.navigationExtras]);
  }

  // Editar Productos
  editarProducto(item : any): void{
    this.navigationExtras.state.value = item;
    this.router.navigate(['editar-componentes' , this.navigationExtras]);
  }

  // Eliminar Productos
  eliminarProducto(item : any): void{
    alert('El Producto ha sido Eliminado');
  }
}
