//External
import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
//Models
import { ProductoDTO } from "src/app/models/producto-dto";
//Services
import { ProductosService } from "src/app/services/productos/productos.service";
import { DolarService } from "src/app/services/dolar/dolar.service";
import { TokenService } from "src/app/services/token/token.service";
import { GenerateFilesService } from "src/app/services/utilities/generate-files.service";
import { ToastNotificationService } from "src/app/services/utilities/toast-notification.service";
import { SpinLoaderService } from "src/app/services/utilities/spin-loader.service";

@Component({
  selector: "app-listado-componentes",
  templateUrl: "./listado-componentes.component.html",
  styleUrls: ["./listado-componentes.component.scss"],
})
export class ListadoComponentesComponent implements OnInit {
  //ImgPaths
  imgInfo = "./assets/images/help02.png";
  //start img filtros por grupos de componentes
  imgNotebook = "./assets/icons-products/notebook.png";
  imgMonitor = "./assets/icons-products/monitor.png";
  imgSmartTv = "./assets/icons-products/smartTv.png";
  imgCelular = "./assets/icons-products/celular.png";
  imgTablet = "./assets/icons-products/tablets.png";
  imgTeclado = "./assets/icons-products/teclado.png";
  imgMic = "./assets/icons-products/mic.png";
  imgAuricular = "./assets/icons-products/auricular.png";
  imgHardDrive = "./assets/icons-products/hard-drive.png";
  imgCable = "./assets/icons-products/cable.png";
  imgAdaptador = "./assets/icons-products/adaptador.png";
  imgCargBaterias = "./assets/icons-products/cargBaterias.png";
  imgEsp8266 = "./assets/icons-products/esp8266.png";
  imgPlacas = "./assets/icons-products/placas.png";
  imgSwitch = "./assets/icons-products/switch.png";
  imgCableRedes = "./assets/icons-products/cableRedes.png";
  //end img filtros por grupos de componentes
  //start img filtros por tipos de campos
  imgFilterCateg = "./assets/icons-crud/filter-categ.svg";
  imgFilterMarca = "./assets/icons-crud/filter-marca.svg";
  imgFilterDate = "./assets/icons-crud/filter-date.svg";
  imgFilterStock = "./assets/icons-crud/filter-stock.svg";
  imgFilterPrecio = "./assets/icons-crud/filter-precio.svg";
  imgFilterInfo = "./assets/icons-crud/filter-info.svg";
  imgFilterDelete = "./assets/icons-crud/filter-delete.svg";
  //end img filtros por tipos de campos
  //start img buscador
  imgSearch = "./assets/images/search.png";
  imgPapelera = "./assets/forms/papelera.png";
  //end img buscador
  //start img filtros derecha
  imgAddProduct = "./assets/icons-crud/add-product.svg";
  imgLastProduct = "./assets/icons-crud/last-product.png";
  imgDivisas = "./assets/icons-crud/divisas.png";
  imgDownload = "./assets/icons-crud/download.svg";
  imgCardTableList = "./assets/icons-crud/card-table-list.svg";
  imgTableList = "./assets/icons-crud/table-list.svg";
  //end img filtros derecha
  //start img filtros tabla
  imgSelectSort = "./assets/icons-crud/select-sort.svg";
  imgOrderAsc = "./assets/icons-crud/order-asc.svg";
  imgOrderDesc = "./assets/icons-crud/order-desc.svg";
  imgPdf = "./assets/images/pdf.png";
  imgPrecioHelp = "./assets/icons-crud/help.png";
  imgDetailsProduct = "./assets/icons-crud/details-product.svg";
  imgEditProduct = "./assets/icons-crud/edit-product.svg";
  imgDeleteProduct = "./assets/icons-crud/delete-product.svg";
  //end img filtros tabla
  //start img paginacion
  imgArrowLastLeft = "./assets/pagination/arrowLastLeft.png";
  imgArrowLeft = "./assets/pagination/arrowLeft.png";
  imgArrowRight = "./assets/pagination/arrowRight.png";
  imgArrowLastRight = "./assets/pagination/arrowLastRight.png";
  imgReturn = "./assets/icons-crud/return.svg";
  imgReload = "./assets/icons-crud/reload.svg";
  //end img paginacion
  //start modal download file
  imgDownloadPdf = "./assets/download/pdf.png";
  imgDownloadExcel = "./assets/download/excel.png";
  imgDownloadCsv = "./assets/download/csv.png";
  imgWarning = "./assets/icons-crud/warning.svg";
  //end modal download file

