import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {MenuItem} from 'primeng/api';
import {UtilityService} from '../../../service/utils.service';
import { Router} from '@angular/router';
// 公共接口名
import {appConfig} from '../../../service/common';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.less']
})
export class OrgComponent implements OnInit {
    constructor(
        private http: _HttpClient,
        private router: Router,
        private utilityService: UtilityService
    ) { }


    treedata: any[]; // tree组件数据

    treemenus: MenuItem[];

    searchTitle: string; // 树搜索框文字

    tabShow: boolean;

    id: string;

    ngOnInit() {
        this.getData();
    }


    getData() {
        // 传入右击菜单数组,根据需求定
        this.treemenus = [
            {label: '删除业务字典', icon: 'fa-search', command: (event) => this.delectDict()}
        ];

        // 从服务器获取树列表
        this.utilityService.getData(appConfig.ABFUrl + '/' + appConfig.API.orgTreeData)
            .subscribe(
                (val) => {
                    this.treedata = val; // 绑定树节点
                },
                response => {
                    // 如果数据不正确，则在这里给初始数据
                    this.treedata = [
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
                    ]; // 传入树节点数据
                });

        this.treedata = [
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
        this.searchTitle = '请输入机构代码/名称';
    }


    // 树的方法
    // 右击菜单传递值
    RightSelect(event) {
        console.log(event);
    }

    // 左击树菜单节点信息
    TreeSelect(event) {
        console.log(event)
        this.id = 'POST0003';
        this.router.navigate(['org/emp', this.id]); // 跳转路由
        if  (event.node.parent) {
            this.tabShow = true;
        } else {
            this.tabShow = false;
        }
    }

    // 拖拽方法
    dropEvent($event) {
        console.log($event) ; // 拿到tree拖拽来的数据
        this.treedata = [
            {
                'label': '测试数据1111',
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
            }
        ];
    }

    // 树节点搜索框的内容
    searchVal($event) {
        console.log($event);
    }

    // 右击方法01
    delectDict() {

    }



}
