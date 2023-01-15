export class SigninUsuarioDto {

  nombre:string='';
  apellido:string='';
  username:string='';
  password:string='';
  email:string='';

  constructor(nombre: string, apellido: string, username: string, password: string, email: string) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.username = username;
    this.email = email;
    this.password = password;
}
}
