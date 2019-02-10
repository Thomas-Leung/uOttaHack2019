import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  messages: string[] = [];
  toxic = false;

  constructor(private msgService: MessagingService) { }

  ngOnInit() {
    this.msgService.sendBully.subscribe(
      (bully: {value: number}) => {
        const nice = Object.keys(bully)[0];
        if (nice === 'toxic') {
          alert('This message is ' + (bully.toxic * 100).toFixed(2) + '% toxic! Not sending it!');
          this.toxic = true;
        }
      }
    );
    this.msgService.messageSent.subscribe((msg: string) => {
      if (!this.toxic) {
        this.messages.push(msg);
        console.log(this.messages);
      }
      this.toxic = false;
    });
  }

}
