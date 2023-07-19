import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messageToParent: string = "CHILD USING SERVICE";
  public messageToChild: string = "PARENT USING SERVICE";

  private parentSubject$ = new BehaviorSubject<string>("PARENT USING OBSERVABLE");
  private childSubject$ = new BehaviorSubject<string>("CHILD USING OBSERVABLE");

  constructor() { }

  getChildTextSubject(): Observable<string> {
    return this.childSubject$.asObservable();
  };

  getParentTextSubject(): Observable<string> {
    return this.parentSubject$.asObservable();
  };

}
