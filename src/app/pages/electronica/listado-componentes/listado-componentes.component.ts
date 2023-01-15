import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ProductoDTO } from 'src/app/models/producto-dto';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { DolarService } from 'src/app/services/dolar/dolar.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { TokenService } from 'src/app/services/token/token.service';





//Excel
import * as XLSX from 'xlsx';

//PDFs
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-listado-componentes',
  templateUrl: './listado-componentes.component.html',
  styleUrls: ['./listado-componentes.component.scss'],
})
export class ListadoComponentesComponent implements OnInit {
  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };




  //PRODUCTOS LISTADO
  productos: ProductoDTO[] = [];

  //Ultimo Producto
  lastProducto : ProductoDTO[]=[];

  //Select Producto
  precioProducto:number=0;

  //DOLAR
  dolarCompra:number=0;
  dolarVenta:number=0;


  //Conversion
  converDolarPeso:number=0;


  //PRODUCTO SELECCIONADO
  productoSelect: ProductoDTO[] = [];
  idProdSelect: string = '';
  codProdSelect: string = '';
  nombrProdSelect: string = '';

  //FILTRO BUSQUEDA PRODUCTOS
  filtroProdBusqueda: string = '';
  filtroProdCampo: string = '';


  //SEGURIDAD
  isAdmin = false;
  isUser = false;

  //TYPE LIST
  typeListTable = true;

  //PAGINADO
  nroPage = 0;
  isFirstPage = false;
  isLastPage = false;
  totalPages = 0;

  //Elements
  nroElements = 10;
  nroCurrentElements = 0;
  nroTotalElements = 0;


  //Caracteristicas
  orderBy = 'id';
  direction = 'asc';

  //ERRORES
  errMsj: string;

  constructor(
    private router: Router,
    private productoService: ProductosService,
    private dolarService :DolarService,
    private tokenService: TokenService,
    private toast: NgToastService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit() {
    this.getDolarCompra();
    this.getDolarVenta();
    this.listarProductos();
    this.listarLastProducto();
    this.checkEliminarProducto();
  }

  //=========== SEGURIDAD ==============
  //Aplicada en productos.guard y agregada en el routing

  //=========== METODOS CRUD ==============

  //----------LISTADO PRODUCTOS ---------------
  listarProductos() {
    this.productoService
      .listado(this.nroPage, this.nroElements, this.orderBy, this.direction)
      .subscribe(
        (data: any) => {
          this.productos = data.content;
          this.isFirstPage = data.first;
          this.isLastPage = data.last;
          this.totalPages = data.totalPages;
          this.nroCurrentElements = data.numberOfElements;
          this.nroTotalElements = data.totalElements;
        },
        (err) => {

          this.errMsj = err.error.message;

          //TOAST ERROR
          setTimeout(() => {
            this.toast.error({
              detail: 'ERROR',
              summary: this.errMsj,
              duration: 2000,
            });
          }, 600);

          //FIN TOAST ERROR
          //console.log(err);
          //console.log('listado');

          this.refresh(3000);
        }
      );
  }

  //----------ULTIMO PRODUCTO ---------------
  listarLastProducto() {
    this.productoService
      .listado(((this.totalPages)), ((this.nroTotalElements)-(this.nroTotalElements -1)), this.orderBy, this.direction)
      .subscribe(
        (data: any) => {
          this.lastProducto = data.content;
          console.log('Ultimo Producto',this.lastProducto);
          console.log(this.totalPages);
        },
        (err) => {

          this.errMsj = err.error.message;

          //TOAST ERROR
          setTimeout(() => {
            this.toast.error({
              detail: 'ERROR',
              summary: this.errMsj,
              duration: 2000,
            });
          }, 600);

          //FIN TOAST ERROR
          //console.log(err);
          //console.log('listado');

          this.refresh(3000);
        }
      );
  }

  //-----LISTADO PRODUCTOS FILTER/CAMPO ---------------
  listarProductosFilter() {
    this.productoService
      .listadoFilterAndField(
        this.filtroProdCampo,
        this.filtroProdBusqueda,
        this.nroPage,
        this.nroElements,
        this.orderBy,
        this.direction
      )
      .subscribe(
        (data: any) => {
          this.productos = data.content;
          this.isFirstPage = data.first;
          this.isLastPage = data.last;
          this.totalPages = data.totalPages;
          this.nroCurrentElements = data.numberOfElements;
          this.nroTotalElements = data.totalElements;

          //console.log(this.productos);
        },
        (err) => {
          this.errMsj = err.error.message;

          //TOAST ERROR
          setTimeout(() => {
            this.toast.error({
              detail: 'ERROR',
              summary: this.errMsj,
              duration: 2000,
            });
          }, 600);

          //FIN TOAST ERROR
          //console.log(err);
          //console.log('listado-filter');

          this.refresh(3000);
        }
      );
  }



  setFilter(filtro: string, campo: string, nroPag:number) {


    this.filtroProdCampo = '';
    this.filtroProdBusqueda = '';

    if (filtro === '' || filtro === null || campo === '' || campo === null) {
      this.listarProductos();
      this.listarLastProducto();
    } else {

      this.filtroProdCampo = campo;
      this.filtroProdBusqueda = filtro;
      this.nroPage = nroPag;

      this.listarProductosFilter();
      this.listarLastProducto();
    }
  }


  //----------GET DOLAR COMPRA------------
  getDolarCompra() {
    this.dolarService
      .getDolarCompra()
      .then(obj => this.dolarCompra = obj.replace(/,/g, '.'));

  }
  //----------GET DOLAR VENTA------------
  getDolarVenta() {
    this.dolarService
      .getDolarVenta()
      .then(obj => this.dolarVenta = obj.replace(/,/g, '.'));

  }

  //----------DETALLES PRODUCTOS ---------------
  detalleProducto(producto: any): void {

    this.spinLoader(100);

    this.navigationExtras.state['value'] = producto;
    this.router.navigate(['detalles-componentes'], this.navigationExtras);
  }

  //----------EDITAR PRODUCTOS ---------------
  editarProducto(producto: any): void {

    this.spinLoader(100);

    this.navigationExtras.state['value'] = producto;
    this.router.navigate(['editar-componentes'], this.navigationExtras);
  }

   //----------SELECCIONAR PRODUCTO ---------------
   selectPrecioProducto(producto: number): void {

   this.precioProducto = producto;
  }


  //----------CHECK ELIMINAR PRODUCTO----------
  checkEliminarProducto() {
    this.isAdmin = this.tokenService.isAdmin();
  }

  //----------ELIMINAR PRODUCTOS ---------------
  eliminarProducto(id: string): void {

    this.spinLoader(100);

    this.productoService.delete(id).subscribe(
      (data: any) => {

        this.toast.success({
          detail: 'Operación Exitosa',
          summary: 'Se ha Eliminado el Producto!!',
          duration: 2000,
        });

        console.log('Producto Eliminado');

        this.refresh(2100);
      },
      (err) => {
        this.errMsj = err.error.message;

        //TOAST ERROR
        setTimeout(() => {
          this.toast.error({
            detail: 'ERROR',
            summary: this.errMsj,
            duration: 2000,
          });
        }, 600);
        //FIN TOAST ERROR
        console.log(this.errMsj);
      }
    );
  }

  //----------ELIMINAR PRODUCTOS ---------------
  eliminarProductoNoAuth(id: number): void {

    this.spinLoader(100);

    this.toast.error({
      detail: 'Operación No Autorizada',
      summary: 'Servicio Habilitado para administradores!!',
      duration: 2000,
    });

    this.refresh(2100);
  }









  //=============== UTILS ===============

  //---------------- RECARGAR -------------------
  refresh(ms: number) {
    setTimeout(() => {
      window.location.reload();
    }, ms);
  }

  //---------- RUEDA DE CARGA ------------
   spinLoader(ms: number) {
    //SPIN LOADING
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, ms);
    //FIN SPIN LOADING
  }

  //------------- REDIRECCIONAR -------------------
  redirect(page: String) {
    this.router.navigate([page]);
  }

  //-----------  ID PRODUCTO SELECT-------------

  setProductoSelect(producto: ProductoDTO) {
    this.idProdSelect = producto.id;
    this.codProdSelect = producto.codigo;
    this.nombrProdSelect = producto.nombre;

    console.log('Producto Seleccionado: ', producto);
  }

  //------------TYPE LIST ---------------
  setTypeListTable(set:boolean){
    this.typeListTable = set;
  }


