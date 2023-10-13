import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeWhile } from 'rxjs';
import { SendMessageComponent } from 'src/app/shared/dialogs/send-message/send-message.component';
import { IMessages } from 'src/app/shared/interfaces/IMessages';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';

@Component({
  selector: 'app-cabinet-messages',
  templateUrl: './cabinet-messages.component.html',
  styleUrls: ['./cabinet-messages.component.scss']
})
export class CabinetMessagesComponent implements OnInit, OnDestroy{

  componentAlive$ = true;

  onReceivedPage = true;

  receivedMessages!: IMessages[];
  sentMessages!: IMessages[];


  constructor(private messageService: MessagesService, private dialog: MatDialog){}



  ngOnInit(): void {

    this.messageService.sentdMesasges
    .pipe(
      takeWhile(v=>this.componentAlive$)
    )
    .subscribe(messages=>{
      this.sentMessages = messages!
    });

    this.messageService.receivedMesasges
    .pipe(
      takeWhile(v=>this.componentAlive$)
    )
    .subscribe(messages=>{
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
  
  ngOnDestroy(): void {
    this.componentAlive$ = false;
  }
}
