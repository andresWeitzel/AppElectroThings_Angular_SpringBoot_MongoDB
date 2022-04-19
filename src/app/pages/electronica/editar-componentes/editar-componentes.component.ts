import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-componentes',
  templateUrl: './editar-componentes.component.html',
  styleUrls: ['./editar-componentes.component.css']
})
export class EditarComponentesComponent implements OnInit {

  producto = null

  productoFormulario : FormGroup;

  constructor(private router : Router , private formBuilder:FormBuilder) {

    const navegacionActual = this.router.getCurrentNavigation();

    this.producto = navegacionActual?.extras?.state;
  }



  ngOnInit(): void {
    this.initProductoFormulario();
  }


  //Agregar Producto
  addProducto():void{
    console.log("PRODUCTO AGREGADO CORRECTAMENTE");
  }

  //Inicializar Formulario con los datos del registro seleccionado
  private initProductoFormulario(): void{

    //Inicializamos el objeto con las propiedades de nuestro producto.Aca podemos usar patrones regex, pero ya lo aplicamos en la Vista
    this.productoFormulario = this.formBuilder.group({
        codigo : ['' , [Validators.required]],
        nombre : ['' , [Validators.required]],
        descripcion : ['' , [Validators.required]],
        categoria : ['' , [Validators.required]],
        marca : ['' , [Validators.required]],
        hojaDatos : ['' , [Validators.required]],
        stock : ['' , [Validators.required]],
        precio : ['' , [Validators.required]],

    });
  }

}
