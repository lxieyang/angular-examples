import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';   // unlock map()
import { Observable } from "rxjs/Observable";

@Injectable()
export class ServerService {
  constructor(private http: Http) {

  }

  storeServers(servers: any[]) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    // create observable, not sent!
    // return this.http.post(
    //   'https://angular-http-test-3ec8b.firebaseio.com/data.json', 
    //   servers, 
    //   {headers: headers}
    // );

    // create observable, not sent!
    return this.http.put(   // put request will overwrite existing data
      'https://angular-http-test-3ec8b.firebaseio.com/data.json', 
      servers, 
      {headers: headers}
    );
  }

  getServers() {
    return this.http.get('https://angular-http-test-3ec8b.firebaseio.com/data.json').map((response: Response) => {  // map will return a new observable
      const data = response.json();
      // for (const server of data) {
      //   server.name = 'FETCHED_' + server.name;
      // }
      return data;
    }).catch((error: Response) => {
      // deal with error here
      return Observable.throw('Something went wrong');   // have to be an Observable
    });
  }

  getAppName() {
    return this.http.get('https://angular-http-test-3ec8b.firebaseio.com/appName.json').map((response: Response) => {
      return response.json();
    });
  }
}