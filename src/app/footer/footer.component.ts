import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesService } from '../services/routes.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
newMode = false;
  constructor(public routes: RoutesService) { }

  ngOnInit(): void {
  }
 onAdd(){
this.newMode  =  true;

 }
}
