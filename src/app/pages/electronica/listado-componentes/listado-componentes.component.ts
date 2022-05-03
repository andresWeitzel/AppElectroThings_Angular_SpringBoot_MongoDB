import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IProducto } from 'src/app/shared/models/iproducto.interface';

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

testData  =[
{
  id: 1,
  codigo:'5095-MCU-65788',
  nombre:'MCU-ESP32',
  descripcion:'Módulo WIFI MCU-ESP32',
  categoria : 'Microcontroladores',
  marca: 'generica',
  hojaDatos : 'https://www.todomicro.com.ar/6038-large_default/modulo-de-desarrollo-nodemcu-lua-esp8266.jpg',
  stock : 100,
  precio : 1600

},
{
  id :2,
  codigo : '29-LLP-78296',
  nombre: 'Teclado Gamer',
  descripcion : 'Teclado Gamer HP',
  categoria : 'Gamer',
  marca : 'HP',
  hojaDatos : 'https://www.todomicro.com.ar/6038-large_default/modulo-de-desarrollo-nodemcu-lua-esp8266.jpg'
  ,stock : 50,
  precio : 4500
}

]





  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  // Métodos CRUD para los Componentes Electrónicos

  // Mostrar Productos
  detallesProducto(producto : any): void{
    this.navigationExtras.state.value = producto;
    this.router.navigate(['detalles-componentes'] , this.navigationExtras);
  }

  // Editar Productos
  editarProducto(producto : any): void{
    this.navigationExtras.state.value = producto;
    this.router.navigate(['editar-componentes'] , this.navigationExtras);
  }

  // Eliminar Productos
  eliminarProducto(producto : any): void{
    alert('El Producto ha sido Eliminado');
  }
}
