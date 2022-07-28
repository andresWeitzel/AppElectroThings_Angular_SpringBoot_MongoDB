import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ProductoDTO } from 'src/app/models/producto-dto';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { TokenService } from 'src/app/services/token/token.service';

//Excell
import * as XLSX from 'xlsx';

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
//PRODUCTOS LISTADO
productos: ProductoDTO[] = [];

//PRODUCTO SELECCIONADO
productoSelect:ProductoDTO[] = [];
idProdSelect:string='';
codProdSelect:string='';
nombrProdSelect:string='';

//Cantidad de Productos por Grupos
nroProdAgua=3;

//FILTRO BUSQUEDA PRODUCTOS
filtroProdBusqueda:string='';

//SEGURIDAD
roles: string[]=[];
isAdmin = false;
isUser = false;

 //PAGINADO

 //Pages
 nroPage=0;
 isFirstPage=false;
 isLastPage=false;
 totalPages=0;

 //Elements
 nroElements=10;
 nroCurrentElements=0;
 nroTotalElements=0;

//Caracteristicas
 orderBy='id';
 direction='asc';

//ERRORES
 errMsj: string;



constructor(
  private router: Router,
  private productoService:ProductosService,
  private tokenService:TokenService,
  private toast: NgToastService,
  private ngxService: NgxUiLoaderService,

) { }

ngOnInit(){

  this.checkRoles();
  this.checkSecurity();

}

//=========== SEGURIDAD ==============

checkRoles(){
  this.roles = this.tokenService.getAuthorities();
  this.roles.forEach(
    rol=>{
      if(rol=='ROLE_ADMIN'){
        this.isAdmin=true;
        //console.log(this.isAdmin);
      }

      if(rol=='ROLE_USER'){
        this.isUser=true;
        //console.log(this.isUser);
      }

    });
}

checkSecurity(){
  if(!(this.isAdmin) && !(this.isUser)){
    this.router.navigate(['login']);
  }else{
    this.listarProductos();
  }
}


//=========== METODOS CRUD ==============

//----------LISTADO PRODUCTOS ---------------
listarProductos(){
this.productoService.listado(this.nroPage,this.nroElements,this.orderBy,this.direction).subscribe(
  (data:any)=>{
    this.productos = data.content;
    this.isFirstPage = data.first;
    this.isLastPage = data.last;
    this.totalPages = data.totalPages;
    this.nroCurrentElements = data.numberOfElements;
    this.nroTotalElements = data.totalElements;

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

//----------LISTADO PRODUCTOS FILTER ---------------
listarProductosFilter(){
this.productoService.listadoFilter(this.filtroProdBusqueda,this.nroPage,this.nroElements,this.orderBy,this.direction).subscribe(
  (data:any)=>{
    this.productos = data.content;
    this.isFirstPage = data.first;
    this.isLastPage = data.last;
    this.totalPages = data.totalPages;
    this.nroCurrentElements = data.numberOfElements;
    this.nroTotalElements = data.totalElements;


    //console.log(this.productos);
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


setFilter(filtro:string){
if(filtro === '' || filtro === null){

this.listarProductos();
}else{

this.filtroProdBusqueda=filtro;

//console.log(this.filtroProdBusqueda);

this.listarProductosFilter();


}
}





//----------EDITAR PRODUCTOS ---------------
editarProducto(producto : any): void{
          //SPIN LOADING
          this.ngxService.start();
          setTimeout(() => {
            this.ngxService.stop();
          }, 100);
          //FIN SPIN LOADING


  this.navigationExtras.state['value'] = producto;
  this.router.navigate(['editar-productos'] , this.navigationExtras);
}



//----------ELIMINAR PRODUCTOS ---------------
eliminarProducto(id : number): void{

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

refresh(){
window.location.reload();
}

//-----------  ID PRODUCTO SELECT-------------

setProductoSelect(producto:ProductoDTO){

this.idProdSelect = producto.id;
this.codProdSelect=producto.codigo;
this.nombrProdSelect=producto.nombre;

console.log('Producto Seleccionado: ',producto);
}




//=========== METODOS PAGINACION ==============

//Ordenar los registros por type
orderByDirection(type:string,direct:string):void{
this.orderBy = type;
this.direction = direct;

if(this.filtroProdBusqueda === ''
|| this.filtroProdBusqueda === null){

  this.listarProductos();
}else{

  this.listarProductosFilter();

}
}


//Pagina Anterior
paginaAnterior():void{

if(this.filtroProdBusqueda === ''
|| this.filtroProdBusqueda === null){

if(!this.isFirstPage){
  this.nroPage--;
  this.listarProductos();

}else{

  this.listarProductosFilter();
}
}
}

//Pagina Anterior
paginaSiguiente():void{
  if(this.filtroProdBusqueda === ''
  || this.filtroProdBusqueda === null){

  if(!this.isLastPage){
    this.nroPage++;
    this.listarProductos();

  }else{

    this.listarProductosFilter();
  }
  }
}


cambiarPagina(pagina:number):void{
  this.nroPage=pagina;

  if(this.filtroProdBusqueda === ''
  || this.filtroProdBusqueda === null){

    this.listarProductos();
  }else{

    this.listarProductosFilter();
  }

}

//============= GENERATE EXCEL ====================
name = 'listaProductos.xlsx';

generateExcel(): void {
  let element = document.getElementById('table');
  const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

  const book: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

  XLSX.writeFile(book, this.name);
}



//=============== PRODUCTOS POR GRUPO =============
countProdByGroup():void{

  //this.nroProdAgua = this.productos.find.g

}


  }


