export class SigninUsuarioDto {

  nombre:string='';
  username:string='';
  password:string='';
  email:string='';

  constructor(nombre: string, username: string, password: string, email: string) {
    this.nombre = nombre;
    this.username = username;
    this.email = email;
    this.password = password;
}
}
