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

  filteredMessages!: IMessages[];
  currentMessage:IMessages | undefined;


  ngOnChanges(changes: SimpleChanges){
    this.currentMessage = undefined;
    this.filteredMessages = this.messages;
  }

  ngOnInit(): void {
  }

  searchMessage(input:string){
    this.filteredMessages = this.messages.filter(val=>val.content.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
    this.currentMessage = undefined;
  }

  chooseMessage(message:IMessages){
    this.currentMessage = message;
  }
}
