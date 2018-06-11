import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {MenuItem} from 'primeng/api';
import {UtilityService} from '../../../service/utils.service';
import { Router} from '@angular/router';
// 公共接口名
import {appConfig} from '../../../service/common';
import {OrgModule} from '../../../service/common.module';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.less']
})
export class OrgComponent implements OnInit {
    constructor(
        private http: _HttpClient,
        private router: Router,
        private utilityService: UtilityService,
        private modal: NzModalService,
        private nznot: NzNotificationService
    ) { }

    treedata: any[]; // tree组件数据
    treemenus: MenuItem[];
    searchTitle: string; // 树搜索框文字
    tabShow: boolean;
    id: string;
    modalVisible = false; // 弹出框默认关闭
    isEdit = false; // 默认是新增
    orgData: any; // 树节点上的数据保存
    istrue: false;  // 是否请求过
    isChild = false; // 是否是子节点调用
    orgItem: OrgModule = new OrgModule(); // 绑定数据
    // 枚举值
    orgDegree: any;
    area: any;
    orgType: any;

    ngOnInit() {
        this.treedata = [ // 默认根节点
            {
                'label': '组织机构',
                'data': 'Documents Folder',
                'guid': '0',
                'expandedIcon': 'fa fa-institution',
                'collapsedIcon': 'fa fa-institution',
                'children': [{}]
            }
        ];
        this.searchTitle = '请输入机构代码/名称';
        this.treemenus = [
            {label: '新建跟机构', icon: 'fa fa-plus', command: (event) => this.addchildOrg()},
            {label: '修改机构', icon: 'fa fa-edit', command: (event) => this.editOrg()},
            {label: '删除机构', icon: 'fa fa-times', command: (event) => this.delectOrg()},
        ];

        // 枚举值转换
        this.orgDegree = appConfig.Enumeration.orgDegree;
        this.area = appConfig.Enumeration.area;
        this.orgType = appConfig.Enumeration.orgType;

    }


    getData(event) {
        console.log(event.node)
        // 从服务器获取树列表
        this.utilityService.postData(appConfig.testUrl  + appConfig.API.omgTree + '/' + event.node.guid, {})
            .subscribe(
                (val) => {
                    console.log(val);
                });
    }

    // 树的方法

    // 展开节点事件
    Unfold(event) {
        console.log(event)
        this.getData(event)
        /*if (event.node.guid === this.treeResult) {
            this.istrue = false;
        } else {
            this.istrue = true;
        }*/
        if (this.istrue) { // 为true的时候 说明不存在，没有请求过 才去请求

        }
    }


    // 右击菜单传递值
    RightSelect(event) {
        console.log(event.node);
        if (event.node.guid === '0') {
            this.isChild = false; // 说明是根节点，调用根节点的方法
        } else {
            this.isChild = true; // 说明不是根节点，直接调用子节点的方法
        }
        this.orgData = event.node; // 绑定数据
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

    // 新建组织机构
    addchildOrg() {
        this.modalVisible = true;
        this.isEdit = false;
    }


    save() {
        const jsonOption = this.orgItem;
        if (!this.isEdit) {
            if (!this.isChild) { // 调用跟新增还是子新增
                this.utilityService.postData(appConfig.testUrl  + appConfig.API.addRoot, jsonOption)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            console.log(val)
                            this.nznot.create('success', val.msg , val.msg);
                        },
                    );
            } else {
                jsonOption.guidParents = this.orgData.guid; // 绑定父机构的guid
                this.utilityService.postData(appConfig.testUrl  + appConfig.API.addChild, jsonOption)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            console.log(val)
                            this.nznot.create('success', val.msg , val.msg);
                        },
                    );
            }
        } else {
            console.log('调用修改接口');
        }
        this.modalVisible = false;
    }


    // 修改组织机构
    editOrg() {
        console.log(event);
        this.isEdit = true; // 是修改
        this.modalVisible = true;
        this.orgItem = this.orgData; // 渲染数据
    }

    // 删除组织机构
    delectOrg() {
        this.modal.open({
            title: '是否删除',
            content: '您确认要删除该机构吗? 删除该工作组下所有子机构都会被一并删除',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {

            },
            onCancel: () => {
                console.log('失败');
            }
        });
    }


}
