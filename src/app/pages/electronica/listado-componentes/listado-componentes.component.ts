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

//Update functionalities

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
  products: ProductoDTO[] = [];
  lastProduct: ProductoDTO[] = [];
  productPrice: number = 0;
  //Dolar
  dolarBuy: number = 0;
  dolarSale: number = 0;
  convertDolarPeso: number = 0;
  //selected product
  selectedProduct: ProductoDTO[] = [];
  idSelectedProduct: string = "";
  codeSelectedProduct: string = "";
  nameSelectedProduct: string = "";
  //products filter
  productsSearchFilter: string = "";
  productsFieldSearch: string = "";
  //Auth
  isAdmin = false;
  isUser = false;
  tableTypeListed = true;
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
    this.listProducts();
    this.listLastProduct();
    this.checkDeleteProduct();
  }

  // ======================
  // ===== LIST PRODUCTS ===
  // ======================
  listProducts() {
    this.productoService
      .listado(this.nroPage, this.nroElements, this.orderBy, this.direction)
      .subscribe(
        (data: any) => {
          this.products = data.content;
          this.isFirstPage = data.first;
          this.isLastPage = data.last;
          this.totalPages = data.totalPages;
          this.nroCurrentElements = data.numberOfElements;
          this.nroTotalElements = data.totalElements;
        },
        (error) => {
          this.errMsj = error.message;
          console.log(this.errMsj);
          this.toastService.error(this.errMsj);
        }
      );
  }

  // ===========================
  // ===== LIST LAST PRODUCT ===
  // ===========================
  listLastProduct() {
    this.productoService
      .listado(
        this.totalPages,
        this.nroTotalElements - (this.nroTotalElements - 1),
        this.orderBy,
        this.direction
      )
      .subscribe(
        (data: any) => {
          this.lastProduct = data.content;
        },
        (error) => {
          this.errMsj = error.message;
          console.log(this.errMsj);
          this.toastService.error(this.errMsj);
        }
      );
  }

  // ====================================
  // ===== LIST PRODUCTS WITH FILTERS ===
  // ====================================
  listProductsFilter() {
    this.productoService
      .listadoFilterAndField(
        this.productsFieldSearch,
        this.productsSearchFilter,
        this.nroPage,
        this.nroElements,
        this.orderBy,
        this.direction
      )
      .subscribe(
        (data: any) => {
          this.products = data.content;
          this.isFirstPage = data.first;
          this.isLastPage = data.last;
          this.totalPages = data.totalPages;
          this.nroCurrentElements = data.numberOfElements;
          this.nroTotalElements = data.totalElements;
        },
        (error) => {
          this.errMsj = error.message;
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
      this.productsFieldSearch = "";
      this.productsSearchFilter = "";

      console.log({'FILTRO':filtro});

        if (filtro === "" || filtro === null || campo === "" || campo === null) {
        this.listProducts();
      } else {
        this.productsFieldSearch = campo;
        this.productsSearchFilter = filtro;
        this.nroPage = nroPag;
        this.listProductsFilter();
      }
    } catch (error) {
      console.log(error);
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // ==========================
  // ===== GET DOLAR COMPRA ===
  // ==========================
  getDolarBuy() {
    this.dolarService
      .getDolarBuy()
      .then((obj) => (this.dolarBuy = obj))
      .catch((error) => {
        this.errMsj = error.message;
        console.log(this.errMsj);
        this.toastService.error(this.errMsj);
      });
  }

  // ==========================
  // ===== GET DOLAR VENTA ===
  // ==========================
  getDolarSale() {
    this.dolarService
      .getDolarSale()
      .then((obj) => (this.dolarSale = obj))
      .catch((error) => {
        this.errMsj = error.message;
        console.log(this.errMsj);
        this.toastService.error(this.errMsj);
      });
  }
  // =============================
  // ===== SET PRODUCT PRICE =====
  // =============================
  setProductPrice(productPrice: number): void {
    try {
      this.productPrice = productPrice;
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }
  // ==================================
  // ===== DETAILS PRODUCT NAVIGATE ===
  // ===================================
  navigateDetailsProduct(product: any): void {
    try {
      this.spinLoaderService.load(100);

      this.navigationExtras.state["value"] = product;
      this.router.navigate(["detalles-componentes"], this.navigationExtras);
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // ==================================
  // ===== EDIT PRODUCT NAVIGATE ===
  // ===================================
  navigateEditProduct(product: any): void {
    try {
      this.spinLoaderService.load(100);

      this.navigationExtras.state["value"] = product;
      this.router.navigate(["editar-componentes"], this.navigationExtras);
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =============================
  // ===== DELETE PRODUCT ========
  // =============================
  deleteProduct(id: string): void {
    this.spinLoaderService.load(100);

    this.productoService.delete(id).subscribe(
      (data: any) => {
        this.toastService.successfulOperation("Se ha eliminado el producto!!");

        console.log("Producto Eliminado");
        this.refresh(2100);
      },
      (error) => {
        this.errMsj = error.message;
        console.log(this.errMsj);
        this.toastService.error(this.errMsj);
      }
    );
  }

  // ====================================
  // ===== DELETE PRODUCT ERROR AUTH ====
  // =====================================
  deleteProductNoAuth(id: number): void {
    try {
      this.spinLoaderService.load(100);
      this.toastService.unauthorizedOperation(
        "Servicio Habilitado para administradores!!"
      );
      this.refresh(2100);
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =============================
  // ===== CHECK TOKEN SERVICE ===
  // ===== FOR DELETE PRODUCT  ===
  //==============================
  checkDeleteProduct() {
    try {
      this.isAdmin = this.tokenService.isAdmin();
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =========================
  // ===== RECARGAR-REFRESH===
  // =========================
  refresh(ms: number) {
    try {
      setTimeout(() => {
        window.location.reload();
      }, ms);
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }

  }

  // =========================
  // ===== REDIRECT PAGE =====
  // =========================
  redirectPage(page: String) {
    try {
      this.router.navigate([page]);
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =========================
  // ===== SET PRODUCT SELECT===
  // =========================
  setProductSelect(producto: ProductoDTO) {
    try {
      this.idSelectedProduct = producto.id;
      this.codeSelectedProduct = producto.codigo;
      this.nameSelectedProduct = producto.nombre;
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =========================
  // ===== SET TYPE OF LIST===
  // =========================
  setTableTypeListed(set: boolean) {
    try {
      this.tableTypeListed = set;
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =========================
  // ===== GET PAGINATE===
  // =========================
  getPaginate() {
    try {
      let paginate = {
        nroPage: this.nroPage,
        totalPages: this.totalPages,
        nroCurrentElements: this.nroCurrentElements,
        nroTotalElements: this.nroTotalElements,
      };
      return paginate;
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =========================
  // ===== GENERATE EXCEL===
  // =========================

  generateExcel(): void {
    try {
      let nameExcel = "listaComponentes.xlsx";
      let data = document.getElementById("table");
      //let valuesFileDownload = dataTable.getElementById("table");
      let paginate = this.getPaginate();
      this.generateFileService.generateExcel(nameExcel, data, paginate);
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =====================
  // ===== GENERATE CSV===
  // =====================

  generateCsv(): void {
    try {
      let nameCsv = "listaComponentes.csv";
      let data = document.getElementById("table");
      this.generateFileService.generateCsv(nameCsv, data);
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =====================
  // ===== GENERATE PDF===
  // =====================
  generatePdf(): void {
    try {
      let namePdf = "listaComponentes.pdf";
      let data: any = document.getElementById("table");
      this.generateFileService.generatePdf(namePdf, data);
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
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

      if (this.productsSearchFilter === "" || this.productsSearchFilter === null) {
        this.listProducts();
      } else {
        this.listProductsFilter();
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
  previousPage(): void {
    try {
      if (this.nroPage != 0 && this.nroPage > 0) {
        this.nroPage--;
        this.listProducts();
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
  nextPage(): void {
    try {
      if (!this.isLastPage && this.nroPage >= 0) {
        this.nroPage++;
        this.listProducts();
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
  changePage(pagina: number): void {
    try {
      this.nroPage = pagina;

      if (this.productsSearchFilter === "" || this.productsSearchFilter === null) {
        this.listProducts();
      } else {
        this.listProductsFilter();
      }
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }
}
