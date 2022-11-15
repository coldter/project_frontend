import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifs: Notification[] = [];
  count = 0;
  notifsObserver = new Subject<Notification[]>();
  notifsObserver$ = this.notifsObserver.asObservable();
  notifsCountObserver = new Subject<number>();
  notifsCountObserver$ = this.notifsCountObserver.asObservable();
  constructor() { }

  getAllNotifs() {
    return this.notifs;
  }

  addNotifs(message: string) {
    const notif: Notification = {
      message,
      date: new Date()
    };
    this.notifs = [notif].concat(this.notifs);
    this.notifsObserver.next(this.notifs);
    this.count += 1;
    this.notifsCountObserver.next(this.count);
  }
}
