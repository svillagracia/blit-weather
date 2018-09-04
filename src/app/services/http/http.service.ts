import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

  private baseUrl = 'https://api.apixu.com/v1/current.json?key=46972e2f4f1e41cfbfd170357180409&q=';

  constructor(private http: HttpClient) {}

  public get(when: string, url: string): Observable<any> {
    return this.http.get(`https://api.apixu.com/v1/${when}.json?key=46972e2f4f1e41cfbfd170357180409&q='` + url);
  }
}
