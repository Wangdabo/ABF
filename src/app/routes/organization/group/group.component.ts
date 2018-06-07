import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {MenuItem} from 'primeng/api';
import {UtilityService} from '../../../service/utils.service';
import { Router} from '@angular/router';
import {appConfig} from '../../../service/common';
import {GroupModule} from '../../../service/common.module';
import {NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
})
export class GroupComponent implements OnInit {

    treedata: any[]; // tree组件数据
    treemenus: MenuItem[];
    searchTitle: string; // 树搜索框文字
    tabShow: boolean;
    id: string;
    modalVisible = false; // 弹出框默认关闭
    workItem: GroupModule = new GroupModule(); // 赋值
    // 枚举值
    groupType: any;
    groupStatus: any;
    isEdit = false; // 默认是新增
    groupData: any; // 树节点上的数据保存

    // 模拟隶属机构
    guidOrg = [
        {value: '机构A-3-1', key: 'org1101'},
        {value: '机构A-3-2', key: 'org1102'},
        {value: '机构A-3-3', key: 'org1103'},
        {value: '机构A-3-4', key: 'org1104'},
        {value: '机构A-3-5', key: 'org1105'}
    ]
    constructor(
        private http: _HttpClient,
        private router: Router,
        private utilityService: UtilityService,
        private modal: NzModalService,
    ) { }

    ngOnInit() {
        this.getData();
        // 枚举值转换
        this.groupType = appConfig.Enumeration.groupType;
        this.groupStatus = appConfig.Enumeration.groupStatus;
    }

    getData() {
        // 传入右击菜单数组,根据需求定
        this.treemenus = [
            {label: '新建子功能组', icon: 'fa fa-plus', command: (event) => this.addchildGroup()},
            {label: '修改功能组', icon: 'fa fa-edit', command: (event) => this.editGroup()},
            {label: '删除功能组', icon: 'fa fa-times', command: (event) => this.delectGroup()},
        ];

        // 从服务器获取树列表
        this.utilityService.getData(appConfig.ABFUrl + '/' + appConfig.API.treeData)
            .subscribe(
                (val) => {
                    console.log(val)
                    this.treedata = val; // 绑定树节点
                });

        this.searchTitle = '请输入工作组代码/名称';
    }

    // 树的方法
    // 右击菜单传递值
    RightSelect(event) {
        this.groupData = event.node; // 绑定数据
        console.log(event); // 绑定数据内容，用来修改
    }

    // 左击树菜单节点信息
    TreeSelect(event) {
        console.log(event);
        this.id = 'POST0003';
        this.router.navigate(['workGroup/emp', this.id]); // 跳转路由
        if (event.node.parent) {
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

    // 新增子工作组
    addchildGroup() {
        this.modalVisible = true;
        this.isEdit = false;
       this.workItem.groupStatus = 'running'; // 弹出框默认选中

    }

    save() {
        if (!this.isEdit) {
            console.log('调用新增接口');
        } else {
            console.log('调用修改接口');
        }
        this.modalVisible = false;
    }
    delectGroup() {
        this.modal.open({
            title: '是否删除',
            content: '您确认要删除该工作组吗? 删除该工作组下所有子工作组都会被一并删除',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {

            },
            onCancel: () => {
                console.log('失败');
            }
        });
    }

    // 修改接口
    editGroup() {
        console.log(event);
        this.isEdit = true; // 是修改
        this.modalVisible = true;
        this.workItem = this.groupData; // 渲染数据
    }


}
