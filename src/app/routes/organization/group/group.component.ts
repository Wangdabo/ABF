import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {MenuItem} from 'primeng/api';
import {UtilityService} from '../../../service/utils.service';
import { Router} from '@angular/router';
import {appConfig} from '../../../service/common';
import {GroupModule} from '../../../service/common.module';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';

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
    isRoot = false; // 是否是跟工作组
    groupDetail: any; // 工作組的詳情
    guidOrg: any; // 查询所有机构

    constructor(
        private http: _HttpClient,
        private router: Router,
        private utilityService: UtilityService,
        private modal: NzModalService,
        private nznot: NzNotificationService
    ) { }

    ngOnInit() {
        this.initData();
        // 枚举值转换
        this.groupType = appConfig.Enumeration.groupType;
        this.groupStatus = appConfig.Enumeration.groupStatus;
        this.searchTitle = '请输入工作组代码/名称';
    }


    initData() {
        this.treedata = [ // 默认根节点
            {
                'label': '工作组',
                'data': 'Documents Folder',
                'guid': 'null',
                'expandedIcon': 'fa fa-institution',
                'collapsedIcon': 'fa fa-institution',
                'children': [{}]
            }
        ];

        // 查询所有机构
        this.utilityService.getData(appConfig.testUrl  + appConfig.API.orgQueryAll)
            .subscribe(
                (val) => {
                    this.guidOrg = val.result;
                });

    }


    getData(event) {
        // 从服务器获取树列表
        this.utilityService.getData(appConfig.testUrl  + appConfig.API.omGroups + '/' +  event.guid + '/tree')
            .subscribe(
                (val) => {
                    for (let i = 0 ; i < val.result.children.length; i++) {
                        if (val.result.children[i].isleaf === '是') { // 代表是最底层，没有下级了
                            val.result.children[i].collapsedIcon = 'fa-folder';
                        } else {
                            // val.result.children[i].label = val.result.children[i].orgName;
                            val.result.children[i].expandedIcon = 'fa fa-institution';
                            val.result.children[i].collapsedIcon = 'fa fa-institution';
                            val.result.children[i].children =  [{}];
                        }

                    }
                    event.children = val.result.children;
                });
    }

    // 下拉刷新
    Unfold(event) {
        this.getData(event.node);
    }


    // 树的方法
    // 右击菜单传递值
    RightSelect(event) {
        console.log(event); // 绑定数据内容，用来修改
        if (event.node.guid === 'null') {
            this.treemenus = [
                {label: '新增跟工作组', icon: 'fa fa-plus', command: (event) => this.addRootGroup()},
                {label: '删除功能组', icon: 'fa fa-times', command: (event) => this.delectGroup()},
            ];

        } else {
            this.treemenus = [
                {label: '新增子工作组', icon: 'fa fa-plus', command: (event) => this.addchildGroup()},
                {label: '修改功能组', icon: 'fa fa-edit', command: (event) => this.editGroup()},
                {label: '删除功能组', icon: 'fa fa-times', command: (event) => this.delectGroup()}];
            this.groupData = event.node; // 绑定数据
        }


    }

    // 左击树菜单节点信息
    TreeSelect(event) {
        console.log(event.node.code);
        this.id = event.node.code; // 先传guid 后期接口改成code 在传code
        if  (event.node.guid !== 'null') { // 只要不是跟机构就显示
            this.tabShow = true;
            this.router.navigate(['workGroup/group', this.id]); // 跳转路由
        } else {
            this.router.navigate(['workGroup']);
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

    // 新增跟工作组
    addRootGroup() {
        this.workItem = new GroupModule();
        this.modalVisible = true;
        this.isEdit = false;
        this.isRoot = true; // 调用新增工作组
        this.workItem.groupStatus = 'running'; // 弹出框默认选中
    }
    // 新增子工作组
    addchildGroup() {
        this.workItem = new GroupModule();
        this.modalVisible = true;
        this.isEdit = false;
        this.isRoot = false;
       this.workItem.groupStatus = 'running'; // 弹出框默认选中

    }

    // 枚举值转换
    statusgroup(event) {
        if (event.groupStatus === '正常') {
            event.groupStatus = 'running';
        } else if (event.groupStatus === '注销') {
            event.groupStatus = 'cancel';
        }
    }

    grouptype(event) {
        if (event.groupType === '普通工作组') {
            event.groupType = 'normal';
        } else if (event.groupType === '项目型') {
            event.groupType = 'project';
        } else if (event.groupType === '事务型') {
            event.groupType = 'affair';
        }
    }
    // 修改接口
    editGroup() {
        this.isEdit = true; // 是修改
        this.modalVisible = true;
        // 接口改变至之后 用code 而不是guid
        this.utilityService.getData(appConfig.testUrl  + appConfig.API.omGroups + '/' + this.groupData.code)
            .subscribe(
                (val) => {

                    this.grouptype(val.result);
                    this.statusgroup(val.result);
                    this.groupDetail = val.result; // 绑定工作组的详情
                    this.workItem = val.result; // 渲染数据
                },
            );
    }


    save() {
        const jsonOption = this.workItem;
        // jsonOption.groupOrg = 'ORG北京总行00007'; // 写死机构
        // jsonOption.guidName = this.workItem.groupName; // 写死机构
        if (!this.isEdit) {
            if (this.isRoot) { // 调用新增跟工作组接口
                this.utilityService.postData(appConfig.testUrl  + appConfig.API.groupRoot, jsonOption)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            this.nznot.create('success', val.msg , val.msg);
                            this.getData(this.groupData);
                        },
                    );
            } else {
                jsonOption.guidParents = this.groupData.guid;
                this.utilityService.postData(appConfig.testUrl  + appConfig.API.groupChild, jsonOption)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            this.nznot.create('success', val.msg , val.msg);
                            this.getData(this.groupData);
                        },
                    );
            }
        } else {
            this.utilityService.putData(appConfig.testUrl  + appConfig.API.omGroups, jsonOption)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        this.nznot.create('success', val.msg , val.msg);
                        this.getData(this.groupData.parent);

                    },
                );
        }
        this.modalVisible = false;
    }

    delectGroup() {
        console.log(this.groupData)
        this.modal.open({
            title: '是否删除',
            content: '您确认要删除该工作组吗? 删除该工作组下所有子工作组都会被一并删除',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                this.utilityService.deleatData(appConfig.testUrl  + appConfig.API.omGroups + '/' + this.groupData.code)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            console.log(val)
                            this.getData(this.groupData.parent);
                            this.nznot.create('success', val.msg , val.msg);

                        },
                    );
            },
            onCancel: () => {
                console.log('失败');
            }
        });
    }



}
