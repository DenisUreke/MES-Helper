import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SqlQueryObservableService {

  private sqlQuerySource = new BehaviorSubject<string>('');
  public currentSqlQuery$: Observable<string> = this.sqlQuerySource.asObservable();

  constructor() { }

 updateSqlQuery(query: string): void {
   this.sqlQuerySource.next(query);
 }
}
