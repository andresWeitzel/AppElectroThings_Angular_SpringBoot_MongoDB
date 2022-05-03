import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProducto } from 'src/app/shared/models/iproducto.interface';

@Component({
  selector: 'app-editar-componentes',
  templateUrl: './editar-componentes.component.html',
  styleUrls: ['./editar-componentes.component.css']
})
export class EditarComponentesComponent implements OnInit {

  testData: IProducto = null

  testDataFormulario : FormGroup;

  constructor(private router : Router , private formBuilder:FormBuilder) {

    const navegacionActual = this.router.getCurrentNavigation();

    this.testData = navegacionActual?.extras?.state?.value;

    this.initTestDataFormulario();
  }



  ngOnInit(): void {


    //Colocamos los valores en el form
    //Si la data no esta definida redireccionamos, sino
    //cargamos el form
    if(typeof this.testData == 'undefined'){
        this.router.navigate(['listado-componentes']);
    }else{
      this.testDataFormulario.patchValue(this.testData)
    }
  }


  //Agregar Producto
  addProducto():void{
    console.log("PRODUCTO EDITADO CORRECTAMENTE");
  }

  //Inicializar Formulario con los datos del registro seleccionado
  private initTestDataFormulario(): void{

    //Inicializamos el objeto con las propiedades de nuestro producto.Aca podemos usar patrones regex, pero ya lo aplicamos en la Vista
    this.testDataFormulario = this.formBuilder.group({
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
