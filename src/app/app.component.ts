import { Component } from '@angular/core';
import { RoutesService } from './services/routes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(public route: RoutesService){}
}
