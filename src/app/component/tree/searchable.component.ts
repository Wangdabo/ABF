import { Component, ViewChild, OnInit, Input} from '@angular/core';
// import { generateData } from './generate-data';
import { NzTreeComponent } from 'ng-tree-antd';

@Component({
  selector: 'app-tree-antd-demo-searchable',
    template: `
        <nz-card nzTitle="组织机构管理">
            <nz-input [nzType]="'search'" [nzPlaceHolder]="'input search text'" [(ngModel)]="q" (ngModelChange)="filterNodes()"></nz-input>
            <nz-tree #tree [nzNodes]="nodes"
                     [nzOptions]="options"
                     [nzCheckable]="true"
                     (nzEvent)="onEvent($event)"></nz-tree>
        </nz-card>
    `
})
export class TreeAntdSearchableComponent implements OnInit {
  q = '';

  nodes = [
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

  @Input() // 输入属性,接受父组件传入的数据
  initNodes: any[];



  options = {
    allowDrag: true
  };

  ngOnInit() {
    this.nodes = this.initNodes;
  }

  onEvent(ev: any) {
    console.log('basic', 'onEvent', ev);
  }


}
