import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/messaging.service';

@Component({
  selector: 'app-sent-message',
  templateUrl: './sent-message.component.html',
  styleUrls: ['./sent-message.component.css']
})
export class SentMessageComponent implements OnInit {

  message: string;
  firstMessage = true;

  constructor(private msgService: MessagingService) { }

  ngOnInit() {
    this.msgService.messageSent.subscribe((msg: string) => {
      this.firstMessage = false;
    });
  }

}
