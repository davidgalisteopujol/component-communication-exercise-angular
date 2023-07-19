import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnDestroy {

  public messageToChild: string = "";
  public messageFromChild: string = "";
  private unsubscribe$ = new Subject<void>();

  constructor(private messageService: MessageService) { }

  sendMessageByInput(): void {
    this.messageToChild = "PARENT USING INPUT PROPERTY";
  };

  receiveMessageFromChild(event: string): void {
    this.messageFromChild = event;
  };

  receiveMessageFromService(): void {
    this.messageToChild = this.messageService.messageToChild;
  };

  receiveMessageFromObservable(): void {
    this.messageService.getParentTextSubject()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(message => this.messageToChild = message);
  };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  };

}
