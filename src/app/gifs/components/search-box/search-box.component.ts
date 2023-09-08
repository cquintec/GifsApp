import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gif.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar</h5>
    <input type="text"
    class="form-control"
    placeholder="Buscar gifs"
    (keyup.enter)="searchTag()"
    #txtTagInput>
  `
})

export class SearchBoxComponent {
 // Inyectar los services al componente
  constructor(private gifService: GifsService ) {}

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  searchTag(): void{
    const newTag = this.tagInput.nativeElement.value;
    this.gifService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }

}
