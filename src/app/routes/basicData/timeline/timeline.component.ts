import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
})
export class TimelineComponent implements OnInit {

    logName: string;

    constructor(
        private http: _HttpClient
    ) { }


    ngOnInit() {
    }

}
