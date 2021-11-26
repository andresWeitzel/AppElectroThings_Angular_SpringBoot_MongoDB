# CRUD_Angular_Firebase_Bootstrap

CRUD acerca de Componentes Electrónicos con Angular, Bootstrap y Firebase. 

<hr>

</br>

| Tecnologías | Versión | Finalidad
| ------------- | ------------- | ------------- |
| Angular |   12.2.11 | FrameWork Web Desarrollo de Apps con TypeScript | 
| Bootstrap | 5.1  | FrameWork Web Diseño y Desarrollo de Apps |
| Netlify | - | Servidor de Despliegue de Apps| 
| Visual Studio Code | 1.51.1  | Entorno de Desarrollo |
| Git | 2.29.1  | Control de Versiones |
| Angular CLI | 12.2.11 | Herramienta de Angular para depurar, crear, publicar, etc Apps |
| Netlify CLI | 2.69.10 | Herramienta de Netlify para Configurar el Despliegue de la App| 

</br>

## Repositorios Oficiales(documentación)

#### Bootstrap:   https://getbootstrap.com/
#### Angular:     https://angular.io/tutorial/toh-pt0
#### IDE:         https://code.visualstudio.com/download
#### Git:         https://git-scm.com/docs
#### Angular CLI: https://github.com/angular/angular-cli
#### Netlify CLI: https://www.npmjs.com/package/netlify-cli

</br>

<hr>

## ``Documentación y Guía del Proyecto ``
#### (Esta Documentación que Desarrollé es para la Creación, Configuración, Posibles Errores, Despliegue, etc de la Aplicación con Angular, Firebase y Bootstrap. Recomiendo Leerla y Realizar todo paso a paso como se indica en la misma).

<hr>

