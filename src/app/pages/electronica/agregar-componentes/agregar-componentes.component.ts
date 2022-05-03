import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-componentes',
    //usamos el componente creado form lo pasamos al template
  //template: `<app-producto-form></app-producto-form>` ,
  templateUrl : './agregar-componentes.component.html',
  styleUrls: ['./agregar-componentes.component.css']
})
export class AgregarComponentesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
