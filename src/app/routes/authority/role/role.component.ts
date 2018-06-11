import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {UtilityService} from '../../../service/utils.service';
import {Router} from '@angular/router';
import {GroupModule} from '../../../service/common.module';
import {MenuItem} from 'primeng/api';
import {appConfig} from '../../../service/common';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less']
})
export class RoleComponent implements OnInit {

    treedata: any[]; // tree组件数据
    treemenus: MenuItem[];
    searchTitle: string; // 树搜索框文字
    tabShow: boolean;
    id: string;
    modalVisible = false; // 弹出框默认关闭
    workItem: GroupModule = new GroupModule(); // 赋值
    // 枚举值
    isEdit = false; // 默认是新增
    roleData: any; // 树节点上的数据保存

    constructor(
        private http: _HttpClient,
        private router: Router,
        private utilityService: UtilityService
    ) {
    }


    ngOnInit() {
        this.searchTitle = '请输入角色代码/名称';
        this.getData();
    }


    getData() {
        // 传入右击菜单数组,根据需求定
        this.treemenus = [
            {label: '新增角色', icon: 'fa fa-plus', command: (event) => this.addRole()},
            {label: '修改角色', icon: 'fa fa-edit', command: (event) => this.addEdit()},
            {label: '删除角色', icon: 'fa fa-times', command: (event) => this.roleDel()},
        ];

        // 从服务器获取树列表
        this.utilityService.getData(appConfig.ABFUrl + '/' + appConfig.API.roleData)
            .subscribe(
                (val) => {
                    console.log(val)
                    this.treedata = val; // 绑定树节点
                });


    }


    RightSelect(event) {
        this.roleData = event.node; // 绑定角色数据
        console.log(event); // 绑定数据内容，用来修改
    }

    // 左击树菜单节点信息
    TreeSelect(event) {
        console.log(event);
        this.id = 'role001';
        this.router.navigate(['role/rolemenber', this.id]); // 跳转路由
        if (event.node.parent) {
            this.tabShow = true;
        } else {
            this.tabShow = false;
        }
    }

    // 拖拽方法
    dropEvent($event) {
        console.log($event) ; // 拿到tree拖拽来的数据
    }

    // 树节点搜索框的内容
    searchVal($event) {
        console.log($event);
    }


    // 右击方法
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
