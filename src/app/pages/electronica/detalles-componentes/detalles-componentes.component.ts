import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ProductoDTO } from 'src/app/models/producto-dto';

@Component({
  selector: 'app-detalles-componentes',
  templateUrl: './detalles-componentes.component.html',
  styleUrls: ['./detalles-componentes.component.scss']
})
export class DetallesComponentesComponent implements OnInit {

  navigationExtras : NavigationExtras = {

    state : {
      value :null
    }
};



  //Aplicamos la interfaz creada Producto
  testData:ProductoDTO = null;

  constructor(private router: Router) {

    const navegacionActual = this.router.getCurrentNavigation();

    this.testData = navegacionActual?.extras?.state?.value;


  }

  ngOnInit(): void {


    if(typeof this.testData == 'undefined'){
      this.router.navigate(['listado-componentes']);
  }else{
    this.router.navigate(['detalles-componentes'] , this.navigationExtras);
  }


  }

  //Regresar Listado Productos
  regresarListadoProductos():void{
    this.router.navigate(['listado-componentes']);
  }


  // Editar Productos
  editarProducto(): void{
    //Redirijimos si tenemos un producto vacio
    if(typeof this.testData == 'undefined'){
        this.router.navigate(['listado-componentes']);
    }else{
      this.navigationExtras.state.value = this.testData;
      this.router.navigate(['editar-componentes'] , this.navigationExtras);
  }
  }

  // Eliminar Productos
  eliminarProducto(): void{
    //Redirijimos si tenemos un producto vacio
    if(typeof this.testData == 'undefined'){
      this.router.navigate(['listado-componentes']);
  }else{
    alert('El Producto ha sido Eliminado');
}


  }




}
