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
    selectionType= 'single'
    workItem: GroupModule = new GroupModule(); // 赋值
   
    // 枚举值
    isEdit = false; // 默认是新增
    roleData: any; // 树节点上的数据保存
    isData = true; // 是否存在成员
    constructor(
        private http: _HttpClient,
        private router: Router,
        private utilityService: UtilityService
    ) {
    }


    ngOnInit() {
        this.searchTitle = '请输入角色代码/名称';
        this.initData();
    }


    initData() {
        
           this.treedata = [ // 默认根节点
            {
                'label': '默认角色分组',
                'data': 'Documents Folder',
                'guid': 'null',
                'expandedIcon': '',
                'collapsedIcon': '',
                'children': [{}]
            }
        ];
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
    
 getData(event) {
        console.log(event)
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
   Unfold(event) {
        // this.getData(event.node);
    }
    // RightSelect(event) {
    //     this.roleData = event.node; // 绑定角色数据
    //     console.log(event); // 绑定数据内容，用来修改
    // }

     memberdata = [
            {'id': 1, 'roleName': '汪波', 'roleCode': 'role001', 'roleType': '系统级', 'application': 'ABF' },
            {'id': 2, 'roleName': '赵春海', 'roleCode': 'role002', 'roleType': '应用级', 'application': '柜面系统' },
            {'id': 3, 'roleName': '王星名', 'roleCode': 'role003', 'roleType': '系统级', 'application': 'ABF' },
            {'id': 4, 'roleName': '李毅', 'roleCode': 'role004', 'roleType': '应用级', 'application': '柜面系统' },
            {'id': 5, 'roleName': '庄壮成', 'roleCode': 'role005', 'roleType': '系统级', 'application': 'ABF' },
            {'id': 6, 'roleName': '李俊华', 'roleCode': 'role006', 'roleType': '应用级', 'application': '柜面系统' },
            {'id': 7, 'roleName': '张三', 'roleCode': 'role007', 'roleType': '应用级', 'application': 'ABF' },
            {'id': 8, 'roleName': '李四', 'roleCode': 'role008', 'roleType': '应用级', 'application': 'ABF' },
            {'id': 9, 'roleName': '王五', 'roleCode': 'role008', 'roleType': '系统级', 'application': '柜面系统' },
        ];
    // 左击树菜单节点信息
    TreeSelect(event) {
        // console.log(this.memberdata.length);
        // alert('3')
        this.id = 'role001';
     
    //     let obj = JSON.parse(this.memberdata);
    //    console.log(obj);
    //    return;
    //  this.router.navigate(['role/rolemember'],{ queryParams:{ datamember:this.memberdata,id:this.id}}); 
    
        if (event.node.parent) {
          this.router.navigate(['role/rolemember', this.id]); 
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
            this.roleData = event.node; // 绑定数据
        }


    }

    // 左击树菜单节点信息
 

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
