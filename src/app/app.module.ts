import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarModule } from './components/navbar/navbar.module';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselModule } from './components/carousel/carousel.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
