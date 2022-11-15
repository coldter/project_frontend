import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  route: string;
  constructor() {
    this.route = '';
  }

  setRoute(rt: string) {
    console.log(rt);
    this.route = rt;
  }
}
