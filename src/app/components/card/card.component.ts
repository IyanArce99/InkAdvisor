import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TatuadorPerfilComponent } from '../tatuador-perfil/tatuador-perfil.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  pics: string[] =['pic_1.jpg', 'pic_2.jpg', 'pic_1.jpg'];
  translateXIndex: number = 0;
  picSelected: number = 0;

  @Input() user: any;
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  changeImg(position: number): void {
    this.changeTranslate(position);
    this.picSelected = position;
  }

  changeTranslate(newPosition: number): void {
    let cardContent = document.getElementById('card-content');
    let width: number = cardContent.offsetWidth;

    this.translateXIndex += (this.picSelected - newPosition) * width;
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: TatuadorPerfilComponent,
      cssClass: 'my-custom-class',
      mode: 'ios',
      swipeToClose: true,
      componentProps: {user: this.user}
    });
    return await modal.present();
  }


}
