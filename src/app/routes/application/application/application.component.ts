import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.less']
})
export class ApplicationComponent implements OnInit {

    constructor(
        private http: _HttpClient
    ) { }
    list: any[] = [];


    ngOnInit() {

    }

    select(ret: any) {
        console.log('nzSelectChange', ret);
    }

    change(ret: any) {
        console.log('nzChange', ret);
    }

}
