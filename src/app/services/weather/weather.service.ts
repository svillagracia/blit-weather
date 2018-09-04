import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class WeatherService {

  constructor(private http: HttpService) { }

  public forecastWeather(query: any): any {
    return this.http.get('forecast', `${query}&days=7`);
  }

}
