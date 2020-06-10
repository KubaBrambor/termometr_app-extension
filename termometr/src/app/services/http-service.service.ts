import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'

import { WeatherObj } from '../model/weather-obj'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  /*
  Added proxy "cors-anywhere" to prevent cros-policy error. It can slow data loading process. 
  If it's slow, delete first part of link and use extension "Moesif Origin Cors Changer" 
   LINK -> https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc

   link to proxy -> https://cors-anywhere.herokuapp.com/
  */
  private proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  private url = 'https://www.wroclaw.pl/open-data/api/action/datastore_search?resource_id=9d5b2336-6f9a-4fa0-8cbe-d6b4776194c3'
  
  constructor(private http: HttpClient) { }

  getValues(): Observable<HttpResponse<WeatherObj[]>>{
    return this.http.get<WeatherObj[]>(this.proxyUrl + this.url, {
      observe: 'response'
    })
  }
}
