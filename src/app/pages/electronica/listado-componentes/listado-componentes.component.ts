import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-componentes',
  templateUrl: './listado-componentes.component.html',
  styleUrls: ['./listado-componentes.component.css']
})
export class ListadoComponentesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // Métodos CRUD para los Componentes Electrónicos

  // Mostrar Productos
  detallesProducto(item : any): void{
    this.router.navigate(['detalles-componentes']);
  }

  // Editar Productos
  editarProducto(item : any): void{
    this.router.navigate(['editar-componentes']);
  }

  // Eliminar Productos
  eliminarProducto(item : any): void{
    alert('El Producto ha sido Eliminado');
  }
}
