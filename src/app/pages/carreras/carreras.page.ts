import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { ModalExamenComponent } from '../modal-examen/modal-examen.component';
import { ModalLectivoComponent } from '../modal-lectivo/modal-lectivo.component';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.page.html',
  styleUrls: ['./carreras.page.scss'],
})
export class CarrerasPage{

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  items = ["Tecnologo Informatico","Tecnologo Mecanico","Tecnologo Mecanico","Tecnologo Mecanico","Tecnologo Mecanico","Tecnologo Mecanico","Tecnologo Mecanico"];
  constructor(private modalCtrl: ModalController) {}

  async openExamenes(){
    const modal = await this.modalCtrl.create({
      component: ModalExamenComponent
    });
    await modal.present();
  }
  async openLectivos(){
    const modal2 = await this.modalCtrl.create({
      component: ModalLectivoComponent
    });

    await modal2.present();
  }
}
