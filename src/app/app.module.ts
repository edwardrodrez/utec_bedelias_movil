import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalExamenComponent } from './pages/modal-examen/modal-examen.component';
import { ModalLectivoComponent } from './pages/modal-lectivo/modal-lectivo.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HttpErrorInterceptor } from './services/error-interceptor.service';
PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
  declarations: [AppComponent, ModalExamenComponent, ModalLectivoComponent],
  entryComponents: [ModalExamenComponent, ModalLectivoComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptorService,multi: true},
    {provide: HTTP_INTERCEPTORS,useClass: HttpErrorInterceptor,multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
