import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {MenuItem} from 'primeng/api';
import {UtilityService} from '../../../service/utils.service';
import { Router} from '@angular/router';
// 公共接口名
import {appConfig} from '../../../service/common';
import {OrgModule} from '../../../service/common.module';
import {NzModalService} from 'ng-zorro-antd';

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
    ) { }



    treedata: any[]; // tree组件数据
    treemenus: MenuItem[];
    searchTitle: string; // 树搜索框文字
    tabShow: boolean;
    id: string;
    modalVisible = false; // 弹出框默认关闭
    isEdit = false; // 默认是新增
    orgData: any; // 树节点上的数据保存

    orgItem: OrgModule = new OrgModule(); // 绑定数据
    // 枚举值
    orgDegree: any;
    area: any;
    orgType: any;

    ngOnInit() {
        this.getData();
        // 枚举值转换
        this.orgDegree = appConfig.Enumeration.orgDegree;
        this.area = appConfig.Enumeration.area;
        this.orgType = appConfig.Enumeration.orgType;

    }

    getData() {
        // 传入右击菜单数组,根据需求定
        this.treemenus = [
            {label: '新建机构', icon: 'fa fa-plus', command: (event) => this.addchildOrg()},
            {label: '修改机构', icon: 'fa fa-edit', command: (event) => this.editOrg()},
            {label: '删除机构', icon: 'fa fa-times', command: (event) => this.delectOrg()},
        ];

        // 从服务器获取树列表
        this.utilityService.getData(appConfig.ABFUrl + '/' + appConfig.API.orgTreeData)
            .subscribe(
                (val) => {
                    this.treedata = val; // 绑定树节点
                });
        this.searchTitle = '请输入机构代码/名称';
    }


    // 树的方法
    // 右击菜单传递值
    RightSelect(event) {
        this.orgData = event.node; // 绑定数据
        console.log(event); // 绑定数据内容，用来修改
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
        if (!this.isEdit) {
            console.log('调用新增接口');
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
