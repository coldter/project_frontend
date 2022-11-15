import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Login } from '../models/auth.model';
import { ServerResponse } from '../models/server-response.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/';
  login: Login;
  loginObserver = new Subject<Login>();
  loginObserver$ = this.loginObserver.asObservable();
  constructor(private http: HttpClient) {
    this.loadLogin();
  }

  loadLogin() {
    if (localStorage.getItem('LOGIN')) {
      this.login = JSON.parse(localStorage.getItem('LOGIN'));
      console.log(this.login);
      this.loginObserver.next(this.login);
    }
  }

  public registerUser(user: User): Promise<ServerResponse<User>> {
    const url = `${this.baseUrl}auth/register`;
    return this.http.post<ServerResponse<User>>(url, user).toPromise();
  }

  public loginUser(email: string, password: string): Promise<ServerResponse<Login>> {
    const url = `${this.baseUrl}auth/login`;
    return this.http.post<ServerResponse<Login>>(url, { email, password }).toPromise();
  }

  public storeLogin(log: Login) {
    this.login = log;
    localStorage.setItem('LOGIN', JSON.stringify(this.login));
    this.loginObserver.next(this.login);
  }

  public getLogin(): Login {
    return this.login;
  }

  public logout() {
    this.login = null;
    this.loginObserver.next(null);
    localStorage.clear();
  }
}
