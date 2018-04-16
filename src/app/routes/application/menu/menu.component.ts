import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

    nodesOne = [
        {
            name: 'root1'
        },
        {
            name: 'root2'
        },
        {
            name: 'root3'
        },
        {
            name: 'root4',
            children: [
                {
                    name: 'hhs'
                }
            ]
        }
    ];


    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