  //Product
  productos: ProductoDTO[] = [];
  lastProducto: ProductoDTO[] = [];
  precioProducto: number = 0;
  //Dolar
  dolarBuy: number = 0;
  dolarSale: number = 0;
  converDolarPeso: number = 0;
  //Producto seleccionado
  productoSelect: ProductoDTO[] = [];
  idProdSelect: string = "";
  codProdSelect: string = "";
  nombrProdSelect: string = "";
  //filtros busqueda productos
  filtroProdBusqueda: string = "";
  filtroProdCampo: string = "";
  //Auth
  isAdmin = false;
  isUser = false;
  typeListTable = true;
  //Paginado
  nroPage = 0;
  isFirstPage = false;
  isLastPage = false;
  totalPages = 0;
  nroElements = 10;
  nroCurrentElements = 0;
  nroTotalElements = 0;
  orderBy = "id";
  direction = "asc";
  //Errores
  errMsj: string;

  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };

  constructor(
    private router: Router,
    private productoService: ProductosService,
    private dolarService: DolarService,
    private tokenService: TokenService,
    private generateFileService: GenerateFilesService,
    private toastService: ToastNotificationService,
    private spinLoaderService: SpinLoaderService
  ) {}

  ngOnInit() {
    this.getDolarBuy();
    this.getDolarSale();
    this.listarProductos();
    this.listarLastProducto();
    this.checkEliminarProducto();
  }

  // ======================
  // ===== PRODUCT LIST ===
  // ======================
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
          console.log(this.errMsj);
          this.toastService.error(this.errMsj);
        }
      );
  }

  // ======================
  // ===== LAST PRODUCT ===
  // ======================
  listarLastProducto() {
    this.productoService
      .listado(
        this.totalPages,
        this.nroTotalElements - (this.nroTotalElements - 1),
        this.orderBy,
        this.direction
      )
      .subscribe(
        (data: any) => {
          this.lastProducto = data.content;
        },
        (err) => {
          this.errMsj = err.error.message;
          console.log(this.errMsj);
          this.toastService.error(this.errMsj);
        }
      );
  }

  // ==================================
  // ===== PRODUCT LIST WITH FILTERS ===
  // ===================================
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
        },
        (err) => {
          this.errMsj = err.error.message;
          console.log(this.errMsj);
          this.toastService.error(this.errMsj);
        }
      );
  }

  // ==================================
  // ===== SET FILTERS FOR PRODUCTS ===
  // ===================================
  setFilter(filtro: string, campo: string, nroPag: number) {
    try {
      this.filtroProdCampo = "";
      this.filtroProdBusqueda = "";

      if (filtro === ("" || null) || campo === ("" || null)) {
        this.listarProductos();
      } else {
        this.filtroProdCampo = campo;
        this.filtroProdBusqueda = filtro;
        this.nroPage = nroPag;
        this.listarProductosFilter();
      }
      this.listarLastProducto();
    } catch (err) {
      console.log(err);
    }
  }

  // ==========================
  // ===== GET DOLAR COMPRA ===
  // ==========================
  getDolarBuy() {
    this.dolarService
      .getDolarBuy()
      .then((obj) => (this.dolarBuy = obj))
      .catch((err) => {
        console.log(err);
      });
  }

  // ==========================
  // ===== GET DOLAR VENTA ===
  // ==========================
  getDolarSale() {
    this.dolarService
      .getDolarSale()
      .then((obj) => (this.dolarSale = obj))
      .catch((err) => {
        console.log(err);
      });
  }

  // ==================================
  // ===== DETALLE PRODUCTO NAVIGATE ===
  // ===================================
  detalleProducto(producto: any): void {
    this.spinLoaderService.load(100);

    this.navigationExtras.state["value"] = producto;
    this.router.navigate(["detalles-componentes"], this.navigationExtras);
  }

  // ==================================
  // ===== EDITAR PRODUCTO NAVIGATE ===
  // ===================================
  editarProducto(producto: any): void {
    this.spinLoaderService.load(100);

    this.navigationExtras.state["value"] = producto;
    this.router.navigate(["editar-componentes"], this.navigationExtras);
  }

  // =============================
  // ===== SET PRECIO PRODUCTO ===
  // =============================
  selectPrecioProducto(producto: number): void {
    this.precioProducto = producto;
  }

  // =============================
  // ===== CHECK TOKEN SERVICE ===
  // =============================
  checkEliminarProducto() {
    this.isAdmin = this.tokenService.isAdmin();
  }

  // =============================
  // ===== ELIMINAR PRODUCTO ===
  // =============================
  eliminarProducto(id: string): void {
    this.spinLoaderService.load(100);

    this.productoService.delete(id).subscribe(
      (data: any) => {
        this.toastService.successfulOperation("Se ha eliminado el producto!!");

        console.log("Producto Eliminado");
        this.refresh(2100);
      },
      (err) => {
        this.errMsj = err.error.message;
        console.log(this.errMsj);
        this.toastService.error(this.errMsj);
      }
    );
  }

  // ====================================
  // ===== ELIMINAR PRODUCTO ERROR AUTH===
  // =====================================
  eliminarProductoNoAuth(id: number): void {
    this.spinLoaderService.load(100);

    this.toastService.unauthorizedOperation(
      "Servicio Habilitado para administradores!!"
    );

    this.refresh(2100);
  }

  // =========================
  // ===== RECARGAR-REFRESH===
  // =========================
  refresh(ms: number) {
    setTimeout(() => {
      window.location.reload();
    }, ms);
  }

  // =========================
  // ===== REDIRECT===
  // =========================
  redirect(page: String) {
    this.router.navigate([page]);
  }

  // =========================
  // ===== SET PRODUCT SELECT===
  // =========================
  setProductoSelect(producto: ProductoDTO) {
    this.idProdSelect = producto.id;
    this.codProdSelect = producto.codigo;
    this.nombrProdSelect = producto.nombre;
  }

  // =========================
  // ===== SET TYPE OF LIST===
  // =========================
  setTypeListTable(set: boolean) {
    this.typeListTable = set;
  }

  // =========================
  // ===== GET PAGINATE===
  // =========================
  getPaginate() {
    var paginate = {
      nroPage: this.nroPage,
      totalPages: this.totalPages,
      nroCurrentElements: this.nroCurrentElements,
      nroTotalElements: this.nroTotalElements,
    };
    return paginate;
  }

  // =========================
  // ===== GENERATE EXCEL===
  // =========================

  generateExcel(): void {
    let nameExcel = "listaComponentes.xlsx";

    let data = document.getElementById("table");

    let paginate = this.getPaginate();

    this.generateFileService.generateExcel(nameExcel, data, paginate);
  }

  // =====================
  // ===== GENERATE CSV===
  // =====================

  generateCsv(): void {
    let nameCsv = "listaComponentes.csv";

    let data = document.getElementById("table");

    this.generateFileService.generateCsv(nameCsv, data);
  }

  // =====================
  // ===== GENERATE PDF===
  // =====================
  generatePdf(): void {
    let namePdf = "listaComponentes.pdf";
    let data: any = document.getElementById("table");

    this.generateFileService.generatePdf(namePdf, data);
  }

  // =====================
  // ===== PAGINATION ===
  // =====================

  // =====================
  // ===== ORDER BY ===
  // =====================
  orderByDirection(type: string, direct: string): void {
    try {
      this.orderBy = type;
      this.direction = direct;

      if (this.filtroProdBusqueda === ("" || null)) {
        this.listarProductos();
      } else {
        this.listarProductosFilter();
      }
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
      //Add handle exception
    }
  }

  // =====================
  // ===== LAST PAGE===
  // =====================
  paginaAnterior(): void {
    try {
      if (this.nroPage != 0 && this.nroPage > 0) {
        this.nroPage--;
        this.listarProductos();
      } else {
        this.toastService.error("No es posible disminuir una página!!");
      }
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =====================
  // ===== NEXT PAGE===
  // =====================
  paginaSiguiente(): void {
    try {
      if (!this.isLastPage && this.nroPage >= 0) {
        this.nroPage++;
        this.listarProductos();
      } else {
        this.toastService.error("No es posible aumentar una página!!");
      }
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =====================
  // ===== CHANGE PAGE===
  // =====================
  cambiarPagina(pagina: number): void {
    try {
      this.nroPage = pagina;

      if (this.filtroProdBusqueda === ("" || null)) {
        this.listarProductos();
      } else {
        this.listarProductosFilter();
      }
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }
}
