import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesService } from '../services/routes.service';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Notification } from '../models/notification.model';
import { NotificationService } from '../services/notification.service';
import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';
import { RestService } from '../services/rest.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  href: string;
  isRoundButton = true;
  name = '';
  email = '';
  isLogged = false;
  notifs: Notification[];
  searchText = '';
  notifCount: number;
  students: Student[] = [];


  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private http: HttpClient,
    public routes: RoutesService,
    private stateServ: StateService,
    public rest: RestService,
    public auth: AuthService,
    private notifService: NotificationService) {
    this.auth.loginObserver$.subscribe((login) => {
      console.log('login event');
      if (login) {
        this.name = login.user.name;
        this.email = login.user.email;
        this.isLogged = true;
      }
      else {
        this.name = '';
        this.email = '';
        this.isLogged = false;
      }
    });
    this.auth.loadLogin();
    this.notifService.notifsObserver$.subscribe(notifs => this.notifs = notifs);
    this.notifService.notifsCountObserver$.subscribe(count => this.notifCount = count);
    // this.fetchNotif();
  }

  ngOnInit(): void {


  }
  fetchNotif() {
    this.notifs = this.notifService.getAllNotifs();
    this.notifCount = this.notifs.length;
  }
  isActive() {
    this.href = this.router.url;
  }

  onLogin() {

    this.router.navigate(['/']);

  }
  onRegister() {
    this.router.navigate(['/']);
  }
  logout() {
    this.auth.logout();
    this.notifCount = 0;
    this.router.navigate(['login']);
  }

  goBack() {
    window.history.back();
  }

  async search() {
    console.log(this.searchText);
    const resp = await this.rest.getStudentonSearch(this.searchText);
    console.log(resp.data.length);
    this.stateServ.search(resp.data);
  }

  manage() {
    this.router.navigate(['/user'], { state: { username: this.name, useremail: this.email } });
  }
}
