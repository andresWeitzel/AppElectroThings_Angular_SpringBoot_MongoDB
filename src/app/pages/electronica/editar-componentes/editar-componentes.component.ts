import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoDTO } from 'src/app/models/producto-dto';


@Component({
  selector: 'app-editar-componentes',
  templateUrl: './editar-componentes.component.html',
  styleUrls: ['./editar-componentes.component.scss']
})
export class EditarComponentesComponent implements OnInit{

  productos: ProductoDTO = null

  productosFormulario : FormGroup;

  constructor(private router : Router , private formBuilder:FormBuilder) {

    const navegacionActual = this.router.getCurrentNavigation();

    this.productos = navegacionActual?.extras?.state?.value;

    this.initproductosFormulario();
  }



  ngOnInit(): void {


    //Colocamos los valores en el form
    //Si la data no esta definida redireccionamos, sino
    //cargamos el form
    if(typeof this.productos == 'undefined'){
        this.router.navigate(['listado-componentes']);
    }else{
      this.productosFormulario.patchValue(this.productos)
    }
  }


  //Agregar Producto
  addProducto():void{
    console.log("PRODUCTO AGREGADO CORRECTAMENTE");
  }

  //Inicializar Formulario con los datos del registro seleccionado
  private initproductosFormulario(): void{

    //Inicializamos el objeto con las propiedades de nuestro producto.Aca podemos usar patrones regex, pero ya lo aplicamos en la Vista
    this.productosFormulario = this.formBuilder.group({
        codigo : ['' , [Validators.required]],
        nombre : ['' , [Validators.required]],
        descripcion : ['' , [Validators.required]],
        categoria : ['' , [Validators.required]],
        marca : ['' , [Validators.required]],
        imagen : ['' , [Validators.required]],
        hojaDatos : ['' , [Validators.required]],
        stock : ['' , [Validators.required]],
        precio : ['' , [Validators.required]],
        fecha : ['' , [Validators.required]],
        hora : ['' , [Validators.required]],

    });
  }


}

