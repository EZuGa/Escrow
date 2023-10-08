import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SendMessageComponent } from 'src/app/shared/dialogs/send-message/send-message.component';
import { IMessages } from 'src/app/shared/interfaces/IMessages';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';

@Component({
  selector: 'app-cabinet-messages',
  templateUrl: './cabinet-messages.component.html',
  styleUrls: ['./cabinet-messages.component.scss']
})
export class CabinetMessagesComponent implements OnInit{

  onReceivedPage = true;

  receivedMessages!: IMessages[];
  sentMessages!: IMessages[];


  constructor(private messageService: MessagesService, private dialog: MatDialog){}



  ngOnInit(): void {

    this.messageService.sentdMesasges.subscribe(messages=>{
      this.sentMessages = messages!
    });

    this.messageService.receivedMesasges.subscribe(messages=>{
      this.receivedMessages = messages!;
    });
  }

  sendMessage(){
    this.dialog.open(
      SendMessageComponent,
      {
        width: '80%',
      }
      );
  }
  

}
