export class ProductoDTO {
  id: string;
  codigo:string;
  nombre:string;
  descripcion:string;
  categoria : string;
  marca: string;
  imagen:string;
  hojaDatos : string;
  stock : number;
  precio : number;
  fecha: string;
  hora: string

  constructor(codigo:string,nombre:string,descripcion:string, categoria:string,marca:string,imagen:string,hojaDatos:string,stock:number, precio:number, fecha:string, hora:string){

    //this.id=id;
    this.codigo=codigo;
    this.nombre=nombre;
    this.descripcion=descripcion;
    this.categoria=categoria;
    this.marca=marca;
    this.imagen=imagen;
    this.hojaDatos=hojaDatos;
    this.stock=stock;
    this.precio=precio;
    this.fecha=fecha;
    this.hora=hora;

}
}
