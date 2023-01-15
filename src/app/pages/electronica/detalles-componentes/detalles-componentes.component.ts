import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductoDTO } from 'src/app/models/producto-dto';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { TokenService } from 'src/app/services/token/token.service';

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




  //PRODUCTO
  producto:ProductoDTO = null;


//PRODUCTO SELECCIONADO
productoSelect:ProductoDTO[] = [];
idProdSelect:string='';
codProdSelect:string='';
nombrProdSelect:string='';


//SEGURIDAD
roles: string[]=[];
isAdmin = false;
isUser = false;


//ERRORES
errMsj: string;






  constructor(
    private router: Router,
    private productoService:ProductosService,
    private toast: NgToastService,
    private ngxService: NgxUiLoaderService,

  ) {

    const navegacionActual = this.router.getCurrentNavigation();

    this.producto = navegacionActual?.extras?.state?.value;


  }

  ngOnInit(): void {

    if(typeof this.producto == 'undefined'){
      this.router.navigate(['listado-componentes']);
  }else{
    this.router.navigate(['detalles-componentes'] , this.navigationExtras);
  }


  }

 //=========== SEGURIDAD ==============
  //Aplicada en productos.guard y agregada en el routing


  //=============== CRUD ===============

//----------EDITAR PRODUCTOS ---------------
editarProducto(producto : any): void{
  //SPIN LOADING
  this.ngxService.start();
  setTimeout(() => {
    this.ngxService.stop();
  }, 100);
  //FIN SPIN LOADING


this.navigationExtras.state['value'] = producto;
this.router.navigate(['editar-componentes'] , this.navigationExtras);
}




//----------ELIMINAR PRODUCTOS ---------------
eliminarProducto(id : string): void{

  //SPIN LOADING
  this.ngxService.start();
  setTimeout(() => {
    this.ngxService.stop();
  }, 100);
  //FIN SPIN LOADING


  this.productoService.delete(id).subscribe(
    (data:any)=>{

      this.toast.success({detail:"Operación Exitosa",summary:'Se ha Eliminado el Producto!!', duration:2000});

      console.log("Producto Eliminado");

      setTimeout(() => {
        this.refresh();
       }, 2100)
    },
    err => {
      this.errMsj = err.error.message;

      //TOAST ERROR
      setTimeout(() => {
       this.toast.error({detail:"ERROR",summary:this.errMsj , duration:2000});
     }, 600);
     //FIN TOAST ERROR
   console.log(err);
    }
  );

}



//----------ELIMINAR PRODUCTOS ---------------
eliminarProductoNoAuth(id : number): void{

  //SPIN LOADING
  this.ngxService.start();
  setTimeout(() => {
    this.ngxService.stop();
  }, 100);
  //FIN SPIN LOADING



  this.toast.error({detail:"Operación No Autorizada",summary:'Servicio Habilitado para administradores!!', duration:2000});


      setTimeout(() => {
        this.refresh();
       }, 2100)


}





//=============== UTILS ===============

//---------------- RECARGAR -------------------
refresh(){
  window.location.reload();
  }

  //------------- REDIRECCIONAR -------------------
  redirect(page:String){
    this.router.navigate([page]);
  }


  //-----------  ID PRODUCTO SELECT-------------

setProductoSelect(producto:ProductoDTO){

  this.idProdSelect = producto.id;
  this.codProdSelect=producto.codigo;
  this.nombrProdSelect=producto.nombre;

  console.log('Producto Seleccionado: ',producto);
  }





}
