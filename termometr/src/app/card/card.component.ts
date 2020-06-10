import { Component, OnInit } from '@angular/core';

import { WeatherObj } from '../model/weather-obj';
import { HttpService } from '../services/http-service.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public logo = require('../../assets/logo.jpg');
  public localArr = [];
  public temperature;
  public localisation;
  public rain;
  public terrainTemperature;
  public wetness;
  public time;
  public windDirection;
  public indexData;
  public indexDataStorage;
  public indexFound = false;
  public buttonMessage = false;
  public buttonDisable = false;

  constructor(private http: HttpService) {
   }

  ngOnInit() {
    /* Get data from API for Lotnicza localisation, as default. */
    this.http.getValues().subscribe((data:any) => {

      if(data.status === 200){
        console.warn('Server response code: ' + data.status)
        for(let i=0; i<data.body.result.records.length; i++){
          this.localArr.push(data.body.result.records[i])
          console.log(this.localArr[i])
          if(this.localArr[i]._id == localStorage.getItem(this.indexDataStorage)){
            this.indexFound = true;
          }
        }
        /* Delete record from Widawska and Gądowianka street, since it wasn't updated for long time */
        this.localArr.splice(0,2);
        console.log(this.localArr)

        if(this.indexFound){
          this.buttonDisable = true;

          this.temperature = this.localArr[localStorage.getItem(this.indexDataStorage)].T_Powietrza;
          console.log(this.temperature);

          this.localisation = this.localArr[localStorage.getItem(this.indexDataStorage)].Lokalizacja_Opis;
          console.log(this.localisation);

          this.rain = this.localArr[localStorage.getItem(this.indexDataStorage)].Opad_Typ;
          console.log(this.rain);

          this.terrainTemperature = this.localArr[localStorage.getItem(this.indexDataStorage)].T_Grunt;
          console.log(this.terrainTemperature);

          this.wetness = this.localArr[localStorage.getItem(this.indexDataStorage)].Wilgotnosc;
          console.log(this.wetness);

          this.time = this.localArr[localStorage.getItem(this.indexDataStorage)].Czas_Rejestracji;
          console.log(this.time);

          this.windDirection = this.localArr[localStorage.getItem(this.indexDataStorage)].Wiatr_Kierunek;
          console.log(this.windDirection);
        } else {
          this.temperature = this.localArr[0].T_Powietrza;
          console.log(this.temperature);

          this.localisation = this.localArr[0].Lokalizacja_Opis;
          console.log(this.localisation);

          this.rain = this.localArr[0].Opad_Typ;
          console.log(this.rain);

          this.terrainTemperature = this.localArr[0].T_Grunt;
          console.log(this.terrainTemperature);

          this.wetness = this.localArr[0].Wilgotnosc;
          console.log(this.wetness);

          this.time = this.localArr[0].Czas_Rejestracji;
          console.log(this.time);

          this.windDirection = this.localArr[0].Wiatr_Kierunek;
          console.log(this.windDirection);

          this.buttonDisable = false;
        }
      } else {
        console.error('Server response code: ' + data.status)
      }
    })
  }

  /* Function that is triggered when selected localisation.
     Get data from API and with proper index of selected localisation, showing results. */
  onSubmit(event){
    console.log(event.target.selectedIndex);
    this.http.getValues().subscribe((data:any) => {
      if(data.status === 200){

        // console.log('Server response code :' + data.status)
        // /* Clear localArr array for fresh weather data */
        // this.localArr.splice(0, this.localArr.length);

        // for(let i=0; i<data.body.result.records.length; i++){
        //   this.localArr.push(data.body.result.records[i])
        // }

        // /* Delete record from Widawska street, since it wasn't updated for long time */
        // this.localArr.splice(0,1)
        // console.log(this.localArr);

        this.indexData = event.target.selectedIndex - 1;
        console.warn(this.indexData);

        this.temperature = this.localArr[this.indexData].T_Powietrza;
        console.log(this.temperature);

        this.localisation = this.localArr[this.indexData].Lokalizacja_Opis;
        console.log(this.localisation);

        this.rain = this.localArr[this.indexData].Opad_Typ;
        console.log(this.rain);

        this.terrainTemperature = this.localArr[this.indexData].T_Grunt;
        console.log(this.terrainTemperature);

        this.wetness = this.localArr[this.indexData].Wilgotnosc;
        console.log(this.wetness)

        this.time = this.localArr[this.indexData].Czas_Rejestracji;
        console.log(this.time);

        this.windDirection = this.localArr[this.indexData].Wiatr_Kierunek;
        console.log(this.windDirection);

        /* set button on, as default option, before checking with localisation */
        this.buttonDisable = false;

        /* Check if current localisation is default and if so, disable button */
        if(this.indexData == localStorage.getItem(this.indexDataStorage)){
          console.log('thats, true');
          this.buttonDisable = true;
        }
      } else {
          console.log('Sever response code: ' + data.status)
      }
    })
  }

  setAsDefault(event){
      localStorage.setItem(this.indexDataStorage, this.indexData);
      console.log(localStorage.getItem(this.indexDataStorage));
      this.buttonMessage = !this.buttonMessage;
      setTimeout(() => {
        this.buttonMessage = !this.buttonMessage;
      }, 2000);
      /* Disable button */
      this.buttonDisable = true;
  }
}
