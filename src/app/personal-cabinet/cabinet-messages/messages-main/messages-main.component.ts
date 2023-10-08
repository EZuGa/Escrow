import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IMessages } from 'src/app/shared/interfaces/IMessages';

@Component({
  selector: 'app-messages-main',
  templateUrl: './messages-main.component.html',
  styleUrls: ['./messages-main.component.scss']
})
export class MessagesMainComponent implements OnInit, OnChanges{

  @Input() messages!: IMessages[];
  @Input() onReceivedPage = true;
  messageToDisplay:IMessages | undefined;


  ngOnChanges(changes: SimpleChanges){
    this.messageToDisplay = undefined;
  }

  ngOnInit(): void {
  }

  chooseMessage(message:IMessages){
    this.messageToDisplay = message;
  }
}