## Indice

 #### Sección 1) Configurar el Ambiente y el Espacio de Trabajo Local
  
  - [Paso 1) Instalación de Angular](#paso-1-instalación-de-angular)

  - [Paso 2) Instalación de la CLI de Angular](#paso-2-instalación-de-la-cli-de-angular)

  - [Paso 3) Creación de una Aplicación Web con Angular.](#paso-3-creación-de-una-aplicación-web-con-angular)

  - [Paso 4) Deployar la Aplicación con Angular.](#paso-4-deployar_la-aplicación-con-angular)



  #### Sección 2) Manejo e Implementación de Bootstrap
  
   - [Paso 5) Implementar Bootstrap con Angular](#paso-5-implmentar-bootstrap-con-angular)


  #### Sección 3) Módulos y Componentes de Angular
   
   - [Paso 6) Generación y Configuración de Componentes y Módulos con Angular](#paso-6-generación-y-configuración-de-componentes-y-módulos-con-angular)

  - [Paso 7) Imágenes de la Aplicación](#paso-7-imágenes-de-la-aplicación)
  
  - [Paso 8) Maquetado del Componente con css](#paso-8-maquetado-del-componente-con-css)

  
  #### Sección 4) Creación y Configuración de Páginas Web
  
  - [Paso 9) Generación de Módulos y Componentes para otras páginas](#paso-9-generación-de-módulos-y-componentes-para-otras-páginas)
  
   


</br>

## Sección 1) Configurar el Ambiente y el Espacio de Trabajo Local

</br>

### Paso 1) Instalación de Angular
#### (Primeramente deberás tener instalado VS Code, configurado a gusto y saber/manejar de Forma Básica una CLI(Terminal-Interfaz de Línea de Comandos o como se le quiera decir. Te recomiendo que consideres la CLI Bash/Shell de Linux)).

</br>

* Para usar angular se necesita instalar Node.js.
   * --> Descarga de Node.js (https://nodejs.org/en/)
* Abrír el Archivo Descargado e Instalar(Siguiente y Siguiente...).
* Angular Depende del 'npm package manager' de Node.js, cuando se descarga este, viene todo incluido.
* Comprobamos la Instalación de Angular desde una CLI.
   * --> Abrir el cmd en Windows, bash-shell en Linux, o terminal en VS Code
   * --> escribir `npm -v`.
   * --> Si no surgió ningún error te debería aparecer la Versión de Node.js, ya está instalado Node.js

</br>

### Paso 2) Instalación de la CLI de Angular
#### (La CLI de Angular nos ayudará a Crear Proyectos, generar Código, depurar, etc).

</br>

* Teniendo Instalado el Sistema de Gestión de Angular en Nuestra Computadora, trabajaremos todo desde la CLI
* Abrir el cmd en Windows, bash-shell en Linux, o terminal en VS Code y escribir `npm install -g @angular/cli`.
* Si se instalo correctamente la cli de Angular, escribiendo `ng help` se debería poder visualizar la lista de comandos y la versión.(Paciencia porque las ejecuciones de angular son lerdas).


</br>

### Paso 3) Creación de una Aplicación Web con Angular.
#### (Este es uno de los pasos más tediosos ya que para la creación de una App en Angular viene intrínsico el proceso de construcción de Paquetes, creación de Módulos, Deploy de la App en el Servidor de Angular, etc).

</br>

* Primeramente deberás ubicarte en la carpeta que deseas construir la app con Angular.
   * --> En mi caso crearé la app en mi ruta ANGULAR/Proyectos2021
   * --> Abrimos una Nueva Terminal en VS Code y 
   * --> Escribimos `ng new 'nombreDelProyectoSinComillasTodoSeguido' ` en mi caso `ng new 'crudAngularFirebaseBootstrap' `
   * --> Seguidamente nos pregunta si queremos agregar una routing, escribimos yes o y
   * --> Ahora cual Lenguaje de Maquetación queremos, elegimos CSS.
   * --> Esperamos a que se cree el Proyecto(este paso lleva tiempo).

</br>

### Paso 4)  Deployar la Aplicación con Angular
#### (La CLI de Angular incluye un Servidor Local )

</br>

* Nos posicionamos sobre la carpeta creada `cd crudAngularFirebaseBootstrap`
   * --> Escribimos por consola  `ng serve --open`
   * --> Si nos preguntan algo escribimos yes o y
   * --> El último paso suele tardar un poco
   * --> Si se abre el navegador con la página de inicio de Angular está todo Correcto.

</br>




</br>

## Sección 2) Manejo e Implementación de Bootstrap

</br>




### Paso 5) Implementar Bootstrap con Angular
#### ( Bootstrap es un Framework Web que nos permite realizar aplicaciones de forma más rápidas y con estructuras modernas. Para este caso no vamos a instalar los paquetes de bootstrap, sino incluir CDN's, osea linkear servidores de boostrap para trabajar con sus librerías )

</br>

#### 5.1) Incluir el CSS desde el CDN de Bootstrap en el index.html
* Nos dirijimos al `index.html`
* Incluimos la hoja de estilo dentro del head 
* Código en la Página oficial https://getbootstrap.com/docs/5.1/getting-started/introduction/ o acá..

```html
<!--CSS BOOTSTRAP-->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

```

* Guardamos cambios (Ctrl+s)


#### 5.2) Incluir JS desde el CDN de Bootstrap en el index.html
* Notar que para Javascript se utiliza junto con la librería Popper
* Bootstrap nos proporciona un CDN con todo incluido
* Incluimos el CDN dentro del body
* Código en la Página Oficial https://getbootstrap.com/docs/5.1/getting-started/introduction/ o acá..


```html

<!--JS Bootstrap-->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

```
* Guardamos cambios (Ctrl+s)
* Si visualizas nuevamente la aplicación se podrá notar la diferencia de tamaños y colores, tenemos implementado Bootstrap


</br>

  ## Sección 3) Módulos y Componentes de Angular

</br>


### Paso 6) Generación y Configuración de Componentes y Módulos con Angular
#### (Todos los componentes y Módulos de Angular están dentro de sus respectivos directorios o carpetas(en este caso el directorio es app, que a su vez es el módulo padre), vamos a realizar lo mismo con Boostrap , crearemos los componentes y módulos y trabajaremos de forma modularizada, respetando el Patrón de Angular)

#### 6.1) Creación del componente y módulo Navbar
* Abrimos una nueva terminal
  * --> View -> Terminal
* Nos posicionamos sobre el proyecto
  * --> Escribimos `cd crud AngularFirebaseBootstrap`
* Creamos el Nuevo Componente modularizado
  * --> Escribimos `ng generate component components/navbar --module app` o `ng g c components/navbar --module app`
* Si desplegas componentes, se debería haber generado el componente, junto con sus archivos
* Ahora creamos el módulo interno de configuración del navbar
  * --> Escribimos `ng generate module components/navbar --module app` o `ng g m components/navbar --module app`

#### 6.2) Configuración del componente html Navbar
* Vamos a incluir el código html de ejemplo de la página de bootstrap en el `navbar.component.html`(app/navbar/navbar.component.html)
* Código https://getbootstrap.com/docs/5.1/components/navbar/


```html

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

* Seguidamente vamos a comprobar si el componente creado se ha importado dentro de `app.module.ts`
* Nos dirigimos al archivo (app/app.module.ts)
* Deberías tener el siguiente código indicando que tenemos el componente importado correctamente

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarModule } from './components/navbar/navbar.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


```

* Seguidamente vamos a incluir el código html del componente navbar dentro del componente app, especificamente dentro de `app.component.html`
* Nos dirijimos a app.component.html(app/app.component.html) y escribimos

```html

<div>

    <app-navbar></app-navbar>

</div>


```

* Guardamos (Ctrl + s )
* Visualizamos el contenido.



</br>

### Paso 7) Imágenes de la Aplicación
#### (Por convención las imágenes locales, iconos web, etc, las guardamos dentro de la carpeta assets).

</br>

#### 7.1) Descarga de Imágenes e Íconos
* Descargar imágenes e iconos a gusto, en mi caso de electrónica
* Ted recomiendo la página https://www.flaticon.es/iconos-gratis/electronica
* Creamos un directorio raiz dentro de `assets` llamado images(src/assets/images)
* Copiamos todas las imágenes descargadas al directorio images
* Incluimos el icono deseado como representación de la tienda y nombre dentro de `navbar.component.html`
* Porción de Código

```html

<header>

     <div>
                <img src="assets/images/elect02.png" alt="" width="40" height="40" class="d-inline-block align-text-top "> ElectroThings
            </div>

</header>

```

### 7.2) Cambio de Título e Ícono de la app
* Nos dirigimos al index.html y en title cambiamos el titulo de la app
* Para cambiar el icono de la app, linkear la imagen descargada desde el `<link rel="icon">`
* Porción de Código

```html

<head>
    <meta charset="utf-8">
    <title>ElectroThings</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="assets/images/elect02.png">


</head>
```





</br>

### Paso 8) Maquetado del Componente con css
#### (Mas allá que implementemos un esplendido framework como bootstrap, no podemos dejar de lado css, ya que nos ayuda a ahorrar lineas spaghettis en el html).

* Dentro del navbar.component.css vamos a implementar el maquetado para este componente.
* Por ahora establecemos el color de texto en blanco y cambiamos el light por el dark dentro del navbar 
* Código

```html

header {
    color: white;
}

img {
    padding-right: 2px;
}

div.collapse {
    margin-left: 15px;
    padding: 5px;
}

```



</br>

  ## Sección 4) Creación y Configuración de Páginas Web

</br>

### Paso 9) Generación de Módulos y Componentes para otras páginas
#### (Nuestra Aplicación tendrá diversas páginas en las cuáles crearemos para el listado de los componentes electrónicos, agregar, modificar, etc).

</br>

#### 9.1) Página listado-componentes
* Vamos a generar un módulo con sus componentes indicando también la ruta del mismo que utilizaremos para la página web deseada. El mismo lo vamos a crear dentro de una nueva ruta (pages/electronica/listado-componentes).
* El comando completo sería `ng g m pages/electronica/listado-componentes --module app --route listado-componentes`
* Abris una nueva terminal y escribir el comando anterior (en mi caso)

</br>


#### 9.2) Página agregar-componentes
* Vamos a generar un módulo con sus componentes indicando también la ruta del mismo que utilizaremos para la página web deseada. El mismo lo vamos a crear dentro de una nueva ruta (pages/electronica/agregar-componentes).
* El comando completo sería `ng g m pages/electronica/agregar-componentes --module app --route agregar-componentes`
* Abris una nueva terminal y escribir el comando anterior (en mi caso)


</br>


#### 9.3) Página editar-componentes
* Vamos a generar un módulo con sus componentes indicando también la ruta del mismo que utilizaremos para la página web deseada. El mismo lo vamos a crear dentro de una nueva ruta (pages/electronica/editar-componentes).
* El comando completo sería `ng g m pages/electronica/editar-componentes --module app --route editar-componentes`
* Abris una nueva terminal y escribir el comando anterior (en mi caso)


</br>


#### 9.4) Página para Ayuda
* Vamos a generar un módulo con sus componentes indicando también la ruta del mismo que utilizaremos para la página web deseada. El mismo lo vamos a crear dentro de una nueva ruta (pages/utilidades/ayuda).
* El comando completo sería `ng g m pages/utilidades/ayuda --module app --route ayuda`
* Abris una nueva terminal y escribir el comando anterior (en mi caso)


</br>


### Paso 10) Ruteo de las páginas de la app
#### (Declarar las rutas con directivas en angular se consideran buenas prácticas, ya que podremos controlar los errores que pudiesen surgir).

* Primeramente hay que incluir la Directiva `<router-outlet></router-outlet>` dentro de `app.component.html`, por qué sino no se establece el ruteo de forma dinámica, osea no se van a mostrar las páginas creadas.


```html

<div>

    <app-navbar></app-navbar>

    <router-outlet></router-outlet>

</div>

```


* Ahora nos dirigimos al `navbar.component.html` y allí modificamos los nav-item agregando las directivas de enlaces `[routerLink] = "['/nombrePagina']"` indicando las páginas de redireccionamiento
* También modifique algunas etiquetas
* Código

```html

<header>

   <header>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">

            <div>
                <img src="assets/images/elect02.png" alt="" width="40" height="40" class="d-inline-block align-text-top "> ElectroThings
            </div>
            <a class="navbar-brand" href="#"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item" routerLinkActive="active">
                        <a class="nav-link" [routerLink]="['/']">Inicio</a>
                    </li>
                    <li class="nav-item" routerLinkActive="active">
                        <a class="nav-link" [routerLink]="['/listado-componentes']">Listado de Componentes</a>
                    </li>
                    <li class="nav-item" routerLinkActive="active">
                        <a class="nav-link" [routerLink]="['/agregar-componentes']">Agregar Componentes</a>
                    </li>
                    <li class="nav-item" routerLinkActive="active">
                        <a class="nav-link" [routerLink]="['/editar-componentes']">Editar Componentes</a>
                    </li>
                    <li class="nav-item" routerLinkActive="active">
                        <a class="nav-link" [routerLink]="['/ayuda']">Ayuda</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

</header>

```








</br>
</br>
</br>
</br>
</br>







## Subir el proyecto al repositorio con git desde el bash de visual studio Code 

#### 1)Creamos un nuevo repositorio en GitHub

#### 2)Inicializamos nuestro repositorio local .git
* git init

#### 3)Agregamos lo desarrollado a nuestro repo local
* git add *

#### 4)Agregamos lo que tenemos en nuestro repo local al área de Trabajo.
* git commit -m "agrega un comentario entre comillas"

### 5)Le indicamos a git donde se va a almacenar nuestro proyecto(fijate en tu repositorio de github cual es el enlace de tu proyecto(esta en code)).
* git remote add origin https://github.com/andresWeitzel/WebAppModuloAngularBootstrap.git

### 6)Subimos nuestro proyecto.
* git push -u origin master

</br>

## Actualización del repositorio del proyecto con git desde el bash de visual studio code

### 1)Visualizamos las modificaciones realizadas en local
* git status

### 2)Agregamos lo modificado al area de trabajo
* git add *

### 3)Confirmamos las modificaciones realizadas
* git commit -m "Tu commit entre comillas"

### 4)Sincronizamos y traemos todos los cambios del repositorio remoto a la rama en la que estemos trabajando actualmente.
##### Desconozco porqué tengo que ejecutar este comando, supongo que será porque no estoy trabajando con branchs en mi proyecto, el main por defecto de gitHub ahora es mi master(Yo realicé esa modificación para mejor visualización)).
* git pull https://github.com/andresWeitzel/WebAppAngularBootstrap.git

### 5)Enviamos todos los cambios al repo en github
* git push https://github.com/andresWeitzel/WebAppAngularBootstrap.git

</br>

## Deploy de la app desde el bash de visual studio code

### 1) Instalar el cli global
 * npm i netlify-cli
 * netlify login
 * netlify status
 * netlify --version

### 2) Build 
 * ng build --prod 

### 3) Deploy
* netlify deploy --prod
#### IMPORTANTE: Luego de ingresar este comando, asegurarse de colocar correctamente el `Publish directory` , sino no se va a deployar correctamente, en general es  `dist/'nombre de tu proyecto sin comillas' ` 
