import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {

        this.dataJson = [
            {id: 1, text: '测试数据', value: '测试'},
            {id: 2, text: '测试数据1', value: '测试1'},
            {id: 3, text: '测试数据2', value: '测试2'},
            {id: 4, text: '测试数据3', value: '测试3'},
            {id: 5, text: '测试数据4', value: '测试4'},
            {id: 6, text: '测试数据5', value: '测试5'},
        ];
    }
}
