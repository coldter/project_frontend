import { Component, OnInit, Inject } from '@angular/core';
import { RoutesService } from '../services/routes.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  registerUserData = <any>{};

  login = true;
  register = false;
  constructor(public route: RoutesService,
    private auth: AuthService,
    public router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.auth.getLogin()) {
      this.router.navigate(['dashboard']);
    }
  }

  async loginUser(f: NgForm) {
    const value = f.value;
    console.log(value);
    const { email, password } = value;
    const resp = await this.auth.loginUser(email, password);
    console.log(resp);
    if (resp.status===true) {
      this.auth.storeLogin(resp.data);
      this.router.navigate(['dashboard']);
    }
    else{
      alert("False")
    }
    
  }

  tab() {
    this.login = !this.login;
  }
}
