import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {RoleModule} from '../../../../service/role/role.model';
import {UtilityService} from '../../../../service/utils.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {appConfig} from '../../../../service/common';
@Component({
    selector: 'app-role-func',
    templateUrl: './role-func.component.html',
})
export class RoleFuncComponent implements OnInit {
    roleGuid: string;
    treedata: any[]; // tree组件数据
    searchTitle: string; // 树搜索框文字
    treemenus: MenuItem[];
    jurisdictionTree:any[] // 树节点保存
    checked = false
    selectionType = 'checkbox'
    isData = true
    constructor(
        private http: _HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute, // 注入路由，接收到参数
        private nznot: NzNotificationService,
        private utilityService: UtilityService,
    ) { }
    checkOptionsOne:any[];
    ngOnInit() {
        this.roleGuid = this.activatedRoute.snapshot.params.id; // 拿到父组件传过来的组织机构的guid来进行操作
        console.log(this.roleGuid);
        this.searchTitle= '请输入功能名称/功能代码'
        this.treemenus = [
            {label: '新增', icon: 'fa fa-plus', command: (event) => this.addRole()},
            {label: '修改', icon: 'fa fa-edit', command: (event) => this.addEdit()},
            {label: '删除', icon: 'fa fa-times', command: (event) => this.roleDel()},
        ];
        this.checkOptionsOne = [
            { label: 'Apple', value: 'Apple', checked: true },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange' },
        ]
        this.utilityService.getData(appConfig.ABFUrl + '/' + appConfig.API.jurisdictionTree)
            .subscribe(
                (val) => {
                    console.log(val)

                    this.treedata = val; // 绑定树节点
                    if(val.length == 0){
                        this.isData = false
                    }
                    console.log( this.isData )
                });
    }

    Unfold(event) {
        // this.getData(event.node);
    }
    id:any;
    tabShow = false
    TreeSelect(event) {
        console.log(event);
        // this.id = 'funcper001';
        // this.router.navigate(['role/rolemenber', this.id]); // 跳转路由
        if (event.node.parent) {
            this.tabShow = true;
        } else {
            this.tabShow = false;
        }
    }

    RightSelect(event) {
        console.log('右击'); // 绑定数据内容，用来修改
        if (event.node.guid === 'null') {
            this.treemenus = [
                {label: '新增跟工作组', icon: 'fa fa-plus', command: (event) => this.addRole()},
                {label: '删除功能组', icon: 'fa fa-times', command: (event) => this.roleDel()},
            ];

        } else {
            this.treemenus = [
                {label: '新增子工作组', icon: 'fa fa-plus', command: (event) => this.addRole()},
                {label: '修改功能组', icon: 'fa fa-edit', command: (event) => this.addEdit()},
                {label: '删除功能组', icon: 'fa fa-times', command: (event) => this.roleDel()}];
            this.jurisdictionTree = event.node; // 绑定数据
        }


    }
    _log(event){
        console.log(event)
    }
    _console($event){
        console.log(event)
    }

    // 拖拽方法
    dropEvent($event) {
        console.log($event) ; // 拿到tree拖拽来的数据
    }

    // 树节点搜索框的内容
    searchVal($event) {
        console.log($event);
    }

    addRole() {
        console.log('新增角色');
    }

    addEdit() {
        console.log('修改角色');
    }

    roleDel() {
        console.log('删除角色');
    }

}
