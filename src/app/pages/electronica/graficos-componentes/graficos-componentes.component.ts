import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d';
import { ProductoDTO } from 'src/app/models/producto-dto';
import { ProductosService } from 'src/app/services/productos/productos.service';
highcharts3D(Highcharts);


@Component({
  selector: 'app-graficos-componentes',
  templateUrl: './graficos-componentes.component.html',
  styleUrls: ['./graficos-componentes.component.scss']
})
export class GraficosComponentesComponent implements OnInit {

  navigationExtras : NavigationExtras = {

      state : {
        value :null
      }
  };


  //Array de Productos
  productos : ProductoDTO[]=[];

  nombresProductos:string[]=[];

  test:string[]=['asda','asdasd'];
  test02:number[]=[2,23,2311,12223];

  //Paginado
  nroPagina=0;
  nroElementos=10;
  ordenacion='id';
  ascendente='';

  primeraPagina=false;
  ultimaPagina=false;



/*

  //Diccioinario de Productos
  productos = new Map<string, number> ();

*/


constructor(private router: Router, private productoService:ProductosService) { }

ngOnInit() {

  this.listadoProductos();
  this.testeo();
}



//=============METODOS CRUD========================

//Obtener Productos
 listadoProductos(){
  this.productoService.listado(this.nroPagina,this.nroElementos,this.ordenacion,this.ascendente).subscribe(
    (registros:any)=>{
      this.productos = registros.content;
      this.primeraPagina = registros.first;
      this.ultimaPagina = registros.last;

      console.log(this.productos);
      console.log(this.productos);
    },
    (err)=>{
      console.log(err.error);
    }
    );
}

agregarNombresGrafico(nombre:string){

  this.nombresProductos.push(nombre);

  console.log('nombre',nombre);


}


testeo(){



  this.nombresProductos=Object.keys(this.productos.toString);

  console.log('testeo',this.nombresProductos);

  //prompt('pp');
}



  //=============METODO CRUD========================

/*
  graficoStockMarca(){
    this.productoService.graficoStockMarca().subscribe(
      (r:any)=>{
        this.productos=r.content;
        console.log(this.productos);
      },
      (err)=>{
        console.log(err.error);
      }
      );
  }

*/


  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      height: 510,
        	  width:650,
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50,
        viewDistance: 25
      }
    },
    title: {
      text: 'Stock de Productos Por Marca',
    },
    subtitle: {
      text: 'Ordenados por Cantidad de Mayor a Menor',
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      //categories: [[${keySetCateg}]],
      //categories:{listadoProductos()},
      //categories: this.nombresProductos,
      categories:this.test,
      crosshair: true,
      title: {
        text: 'Marcas',
      }
    },
    yAxis: {
      title: {
        text: 'Cantidad',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
        depth:25
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
      pointFormat: '<tr><td style="color:{series.color};padding:0">Stock : </td>' +
            '<td style="padding:0"><b> {point.y: f} unidades</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
    },
    series: [
      {
        name: 'Unidades por Marca',
        type: 'column',
        dataSorting:{
          enabled:true
        },
        data:this.test02,
        color:'#5F96F3'

      },
    ],

  };
}

