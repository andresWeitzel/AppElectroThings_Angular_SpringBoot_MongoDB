import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-componentes',
  templateUrl: './detalles-componentes.component.html',
  styleUrls: ['./detalles-componentes.component.css']
})
export class DetallesComponentesComponent implements OnInit {

  valorProducto = null;

  constructor(private router: Router) {

    const navegacionActual = this.router.getCurrentNavigation();

    this.valorProducto = navegacionActual?.extras?.state;


  }

  ngOnInit(): void {
  }

}
