import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d';
import { NgToastService } from 'ng-angular-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductoDTO } from 'src/app/models/producto-dto';
import { ProductosService } from 'src/app/services/productos/productos.service';

highcharts3D(Highcharts);

@Component({
  selector: 'app-graficos-componentes',
  templateUrl: './graficos-componentes.component.html',
  styleUrls: ['./graficos-componentes.component.scss'],
})
export class GraficosComponentesComponent implements OnInit {
  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };

  //PAGINADO

  //Pages
  nroPage = 0;
  isFirstPage = false;
  isLastPage = false;
  totalPages = 0;

  //Elements
  nroElements = 100;
  nroCurrentElements = 0;
  nroTotalElements = 0;

  //Caracteristicas
  orderBy = 'id';
  direction = 'asc';

  //ERRORES
  errMsj: string;

  //------ STOCK-CATEGORIA ----------

  //check para mostrar html
  checkGrafStockCateg: boolean = false;

  //Filtro Stock-Categ
  filtroCateg: string = '';

  //Numero Stock-Categ
  stockCategValue: number = 0;

  //Graf Categorias Stock-Categ
  categ: string[] = [
    'Gamer',
    'Monitores',
    'Smart TV',
    'Notebooks',
    'Celulares',
    'Tablet',
    'Plac. Electr.',
    'Microntr.',
    'Generales',
    'Redes',
  ];

  stockCateg: number[] = [];

  nroTotalStock: number = 0;
  nroPromedioStock: number = 0;

  stockMax: number = 0;
  stockMin: number = 0;

  indStockMax: number = 0;
  indStockMin: number = 0;

  catStockMax: string = '';
  catStockMin: string = '';

  categMax: string = '';
  categMin: string = '';

  //------ STOCK-FECHA ----------

  //check para mostrar html
  checkGrafStockFecha: boolean = false;

  //Filtro Stock-Fecha
  filtroFecha: string = '';

  //Numero Stock-Fecha
  stockFechaValue: number = 0;

  //Graf Categorias Stock-Fecha
  fecha: string[] = ['2020', '2021', '2022'];

  stockFecha: number[] = [];

  //------ STOCK-FECHA 2022----------

  checkGrafStockFecha2022: boolean = false;
  checkStockFechaMeses2022: boolean = false;

  //Filtro Stock-Fecha 2022
  filtroFecha2022: string = '';

  //Numero Stock-Fecha 2022
  stockFecha2022Value: number = 0;

  //GRAF STOCK-FECHA2022
  fecha2022: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  stockFecha2022: number[] = [];

  //--OPTIONS GRAF STOCK-CATEG--
  HighchartsStockCateg: typeof Highcharts = Highcharts;
  //chartConstructorStockCateg: string = 'chart';
  chartOptionsStockCateg: Highcharts.Options = {};

  //--OPTIONS GRAF STOCK-FECHA--
  HighchartsStockFecha: typeof Highcharts = Highcharts;
  //chartConstructorStockFecha: string = 'chart';
  chartOptionsStockFecha: Highcharts.Options = {};

  //--OPTIONS GRAF STOCK-FECHA-2022--
  HighchartsStockFecha2022: typeof Highcharts = Highcharts;
  //chartConstructorStockFecha: string = 'chart';
  chartOptionsStockFecha2022: Highcharts.Options = {};

  constructor(
    private router: Router,
    private productoService: ProductosService,
    private toast: NgToastService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit() {
    this.generarGrafStockCateg();
  }

  //=========== SEGURIDAD ==============
  //Aplicada en productos.guard y agregada en el routing

  //=============== UTILS ===============

  //----STOCK BY CATEGORIA----
  getStockByCateg() {
    this.productoService
      .stockByCateg(
        this.filtroCateg,
        this.nroPage,
        this.nroElements,
        this.orderBy,
        this.direction
      )
      .subscribe(
        (data: any) => {
          this.stockCategValue = data;
          this.isFirstPage = data.first;
          this.isLastPage = data.last;
          this.totalPages = data.totalPages;
          this.nroCurrentElements = data.numberOfElements;

          this.stockCateg.push(this.stockCategValue);
          //console.log(this.stockCategValue);
        },
        (err) => {
          this.errMsj = err.error.message;
        }
      );
  }

  //----STOCK BY CATEGORIA----
  getStockByFecha() {
    this.productoService
      .stockByFecha(
        this.filtroFecha,
        this.nroPage,
        this.nroElements,
        this.orderBy,
        this.direction
      )
      .subscribe(
        (data: any) => {
          if (!this.checkStockFechaMeses2022) {
            this.stockFechaValue = data;
            this.isFirstPage = data.first;
            this.isLastPage = data.last;
            this.totalPages = data.totalPages;
            this.nroCurrentElements = data.numberOfElements;

            this.stockFecha.push(this.stockFechaValue);
            console.log('AÑO',this.stockCategValue);

          } else if (this.checkStockFechaMeses2022) {
            this.stockFecha2022Value = data;
            this.isFirstPage = data.first;
            this.isLastPage = data.last;
            this.totalPages = data.totalPages;
            this.nroCurrentElements = data.numberOfElements;

            this.stockFecha2022.push(this.stockFecha2022Value);
            console.log('MESES 2022',this.stockCategValue);
          }
        },
        (err) => {
          if (!this.checkStockFechaMeses2022) {
            this.stockFecha.push(0);
          }else if(this.checkStockFechaMeses2022){
            this.stockFecha2022.push(0);
          }
          this.errMsj = err.error.message;
        }
      );
  }

  setFilterCateg(filtroCateg: string) {


    this.filtroCateg = '';

    this.filtroCateg = filtroCateg;

    this.getStockByCateg();
  }

  setFilterFecha(filtroFecha: string) {

    if (!(this.checkStockFechaMeses2022)) {

      this.filtroFecha = '';

      this.filtroFecha = filtroFecha;

    }else if(this.checkStockFechaMeses2022){

      this.filtroFecha2022 = '';

      this.filtroFecha2022 = filtroFecha;
    }

    this.getStockByFecha();
  }

  //------Generamos los Stocks-categorias------------

  stockByCateg() {
    this.stockCateg = [];


    this.delay(this.setFilterCateg('Gamer'), 100);
    this.delay(this.setFilterCateg('Monitores'), 1000);
    this.delay(this.setFilterCateg('Smart TV'), 2000);
    this.delay(this.setFilterCateg('Notebook'), 3000);
    this.delay(this.setFilterCateg('Celulares'), 4000);
    this.delay(this.setFilterCateg('Tablet'), 5000);
    this.delay(this.setFilterCateg('Placas Electronicas'), 6000);
    this.delay(this.setFilterCateg('Microcontroladores'), 7000);
    this.delay(this.setFilterCateg('Generales'), 8000);
    this.delay(this.setFilterCateg('Redes'), 9000);

  }

  //------Generamos los Stocks-fechas------------

  stockByFecha() {
    this.stockFecha = [];
    this.checkStockFechaMeses2022 = false;
    this.delay(this.setFilterFecha('-20'), 100);
    this.delay(this.setFilterFecha('-21'), 200);
    this.delay(this.setFilterFecha('-22'), 300);
  }

  //------Generamos los Stocks-fechas2022------------

  stockByFecha2022() {
    this.stockFecha2022 = [];
    this.checkStockFechaMeses2022 = true;
    this.delay(this.setFilterFecha('-01-22'), 100);
    this.delay(this.setFilterFecha('-02-22'), 200);
    this.delay(this.setFilterFecha('-03-22'), 300);
    this.delay(this.setFilterFecha('-04-22'), 400);
    this.delay(this.setFilterFecha('-05-22'), 500);
    this.delay(this.setFilterFecha('-06-22'), 600);
    this.delay(this.setFilterFecha('-07-22'), 700);
    this.delay(this.setFilterFecha('-08-22'), 800);
    this.delay(this.setFilterFecha('-09-22'), 900);
    this.delay(this.setFilterFecha('-10-22'), 1000);
    this.delay(this.setFilterFecha('-11-22'), 1100);
    this.delay(this.setFilterFecha('-12-22'), 1200);
  }

  //--------- STOCK MAX -----
  maximoStock() {
    this.stockMax = 0;

    this.stockMax = Math.max.apply(Math, this.stockCateg);

    this.indStockMax = this.stockCateg.indexOf(this.stockMax);

    this.catStockMax = this.categ[this.indStockMax];

    return this.stockMax;
  }

  //--------- STOCK MIN -----
  minimoStock() {
    this.stockMin = 0;

    this.stockMin = Math.min.apply(Math, this.stockCateg);

    this.indStockMin = this.stockCateg.indexOf(this.stockMin);

    this.catStockMin = this.categ[this.indStockMin];

    return this.stockMin;
  }

  //--------- STOCK TOTAL -----
  totalStock() {
    this.nroTotalStock = this.stockCateg.reduce((a, b) => a + b, 0);

    return this.nroTotalStock;
  }

  //--------- STOCK PROMEDIO -----
  promedioStock() {
    this.nroPromedioStock = this.nroTotalStock / this.stockCateg.length;

    return this.nroPromedioStock;
  }

  //---------------- RECARGAR -------------------
  refresh(ms: number) {
    setTimeout(() => {
      window.location.reload();
    }, ms);
  }
  //-----------delay----------------
  delay(obj: any, ms: number) {
    setTimeout(() => {
      obj;
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

  //----------- Generar Graf STOCK-CATEG -----------
  generarGrafStockCateg() {

    setTimeout(() => {
      this.stockByCateg();
      this.spinLoader(12000);
    }, 1000);


    setTimeout(() => {
      this.checkGrafStockCateg = true;
      this.generateChartStockCateg();
    }, 9000);


  }


  //----------- Generar Graf STOCK-FECHA -----------
  generarGrafStockFecha() {
    //Cargamos el stock
    this.delay(this.stockByFecha(),100);
    //this.delay(this.stockByFecha2022(),200);

    //Le damos el tiempo de carga y generacion de grafica
    setTimeout(() => {
      this.checkGrafStockFecha = true;
      this.generateChartStockFecha();
    }, 3000);

    /*
    setTimeout(() => {
      this.checkGrafStockFecha2022 = true;
      this.generateChartStockFecha2022();
    }, 4000);

    */
  }

  //----------- Ocultar Graf STOCK-FECHA -----------
  ocultarGrafStockFecha() {
    this.checkGrafStockFecha = false;
    this.checkGrafStockFecha2022 = false;
    this.spinLoader(1000);
  }



















  //------ HIGHCHART STOCK-CATEG ------------

  generateChartStockCateg() {
    this.chartOptionsStockCateg = {
      chart: {
        height: 410,
        width: 850,
        type: 'bar',
        marginLeft: 10,
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
          stops: [
            [0, 'rgb(66, 3, 44)'],
            [1, 'rgb(0, 0, 0)'],
          ],
        },
        plotBorderColor: '#CCCCCC',
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 15,
          depth: 30,
          viewDistance: 25,
        },
      },
      title: {
        text: 'Stock de Productos Por Categoría',
        style: {
          color: 'white',
        },
      },
      subtitle: {
        //text: 'Ordenados por Cantidad de Mayor a Menor',
        style: {
          color: 'white',
        },
      },

      xAxis: {
        categories: this.categ,
        title: {
          //text: 'Categorías',
          margin: 5,
          style: {
            color: 'white',
          },
        },
        labels: {
          style: {
            color: 'white',
          },
        },
      },
      yAxis: {
        title: {
          //text: 'Cantidad',
          text: '',
        },
        labels: {
          style: {
            color: 'white',
          },
        },
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: 0,
        y: 0,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        column: {
          pointPadding: 0,
          borderWidth: 0,
          depth: 25,
        },
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y: f} u',
          },
        },
      },

      tooltip: {
        headerFormat: '<span style="font-size:20px">{point.key}</span><br>',
        pointFormat:
          '<tr><td style="color:{rgb(223, 246, 255)};padding:0">Stock : </td>' +
          '<td style="padding:0"><b> {point.y: f} unidades</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      series: [
        {
          name: 'Cantidad por Categoría',
          type: 'column',

          dataLabels: {
            enabled: true,
            allowOverlap: false,
            style: {
              font: '9pt Trebuchet MS, Verdana, sans-serif',
              color: '#FFFFFF',
            },
          },

          dataSorting: {
            enabled: false,
          },
          data: this.stockCateg,

          color: 'rgb(133, 14, 53)',
        },
      ],
    };

    // }, 600);
  }

  //------ HIGHCHART STOCK-FECHA ------------

  generateChartStockFecha() {
    //setTimeout(() => {

    this.chartOptionsStockFecha = {
      chart: {
        height: 310,
        width: 450,
        type: 'area',
        marginLeft: 10,
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
          stops: [
            [0, 'rgb(66, 3, 44)'],
            [1, 'rgb(0, 0, 0)'],
          ],
        },
        plotBorderColor: '#CCCCCC',
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 15,
          depth: 30,
          viewDistance: 25,
        },
      },
      title: {
        text: 'Stock de Productos Por Año',
        style: {
          color: 'white',
        },
      },
      subtitle: {
        //text: 'Ordenados por Cantidad de Mayor a Menor',
        style: {
          color: 'white',
        },
      },

      xAxis: {
        categories: this.fecha,
        title: {
          //text: 'Categorías',
          margin: 5,
          style: {
            color: 'white',
          },
        },
        labels: {
          style: {
            color: 'white',
          },
        },
      },
      yAxis: {
        title: {
          //text: 'Cantidad',
          text: '',
        },
        labels: {
          style: {
            color: 'white',
          },
        },
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: 0,
        y: 30,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        area: {
          pointStart: 0,
          fillOpacity: 0.5,
        },

        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y: f} u',
          },
        },
      },

      tooltip: {
        headerFormat: '<span style="font-size:20px">{point.key}</span><br>',
        pointFormat:
          '<tr><td style="color:{rgb(223, 246, 255)};padding:0">Stock : </td>' +
          '<td style="padding:0"><b> {point.y: f} unidades</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      series: [
        {
          name: 'Cantidad por Año',
          type: undefined,
          dataLabels: {
            enabled: true,
            allowOverlap: false,
            style: {
              font: '9pt Trebuchet MS, Verdana, sans-serif',
              color: '#FFFFFF',
            },
          },

          dataSorting: {
            enabled: false,
          },
          data: this.stockFecha,

          color: 'rgb(133, 14, 53)',
        },
      ],
    };

    // }, 600);
  }

  //------ HIGHCHART STOCK-FECHA ------------

  generateChartStockFecha2022() {
    //setTimeout(() => {

    this.chartOptionsStockFecha2022 = {
      chart: {
        height: 310,
        width: 450,
        type: 'area',
        marginLeft: 10,
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
          stops: [
            [0, 'rgb(66, 3, 44)'],
            [1, 'rgb(0, 0, 0)'],
          ],
        },
        plotBorderColor: '#CCCCCC',
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 15,
          depth: 30,
          viewDistance: 25,
        },
      },
      title: {
        text: 'Stock de Productos Por Año 2022',
        style: {
          color: 'white',
        },
      },
      subtitle: {
        //text: 'Ordenados por Cantidad de Mayor a Menor',
        style: {
          color: 'white',
        },
      },

      xAxis: {
        categories: this.fecha2022,
        title: {
          //text: 'Categorías',
          margin: 5,
          style: {
            color: 'white',
          },
        },
        labels: {
          style: {
            color: 'white',
          },
        },
      },
      yAxis: {
        title: {
          //text: 'Cantidad',
          text: '',
        },
        labels: {
          style: {
            color: 'white',
          },
        },
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: 0,
        y: 30,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        area: {
          fillOpacity: 0.5,
        },

        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y: f} u',
          },
        },
      },

      tooltip: {
        headerFormat: '<span style="font-size:20px">{point.key}</span><br>',
        pointFormat:
          '<tr><td style="color:{rgb(223, 246, 255)};padding:0">Stock : </td>' +
          '<td style="padding:0"><b> {point.y: f} unidades</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      series: [
        {
          name: 'Cantidad por Mes',
          type: undefined,
          dataLabels: {
            enabled: true,
            allowOverlap: false,
            style: {
              font: '9pt Trebuchet MS, Verdana, sans-serif',
              color: '#FFFFFF',
            },
          },

          dataSorting: {
            enabled: false,
          },
          data: this.stockFecha2022,

          color: 'rgb(133, 14, 53)',
        },
      ],
    };

    // }, 600);
  }
}
