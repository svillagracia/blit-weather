import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../services/weather/weather.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public weatherNow: any;
  public forecast: any;
  public celsius = false;
  public usingStorage = false;
  public address: FormGroup;

  constructor(
    private weather: WeatherService,
    private _fb: FormBuilder
  ) {
    this.address = this._fb.group({
      address: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern(/\w/)]],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)]],
      country: [''],
    });
  }

  ngOnInit() { }

  public findWeather(address: any): void {
    this.usingStorage = false;
    this.weatherNow = null;
    if (localStorage.getItem(address.zipCode)) {
      const storedData = JSON.parse(localStorage.getItem(address.zipCode));
      if (this.timeDifference(storedData.lastSearched, Date.now()) >= 30) {
        console.log('Removing old weather data');
        localStorage.removeItem(address.zipCode);
        this.callApi(address);
      } else {
        console.log('using stored data');
        this.usingStorage = true;
        this.weatherNow = storedData;
      }
    } else {
      console.log('finding new data');
      this.callApi(address);
    }
  }

  public cel2Far(): void {
    this.celsius = !this.celsius;
  }

  private callApi(address) {
    this.weather.forecastWeather(address.zipCode).subscribe(data => {
      this.weatherNow = data;
      this.weatherNow.lastSearched = Date.now();
      localStorage.setItem(address.zipCode, JSON.stringify(this.weatherNow));
      console.log(this.weatherNow);
    });
  }

  private timeDifference(date1: any, date2: any): number {
    let difference = new Date(date2).getTime() - new Date(date1).getTime();

    const minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;
    console.log('Time difference is ' + minutesDifference);
    return minutesDifference;
  }

}
