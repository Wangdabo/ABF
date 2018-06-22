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
    istrue = false;  // 是否请求过
    orgItem: OrgModule = new OrgModule(); // 绑定数据
    // 枚举值
    orgDegree: any;
    area: any;
    orgType: any;
    treeResult: string; // 接受请求id值
    isroot = true; // 是否是子节点调用
    dataOrg: any; // 节点信息

    ngOnInit() {
        this.initData();
        this.searchTitle = '请输入机构代码/名称';

        // 枚举值转换
        this.orgDegree = appConfig.Enumeration.orgDegree;
        this.area = appConfig.Enumeration.area;
        this.orgType = appConfig.Enumeration.orgType;

    }

    initData() {
        this.treedata = [ // 默认根节点
            {
                'label': '组织机构',
                'data': 'Documents Folder',
                'guid': 'null',
                'expandedIcon': 'fa fa-institution',
                'collapsedIcon': 'fa fa-institution',
                'children': [{}]
            }
        ];
    }
    getData(event) {
        // 从服务器获取树列表
        this.utilityService.postData(appConfig.testUrl  + appConfig.API.omgTree + '/' + event.node.guid, {})
            .map(res => res.json())
            .subscribe(
                (val) => {
                    console.log(val.result)
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
                    event.node.children = val.result.children;
                });
    }


    // 树的方法

    // 展开节点事件
    Unfold(event) {
        this.getData(event);
    }


    // 右击菜单传递值
    RightSelect(event) {
        console.log(event.node);
        if (event.node.guid === 'null') { // 子业务字典
            this.treemenus = [
                {label: '新建跟机构', icon: 'fa fa-plus', command: (event) => this.addrootOrg()},
            ];
        } else {  // 字典项
            this.treemenus = [
                {label: '新增子机构', icon: 'fa fa-plus', command: (event) => this.addchildOrg()},
                {label: '修改机构', icon: 'fa fa-edit', command: (event) => this.editOrg()},
                {label: '删除机构', icon: 'fa fa-times', command: (event) => this.delectOrg()},
            ];
        }
        delete event.node.parent;
        this.orgData = event.node; // 绑定数据
    }

    // 左击树菜单节点信息
    TreeSelect(event) {
        console.log(event.node)
        this.id = event.node.guid;
        if  (event.node.guid !== 'null') { // 只要不是跟机构就显示
            this.tabShow = true;
            this.router.navigate(['org/emp', this.id]); // 跳转路由
        } else {
            this.router.navigate(['org']);
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

    // 新增跟组织机构
    addrootOrg() {
        this.isroot = true;
        this.isEdit = false;
        this.orgItem = new OrgModule(); // 清空
        this.modalVisible = true;
    }
    // 新建子组织机构
    addchildOrg() {
        this.orgItem = new OrgModule(); // 清空
        this.modalVisible = true;
        this.isEdit = false;
        this.isroot = false;
    }


    // 枚举值转换
    // 机构等级转换
    degreeOrg(event) {
        if (event.orgDegree === '总行') {
            event.orgDegree = 'BS';
        } else if (event.orgDegree === '分行') {
            event.orgDegree = 'YF';
        } else if (event.orgDegree === '海外') {
            event.orgDegree = 'HW';
        } else if (event.orgDegree === '区域分行') {
            event.orgDegree = 'QY';
        } else if (event.orgType === '网点') {
            event.orgDegree = 'CN';
        }
    }
    // 机构类型转换
    typeOrg(event) {
        if (event.orgType === '总公司') {
            event.orgType = '10';
        } else if (event.orgType === '总部部门') {
            event.orgType = '11';
        } else if (event.orgType === '分公司') {
            event.orgType = '20';
        } else if (event.orgType === '分公司部门') {
            event.orgType = '21';
        } else if (event.orgType === '营业网点') {
            event.orgType = '90';
        }
    }
    //  地区
    arearOrg(event) {
        if (event.area === '北京') {
            event.area = '010';
        } else if (event.area === '上海') {
            event.area = '021';
        }
    }
    // 是否
    isleaf(event) {
        if (event.isleaf === '是') {
            event.isleaf = 'Y';
        } else if (event.isleaf === '否') {
            event.isleaf = 'N';
        }
    }
    // 机构状态
    orgStatus(event) {
        if (event.orgStatus === '正常') {
            event.orgStatus = 'running';
        } else if (event.orgStatus === '注销') {
            event.orgStatus = 'cancel';
        } else if (event.orgStatus === '停用') {
            event.orgStatus = 'stop';
        }
    }

    // 保存接口
    save() {
        const jsonOption = this.orgItem;
        if (!this.isEdit) {
            if (this.isroot) { // 新增跟机构
                this.utilityService.postData(appConfig.testUrl  + appConfig.API.addRoot, jsonOption)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            this.nznot.create('success', val.msg , val.msg);
                        },
                    );
            } else {
                jsonOption.guidParents = this.orgData.guid; // 绑定父机构的guid
                this.utilityService.postData(appConfig.testUrl  + appConfig.API.addChild, jsonOption)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            this.nznot.create('success', val.msg , val.msg);
                        },
                    );
            }
        } else {
            this.degreeOrg(jsonOption)
            this.typeOrg(jsonOption)
            this.arearOrg(jsonOption)
            this.isleaf(jsonOption)
            this.orgStatus(jsonOption)
            console.log(jsonOption)
            this.utilityService.putData(appConfig.testUrl  + appConfig.API.omg, jsonOption)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        this.nznot.create('success', val.msg , val.msg);
                    },
                );
        }
        this.initData()
        this.modalVisible = false;
    }


    // 修改组织机构
    editOrg() {
        this.isEdit = true; // 是修改
        this.modalVisible = true;
        // 查询修改的数据信息
        this.utilityService.getData(appConfig.testUrl + appConfig.API.omg + '/' +  this.orgData.guid)
            .subscribe(
                (val) => {
                    this.dataOrg = val.result;
                    this.degreeOrg(val.result)
                    this.typeOrg(val.result)
                    this.arearOrg(val.result)
                    this.orgItem = val.result; // 渲染数据
                });

    }


    // 删除组织机构
    delectOrg() {
        this.modal.open({
            title: '是否删除',
            content: '您确认要删除该机构吗? 删除该工作组下所有子机构都会被一并删除',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                this.utilityService.deleatData(appConfig.testUrl + appConfig.API.omg + '/' +  this.orgData.guid)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            this.nznot.create('success', val.msg , val.msg);
                            this.initData(); // 重新查询树
                        });
            },
            onCancel: () => {
                console.log('失败');
            }
        });
    }


}
