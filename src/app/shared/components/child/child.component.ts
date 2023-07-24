import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnDestroy {

  private unsubscribe$ = new Subject<void>();

  @Input() messageFromParent?: string;
  @Output() messageToParent = new EventEmitter<string>();

  constructor(private messageService: MessageService) { }

  sendMessageByOutput(): void {
    this.messageToParent.emit("CHILD USING OUTPUT EVENT");
  };

  receiveMessageFromService(): void {
    this.messageToParent.emit(this.messageService.getMessageToParent());
  };

  receiveMessageFromObservable(): void {
    this.messageService.getChildTextSubject()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(rest => this.messageToParent.emit(rest));
  };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  };

}
