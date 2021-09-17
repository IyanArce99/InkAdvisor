import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tatuador-perfil',
  templateUrl: './tatuador-perfil.component.html',
  styleUrls: ['./tatuador-perfil.component.scss'],
})
export class TatuadorPerfilComponent implements OnInit {
  listImgs: string[] = ['pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg', 'pic_1.jpg'];
  @Input() name: string;
  @Input() user: any;
  @Input() description: string;
  constructor() { }

  ngOnInit() {}

}
