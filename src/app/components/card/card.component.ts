import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  pics: string[] =['pic_1.jpg', 'pic_2.jpg', 'pic_1.jpg'];
  translateXIndex: number = 0;
  picSelected: number = 0;
  constructor() { }

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



}
