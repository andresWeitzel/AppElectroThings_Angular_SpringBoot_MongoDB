import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductoDTO } from 'src/app/models/producto-dto';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-agregar-componentes',
  templateUrl: './agregar-componentes.component.html',
  styleUrls: ['./agregar-componentes.component.scss']
})
export class AgregarComponentesComponent implements OnInit {


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
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private ngxService: NgxUiLoaderService

  ) {

    this.checkInputs();
  }



  ngOnInit(): void {


    this.checkIsAdmin();
    this.checkIsUser();
    this.checkSecurity();
    this.checkInputs();

  }




   //=========== SEGURIDAD ==============

   checkIsAdmin() {
    this.isAdmin = this.tokenService.isAdmin();
  }

  checkIsUser() {
    this.isUser = this.tokenService.isUser();
  }

  checkSecurity() {

       //SPIN LOADING
       this.ngxService.start();
       setTimeout(() => {
         this.ngxService.stop();
       }, 100);
       //FIN SPIN LOADING


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


  //========= VALIDATORS FORM ==========

  //===PATRONES====

  /*PATTERN LETRAS MINUS/MAYUSC, NUMEROS, GUIONES MEDIO Y ESPACIOS [a-zA-Z0-9.-\s]+ */

  /* PATTERN COMPLETO URL  /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png|pdf)/i */

  /* PATTERN  NUMEROS ENTEROS Y DECIMALES  /^[0-9]+\.?[0-9]*$/ VALIDAMOS CIFRAS Y DECIMAL CON step="0.01" */

  /* PATTERN  NUMEROS ENTEROS  [0-9]+ */


 /* PATTERN dd-mm-yyyy
 /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
*/

 /* PATTERN hh:mm
 /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
 */

//COMPROBAR EN PARALELO PRODUCTOENTITY VALIDATIONS.CONSTRAINTS
  checkInputs(): void {

    this.formGroup = new FormGroup({
      codigo: new FormControl(null,[
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(255),
          Validators.pattern(/[a-zA-Z0-9.-\s]+/),
      ]),
      nombre: new FormControl(null,[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
        Validators.pattern(/[a-zA-Z0-9.-\s]+/),
    ]),
    descripcion: new FormControl(null,[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(200),
      Validators.pattern(/[a-zA-Z0-9.-\s]+/),
  ]),

  categoria: new FormControl(null,[
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(100),
    Validators.pattern(/[a-zA-Z0-9.-\s]+/),
]),

marca: new FormControl(null,[
  Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
          Validators.pattern(/[a-zA-Z0-9.-\s]+/)
]),


imagen: new FormControl(null,[
  Validators.required,
  Validators.minLength(20),
  Validators.maxLength(600),
  Validators.pattern(
    /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png|pdf)/i
  ),
]),

hojaDatos: new FormControl(null,[
  Validators.required,
          Validators.minLength(20),
          Validators.maxLength(600),
          Validators.pattern(
            /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png|pdf)/i
          ),
]),


stock: new FormControl(null,[
  Validators.required,
  Validators.minLength(2),
  Validators.maxLength(5),
  Validators.min(10),
  Validators.max(10000),
  Validators.pattern(/[0-9]+/),
]),

precio: new FormControl(null,[
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(6),
  Validators.min(200),
  Validators.max(100000),
  Validators.pattern(/^[0-9]+\.?[0-9]*$/),
]),
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

  addProducto(): void {

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

    this.productoService.add(nuevoProducto).subscribe(
      (data) => {
        console.log(nuevoProducto);

        this.toast.success({
          detail: 'Operación Exitosa',
          summary: 'Se ha Insertado el Producto!!',
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
