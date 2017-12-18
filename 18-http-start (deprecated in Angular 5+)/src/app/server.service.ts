import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ServerService {
  constructor(private http: Http) {

  }

  storeServers(servers: any[]) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put(
      'https://angular-http-test-3ec8b.firebaseio.com/data.json', 
      servers, 
      {headers});
  }

  getServers() {
    return this.http.get('https://angular-http-test-3ec8b.firebaseio.com/data.json')
      .map((response: Response) => {
        const data = response.json();
        for (const server of data) {
          server.name = 'TETCHED_' + server.name;
        }
        return data;
      })
      .catch((error: Response) => {
        return Observable.throw('Something went wrong');
      });
  }


  getAppName() {
    return this.http.get('https://angular-http-test-3ec8b.firebaseio.com/appName.json').map((response: Response) => {
      return response.json()
    });
  }
}