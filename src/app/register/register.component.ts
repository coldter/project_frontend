import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  alert:boolean=false;
  danger=false;

  constructor(public route: RoutesService,
    private auth: AuthService,
    public router: Router) { }

  ngOnInit(): void {
    if (this.auth.getLogin()) {
      this.router.navigate(['dashboard']);
    }
  }

  hide = true;
  registerUserData =<any>{};
  match=false;

  register = false;
  
 async registerUser(f: NgForm) {
    const value = f.value;
    console.log(value);
    const { name, email, password } = value;
    const resp = await this.auth.registerUser({ name, email, password });
    console.log(resp);
    
    if (resp.status) {
       //this.tab();
       this.alert=true;
       f.resetForm();
     }
     else{
       this.danger=true;

     }
  }

  onClose(){
    this.alert=false;
    this.router.navigate(['login'])

  }

  tab() {
    this.register = !this.register;
  }
}
  