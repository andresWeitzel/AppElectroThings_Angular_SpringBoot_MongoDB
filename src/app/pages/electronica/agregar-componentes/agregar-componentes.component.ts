import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoDTO } from 'src/app/models/producto-dto';

@Component({
  selector: 'app-agregar-componentes',
  templateUrl: './agregar-componentes.component.html',
  styleUrls: ['./agregar-componentes.component.css']
})
export class AgregarComponentesComponent implements OnInit {

  testData: ProductoDTO = null

  testDataFormulario : FormGroup;

  constructor(private router : Router , private formBuilder:FormBuilder) {

    const navegacionActual = this.router.getCurrentNavigation();

    this.testData = navegacionActual?.extras?.state?.value;

    this.initTestDataFormulario();
  }



  ngOnInit(): void {



      this.testDataFormulario.patchValue(this.testData)

  }


  //Agregar Producto
  addProducto():void{
    console.log("PRODUCTO AGREGADO CORRECTAMENTE");
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
