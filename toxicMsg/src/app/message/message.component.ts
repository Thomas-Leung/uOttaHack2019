import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  message: string;

  constructor(private messagingService: MessagingService, private http: HttpClient) { }

  ngOnInit() {
  }

  onSendMessage() {
    if ( !(this.message == null || this.message === '')) {
      this.http.post('http://35.237.196.72/message', {message: this.message}
      , {responseType: 'text'}).subscribe( (msg: any) => {
        const payloads = msg.split('payload');
        const map = {toxicScore: [], nonToxicScore: [] };
        const toxicList: number[] = [];
        const nonToxicList: number[] = [];
        for (const payload of payloads) {
          if (payload === '[') {
            continue;
          }
          const score = payload.substring(payload.indexOf('score'), payload.indexOf('}')).split(' ')[1];
          const display = payload.substring(payload.indexOf('display_name')).split('}')[0].split(' ')[1];
          const valid = display.localeCompare('"Toxic"');
          if (valid === 1) {
            toxicList.push(score);
            map.toxicScore = toxicList;
          } else {
            nonToxicList.push(score);
            map.nonToxicScore = nonToxicList;
          }
        }
        console.log(map.nonToxicScore);
        console.log(map.toxicScore);

        let nonToxicVal = 0;
        let toxicVal = 0;
        const limit = nonToxicList.length > toxicList.length ? nonToxicList.length : toxicList.length;
        console.log(limit);

        for (const j = 0; j < limit; j++) {
          toxicVal += +toxicList[j];
          nonToxicVal += +nonToxicList[j];
        }

        toxicVal = toxicVal / toxicList.length;
        nonToxicVal = nonToxicVal / nonToxicList.length;
        const bully = { toxic: toxicVal };
        const notBully = {notToxic: nonToxicVal};
        const realBully = toxicVal > nonToxicVal ? bully : notBully;
        console.log(realBully);

        this.messagingService.sendBully.next(realBully);
        this.messagingService.messageSent.next(this.message);
        this.message = ' ';

        // const firstValue = payloads[1];
        // const secondValue = payloads[2];
        // const firstScore = firstValue.substring(firstValue.indexOf('score'), firstValue.indexOf('}'));
        // const firstDisplayArr = firstValue.substring(firstValue.indexOf('display_name'));
        // const firstDisplay = firstDisplayArr.split('}')[0];
        // const secondScore = firstValue.substring(firstValue.indexOf('score'), firstValue.indexOf('}'));
        // console.log(msg.toString());
        // console.log(firstScore);
        // console.log(firstDisplay);
      }
      );
    }
  }
}