//============= GENERATE EXCEL ====================
nameExcell = 'listaComponentes.xlsx';

generateExcel(): void {

    //TOAST SUCCESS
    setTimeout(() => {
      this.toast.success({
        detail: 'SUCCESS',
        summary: 'Descargando Archivo .xlsx!!',
        duration: 2000,
      });
    }, 600);
    //FIN TOAST SUCCESS


  let element = document.getElementById('table');

  const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

  //eliminamos columnas
  delete(worksheet['F1']);

  delete(worksheet['G1']);
  delete(worksheet['K1']);

  //ej reemplazamos por vacio
    /*
   //Reemplazamos el campo imagen por vacio
   XLSX.utils.sheet_add_aoa(worksheet, [['']], { origin: "F1" });
  */


  const book: XLSX.WorkBook = XLSX.utils.book_new();


  XLSX.utils.book_append_sheet(book, worksheet);



  //Agregamos paginado
  XLSX.utils.sheet_add_aoa(worksheet, [['NRO PAGINA']], { origin: "L1" });

  XLSX.utils.sheet_add_aoa(worksheet, [[this.nroPage+'/'+this.totalPages]], { origin: "L2" });

  XLSX.utils.sheet_add_aoa(worksheet, [['NRO ELEMENTOS']], { origin: "M1" });

  XLSX.utils.sheet_add_aoa(worksheet, [[this.nroCurrentElements+'/'+this.nroTotalElements]], { origin: "M2" });


  XLSX.writeFile(book, this.nameExcell);
}

 //============= GENERATE CSV ====================
 nameCsv = 'listaComponentes.csv';

 generateCsv(): void {


      //TOAST SUCCESS
      setTimeout(() => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Descargando Archivo .csv!!',
          duration: 2000,
        });
      }, 600);
      //FIN TOAST SUCCESS

   let element = document.getElementById('table');

   const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    //eliminamos columnas
  delete(worksheet['F1']);


  delete(worksheet['G1']);
  delete(worksheet['K1']);

  //ej reemplazamos por vacio
    /*
   //Reemplazamos el campo imagen por vacio
   XLSX.utils.sheet_add_aoa(worksheet, [['']], { origin: "F1" });
  */


   const book: XLSX.WorkBook = XLSX.utils.book_new();


   XLSX.utils.book_append_sheet(book, worksheet);


   XLSX.utils.sheet_to_csv;


   XLSX.writeFile(book, this.nameCsv);
 }




 //============= GENERATE PDF ====================
 namePdf = 'listaComponentes.pdf';

 generatePdf(): void {


    //TOAST SUCCESS
    setTimeout(() => {
      this.toast.success({
        detail: 'SUCCESS',
        summary: 'Descargando Archivo .pdf!!',
        duration: 2000,
      });
    }, 600);
    //FIN TOAST SUCCESS



  //Admitimos img
  const options = { logging: true, letterRendering: true, useCORS: true };

  let DATA: any = document.getElementById('table');



  html2canvas(DATA, options).then((canvas) => {
    let fileWidth = 208;

    let fileHeight = (canvas.height * fileWidth) / canvas.width;
    const FILEURI = canvas.toDataURL('image/png');
    let PDF = new jsPDF('p', 'mm', 'a4');

    let position = 0;



    PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    PDF.save(this.namePdf);
  });

}

  //=========== METODOS PAGINACION ==============

  //Ordenar los registros por type
  orderByDirection(type: string, direct: string): void {
    this.orderBy = type;
    this.direction = direct;

    if (this.filtroProdBusqueda === '' || this.filtroProdBusqueda === null) {
      this.listarProductos();
    } else {
      this.listarProductosFilter();
    }
  }

  //Pagina Anterior
  paginaAnterior(): void {

      if (this.nroPage != 0 && this.nroPage > 0) {
        this.nroPage--;
        this.listarProductos();
      } else {
        //TOAST ERROR
        setTimeout(() => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'No es Posible Disminuir una Página!!',
            duration: 2000,
          });
        }, 600);
        //FIN TOAST ERROR
      }

  }

  //Pagina Anterior
  paginaSiguiente(): void {

      if (!this.isLastPage && this.nroPage >= 0) {
        this.nroPage++;
        this.listarProductos();
      } else {
        //TOAST ERROR
        setTimeout(() => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'No es Posible Aumentar una Página!!',
            duration: 2000,
          });
        }, 600);
        //FIN TOAST ERROR
      }

  }

  cambiarPagina(pagina: number): void {

    this.nroPage = pagina;

    if (this.filtroProdBusqueda === '' || this.filtroProdBusqueda === null) {
      this.listarProductos();
    } else {
     this.listarProductosFilter();
    }
  }

  //=============== PRODUCTOS POR GRUPO =============
  countProdByGroup(): void {
    //this.nroProdAgua = this.productos.find.g
  }
}
