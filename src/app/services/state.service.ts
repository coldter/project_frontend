import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Student } from '../models/student.model';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  private listUpdates = new Subject<string>();
  private searchUpdates = new Subject<Student[]>();
  public listUpdates$ = this.listUpdates.asObservable();
  public searchUpdates$ = this.searchUpdates.asObservable();
  constructor() { }

  public updateList() {
    console.log('update');
    this.listUpdates.next('update');
  }

  public search(results: Student[]) {
    this.searchUpdates.next(results);
  }
}
