import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-detalles-componentes',
  templateUrl: './detalles-componentes.component.html',
  styleUrls: ['./detalles-componentes.component.css']
})
export class DetallesComponentesComponent implements OnInit {

  navigationExtras : NavigationExtras = {

    state : {
      value :null
    }
};




  valorProducto = null;

  constructor(private router: Router) {

    const navegacionActual = this.router.getCurrentNavigation();

    this.valorProducto = navegacionActual?.extras?.state;


  }

  ngOnInit(): void {
  }

  //Regresar Listado Productos
  regresarListadoProductos():void{
    this.router.navigate(['listado-componentes']);
  }


  // Editar Productos
  editarProducto(): void{
    this.navigationExtras.state.value = this.valorProducto;
    this.router.navigate(['editar-componentes'] , this.navigationExtras);
  }

  // Eliminar Productos
  eliminarProducto(): void{
    alert('El Producto ha sido Eliminado');
  }




}
