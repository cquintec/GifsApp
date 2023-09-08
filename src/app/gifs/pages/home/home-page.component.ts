import { Component } from '@angular/core';
import { GifsService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  //al inyectar el service, siempre hacer el get
  constructor(private gifService: GifsService) {}

  get gifs(): Gif[]{
    return this.gifService.gifList;
  }
}
