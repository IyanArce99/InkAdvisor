import { Component } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  tabs: string[] = ['Publicacion guardadas', 'Artistas guardados'];
  tabSelected: number = 0;
  constructor() {}

  changeTab(index: number): void {
    this.tabSelected = index;
  }
}
