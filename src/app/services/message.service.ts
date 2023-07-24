import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageToParent = "PARENT USING SERVICE";
  private messageToChild = "CHILD USING SERVICE";


  private parentSubject$ = new BehaviorSubject<string>("PARENT USING OBSERVABLE");
  private childSubject$ = new BehaviorSubject<string>("CHILD USING OBSERVABLE");

  constructor() { }

  getMessageToParent(): string {
    return this.messageToParent;
  }

  getMessageToChild(): string {
    return this.messageToChild;
  }

  setParentSubject(value: string): void {
    this.parentSubject$.next(value)
  };

  getParentTextSubject(): Observable<string> {
    return this.parentSubject$.asObservable();
  };

  getChildTextSubject(): Observable<string> {
    return this.childSubject$.asObservable();
  };



}
