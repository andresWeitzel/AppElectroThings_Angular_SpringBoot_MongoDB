import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-componentes',
  templateUrl: './editar-componentes.component.html',
  styleUrls: ['./editar-componentes.component.css']
})
export class EditarComponentesComponent implements OnInit {

  valorProducto = null

  constructor(private router : Router) {

    const navegacionActual = this.router.getCurrentNavigation();

    this.valorProducto = navegacionActual?.extras?.state;
  }



  ngOnInit(): void {
  }

}
