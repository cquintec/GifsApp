import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {
  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    // this.onLoadPage();
  }

  public gifList: Gif[] = [];
  private _tagHistory: string[]= [];
  private apikey: string = '5B2Kf4kkofcWY7ecgxgf0c9OAcQmmFkO';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';

  get tagHistory() {
    return [...this._tagHistory];
  }

  // private onLoadPage(): void{
  //   const temporalList = this._tagHistory;
  //   this.searchTag( temporalList.shift()?.toString()! )
  // }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if(this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter( (oldTag) => oldTag!== tag )
    }
    this._tagHistory.unshift( tag );
    this._tagHistory = this.tagHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void{
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private loadLocalStorage(): void{
    if(!localStorage.getItem('history')) return;

    this._tagHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagHistory.length === 0) return;
    this.searchTag(this._tagHistory[0]);

  }

  searchTag( tag: string ): void {
    if(tag.length === 0) return;
    this.organizeHistory(tag);

    const params= new HttpParams()
      .set('api_key',this.apikey)
      .set('limit','10')
      .set('q',tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{ params })
      .subscribe(resp =>{
        this.gifList = resp.data;
        console.log({ gifs: this.gifList });
      })
  }

}
