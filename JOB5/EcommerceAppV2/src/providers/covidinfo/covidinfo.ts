import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvProvider } from '../env/env';


@Injectable()
export class CovidinfoProvider {

  constructor(public http: HttpClient, private env: EnvProvider) {
    console.log('Hello CovidinfoProvider Provider');
  }

    getIdCovid(){return this.http.get(this.env.COVID_ID_API_URL).pipe(response => {
      return response;
    })
  }

    getWroldCovid(){return this.http.get(this.env.COVID_WORLD_API_URL).pipe(response => {
    return response;
    })
  }
}
