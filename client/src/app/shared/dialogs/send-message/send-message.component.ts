import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MessagesService } from '../../services/messages/messages.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent {

  isLoading = false;

  messageForm = this.fb.group({
    content: ['', Validators.required],
    subject: ['', Validators.required]
  })

  constructor(private fb: NonNullableFormBuilder,private messageService: MessagesService, private dialogRef: MatDialogRef<SendMessageComponent>){}

  sendMessage(){
    this.isLoading = true;
    this.messageService.sendMessage(this.messageForm.getRawValue())
    .pipe(finalize(()=>{
      this.dialogRef.close();
      this.isLoading = false
    }))
    .subscribe();
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
