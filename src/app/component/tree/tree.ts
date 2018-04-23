import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Tree, TreeModule} from 'primeng/tree';
import {MenuItem,  TreeNode, Message} from 'primeng/api';



@Component({
  selector: 'app-tree',
  templateUrl: './tree.html',
  styleUrls: ['./tree.scss']
})

export class TreeDemoComponent implements OnInit {

    files: TreeNode[];
    selectedFiles: TreeNode[];

    @ViewChild('expandingTree')
    expandingTree: Tree;

    items: MenuItem[];


    constructor() {}

    ngOnInit() {
        this.files = [
            {
                'label': '测试数据',
                'data': 'Documents Folder',
                'expandedIcon': 'fa-folder-open',
                'collapsedIcon': 'fa-folder',
                'children': [{
                    'label': '工作',
                    'data': 'Work Folder',
                    'expandedIcon': 'fa-folder-open',
                    'collapsedIcon': 'fa-folder',
                    'children': [{'label': '睡觉', 'icon': 'fa-file-word-o', 'data': 'Expenses Document'}, {'label': '唱歌', 'icon': 'fa-file-word-o', 'data': 'Resume Document'}]
                },
                    {
                        'label': '下班',
                        'data': 'Home Folder',
                        'expandedIcon': 'fa-folder-open',
                        'collapsedIcon': 'fa-folder',
                        'children': [{'label': '回家', 'icon': 'fa-file-word-o', 'data': 'Invoices for this month'}]
                    }]
            },
            {
                'label': '你瞅啥',
                'data': 'Pictures Folder',
                'expandedIcon': 'fa-folder-open',
                'collapsedIcon': 'fa-folder',
                'children': [
                    {'label': '瞅你咋地', 'icon': 'fa-file-image-o', 'data': 'Barcelona Photo'},
                    {'label': '不服干我', 'icon': 'fa-file-image-o', 'data': 'PrimeFaces Logo'},
                    {'label': '你丫等着', 'icon': 'fa-file-image-o', 'data': 'PrimeUI Logo'}]
            },
        ];

        this.selectedFiles = this.files;

        this.items = [
            {label: '新增', icon: 'fa-search', command: (event) => this.viewFile()},
            {label: '删除', icon: 'fa-close' , command: (event) => this.unselectFile()}
        ];
    }


    viewFile() {
      alert('点我干啥');
    }


    unselectFile() {
        alert('点的就是你');
    }


}
