import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  name: string ;
  email:string;
  constructor() {}

  ngOnInit(): void {
    this.name=history.state.username;
    this.email=history.state.useremail;
    this.details();
  }
details(){
console.log(history.state.name,history.state.email)
}
}
