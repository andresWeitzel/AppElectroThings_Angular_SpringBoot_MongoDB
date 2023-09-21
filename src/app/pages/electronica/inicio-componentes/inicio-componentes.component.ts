import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-componentes',
  templateUrl: './inicio-componentes.component.html',
  styleUrls: ['./inicio-componentes.component.scss']
})
export class InicioComponentesComponent implements OnInit {
  //ImgPaths
  imgHelp = "/assets/images/help02.png";
  imgBgRedBlack01 = "/assets/background/red-back-10.jpg";
  imgBgRedBlack02 = "/assets/background/red-back-01.jpg";
  imgBgRedBlue = "/assets/background/red-back-12.jpg";
  imgBooks = "assets/images/list-products.png";
  imgPackage = "assets/images/package.png";
  imgHand = "assets/images/edit.png";
  imgGraphics = "assets/images/graphics02.png";
  imgNotebook = "assets/images/productsAbout.png";
  imgMegaphone = "assets/images/megaphone.png";




  constructor() { }

  ngOnInit(): void {
  }

}
