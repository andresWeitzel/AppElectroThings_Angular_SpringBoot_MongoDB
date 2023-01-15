import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProductoDTO } from 'src/app/models/producto-dto';
import { ProductosService } from 'src/app/services/productos/productos.service';

import { TokenService } from 'src/app/services/token/token.service';


@Component({
  selector: 'app-editar-componentes',
  templateUrl: './editar-componentes.component.html',
  styleUrls: ['./editar-componentes.component.scss']
})
export class EditarComponentesComponent implements OnInit{



    //Security
    roles: string[] = [];
    isAdmin = false;
    isUser = false;
    errMsj: string;

    //Campos Producto
  //id:number=null;
  codigo: string = '';
  nombre: string = '';
  descripcion: string = '';
  categoria: string = '';
  marca: string = '';
  imagen: string = '';
  hojaDatos: string = '';
  stock: number = null;
  precio: number = null;
  fecha: string = '';
  hora: string = '';

  //Products
  producto: ProductoDTO = null;

  formGroup: FormGroup;



  constructor(
    private router: Router,
    private productoService: ProductosService,
    private tokenService: TokenService,
    private toast: NgToastService,
    private formBuilder: FormBuilder

  ) {

    this.checkNavigation();
    this.initProductosForm();
  }



  ngOnInit(): void {

    this.checkIsAdmin();
    this.checkIsUser();
    this.checkSecurity();
    this.checkProducto();

  }




   //=========== SEGURIDAD ==============

   checkIsAdmin() {
    this.isAdmin = this.tokenService.isAdmin();
  }

  checkIsUser() {
    this.isUser = this.tokenService.isUser();
  }

  checkSecurity() {
    if (!this.isAdmin && !this.isUser) {
      this.router.navigate(['/login']);
    } else if (!this.isAdmin) {
      this.toast.error({
        detail: 'Operación No Autorizada',
        summary: 'Servicio Habilitado para administradores!!',
        duration: 2000,
      });

      setTimeout(() => {
        this.router.navigate(['/listado-componentes']);

        window.location.reload();
      }, 3000);
    }
  }


  //=========== PRODUCTO ==============
  checkNavigation() {
    const navegacionActual = this.router.getCurrentNavigation();

    this.producto = navegacionActual?.extras?.state?.['value'];
  }


  checkProducto() {
    //Si la data no esta definida redireccionamos, sino
    //cargamos el form
    if (typeof this.producto == 'undefined') {
      this.router.navigate(['/listado-componentes']);
    } else {
      this.codigo = this.producto.codigo;
      this.nombre = this.producto.nombre;
      this.descripcion = this.producto.descripcion;
      this.categoria = this.producto.categoria;
      this.marca = this.producto.marca;
      this.imagen = this.producto.imagen;
      this.hojaDatos = this.producto.hojaDatos;
      this.stock = this.producto.stock;
      this.precio = this.producto.precio;
    }
  }

  //========= VALIDATORS FORM ==========

  //Patrones
  /*PATTERN LETRAS MINUS/MAYUSC, NUMEROS, GUIONES MEDIO Y ESPACIOS [a-zA-Z0-9.-\s]+ */

  /* PATTERN COMPLETO URL /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i
  */

  /* PATTERN  NUMEROS ENTEROS Y DECIMALES  /^[0-9]+\.?[0-9]*$/ VALIDAMOS CIFRAS Y DECIMAL CON step="0.01" */

  /* PATTERN  NUMEROS ENTEROS  [0-9]+ */


 /* PATTERN dd-mm-yyyy
 /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
*/

 /* PATTERN hh:mm
 /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
 */



 //COMPROBAR EN PARALELO PRODUCTOENTITY VALIDATIONS.CONSTRAINTS

  initProductosForm(): void {
    //Inicializamos el objeto con las propiedades del producto seleccionado.

    this.formGroup = this.formBuilder.group({
      codigo: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(255),
          Validators.pattern(/[a-zA-Z0-9.-\s]+/),
        ],
      ],
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.pattern(/[a-zA-Z0-9.-\s]+/),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(200),
          Validators.pattern(/[a-zA-Z0-9.-\s]+/),
        ],
      ],
      categoria: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
          Validators.pattern(/[a-zA-Z0-9.-\s]+/),
        ],
      ],
      marca: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
          Validators.pattern(/[a-zA-Z0-9.-\s]+/),
        ],
      ],
      imagen: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(600),
          Validators.pattern(
            /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png|pdf)/i

          ),
        ],
      ],

      hojaDatos: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(600),
          Validators.pattern(
            /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png|pdf)/i

          ),
        ],
      ],

      stock: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(5),
          Validators.min(10),
          Validators.max(10000),
          Validators.pattern(/[0-9]+/),
        ],
      ],

      precio: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(6),
          Validators.min(200),
          Validators.max(100000),
          Validators.pattern(/^[0-9]+\.?[0-9]*$/),
        ],
      ],
    });
  }


  get codigoForm() {
    return this.formGroup.get('codigo');
  }

  get nombreForm() {
    return this.formGroup.get('nombre');
  }

  get descripcionForm() {
    return this.formGroup.get('descripcion');
  }

  get categoriaForm() {
    return this.formGroup.get('categoria');
  }
  get marcaForm() {
    return this.formGroup.get('marca');
  }
  get imagenForm() {
    return this.formGroup.get('imagen');
  }
  get hojaDatosForm() {
    return this.formGroup.get('hojaDatos');
  }
  get stockForm() {
    return this.formGroup.get('stock');
  }
  get precioForm() {
    return this.formGroup.get('precio');
  }




  //=============== UTILS ===============

  refresh() {
    window.location.reload();
  }

  //=========== METODOS CRUD ==============

  //----------ADD PRODUCTOS ---------------

  updateProducto(): void {
    const id = this.producto.id;

    const nuevoProducto = new ProductoDTO(
      this.codigo,
      this.nombre,
      this.descripcion,
      this.categoria,
      this.marca,
      this.imagen,
      this.hojaDatos,
      this.stock,
      this.precio,
      this.fecha,
      this.hora
    );

    //const id=this.producto.id;

    this.productoService.update(id, nuevoProducto).subscribe(
      (data) => {
        console.log(nuevoProducto);

        this.toast.success({
          detail: 'Operación Exitosa',
          summary: 'Se ha Actualizado el Producto!!',
          duration: 2000,
        });

        setTimeout(() => {
          this.router.navigate(['listado-componentes']);
        }, 2200);
      },
      (err) => {
        this.errMsj = err.error.message;

        console.log(this.errMsj);

        this.toast.error({
          detail: 'Error',
          summary: this.errMsj,
          duration: 2000,
        });
      }
    );
  }
}

