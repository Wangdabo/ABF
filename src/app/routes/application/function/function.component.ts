import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {Router} from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import {UtilityService} from '../../../service/utils.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {appConfig} from '../../../service/common';
import {AppliaModule} from '../../../service/common.module';
import {FuncModule} from '../../../service/common.module';
import {FuncattrModule} from '../../../service/common.module';

@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
    styleUrls: ['./function.component.less']
})
export class FunctionComponent implements OnInit {
    appGuid: any;
    funGuid: string; // 功能的id
    appName: string;
    modalVisible  = false; // 弹出框默认不打开
    activeModal = false; // 默认列表弹出框不打开
    activeAddModal = false; // 默认列表弹出框不打开
    loading = false;
    isEdit = false; // 是否是修改，默认不是
    funTitle: string; // 功能弹窗标题
    configTitle: string;
    // 列表数据
    data: any[] = []; // 表格数据
    headerData = [  // 配置表头内容
        { value: '功能代码', key: 'funcCode', isclick: false },
        { value: '功能名称', key: 'funcName', isclick: false },
        { value: '功能类型', key: 'funcType', isclick: false },
        { value: '是否启用', key: 'isopen', isclick: false },
        { value: '是否验证权限', key: 'ischeck', isclick: false },
        { value: '显示顺序', key: 'displayOrder', isclick: false },
        { value: '功能描述', key: 'funcDesc', isclick: false },
    ];


    // 传入按钮层
    moreData = {
        morebutton: true,
        buttons: [
            { key: 'Overview', value: '查看概况' }
        ]
    }

    test: string;
    page: any;
    total: number;


    // 基础数据 后期从后台获取
    funcType = [
        { key: 'F', value: '功能' },
        { key: 'B', value: '行为' }
    ];

    // 是否启用
    isOpen = [
        { key: 'YES', value: '开启' },
        { key: 'NO', value: '关闭' }
    ]

    isCheck = [
        { key: 'YES', value: '需进行权限验证' },
        { key: 'NO', value: '无需验权' }
    ]
    // 应用的数据值
    appItem: AppliaModule = new AppliaModule(); // 搜索值
    // 功能的数据值
    funcItem: FuncModule = new FuncModule();
    // 行为的数据类型
    activeItem: FuncattrModule = new FuncattrModule();

    constructor(
        private http: _HttpClient,
        private router: Router,
        public activatedRoute: ActivatedRoute,
        private utilityService: UtilityService,
        private modal: NzModalService,
        private nznot: NzNotificationService
    ) { }


    // 列表的方法
    addHandler(event) {
        setTimeout(_ => {
            this.funcItem.funcType = 'F';
        }, 100);
        if (event === '这里是新增的方法') {
            this.funTitle = '新增功能';
            for (const key in this.funcItem) {
                delete this.funcItem[key];
            }
            this.isEdit = false;
        } else { // 代表修改，把修改的内容传递进去，重新渲染
            this.funTitle = '修改功能';
            this.isEdit = true;
            this.funcItem = event;

        }
        this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
    }



    // 列表传入的翻页数据
    monitorHandler(event) {
        this.funcItem.pi = event;
        this.page = {
            page: {
                current: event, // 页码
                size: this.funcItem.size, //  每页个数
            }
        };
        this.getData();
    }

    // 接受子组件删除的数据 单条还是多条
    deleatData(event) {
        this.modal.open({
            title: '是否删除',
            content: '您是否确认删除所选数据?',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                // 模拟接口
                this.utilityService.deleatData(appConfig.testUrl + appConfig.API.funcDel + '/' + event[0].guid)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            // 修改成功只和的处理逻辑
                            this.nznot.create('success', val.msg , val.msg);
                            if ( !(( this.total - 1) % 10)) {
                                // if ( !(( this.total - this.acfundata.length) % 10)) { // 支持批量删除的方法
                                this.funcItem.pi -- ;
                                this.attrDate();
                            }

                            this.getData();
                        });
            },
            onCancel: () => {

            }
        });

    }


    // 按钮点击事件
    buttonEvent(event) {
        this.funGuid = event.guid;
        this.attrDate(); // 查询行为列表
        this.activeModal = true;
    }

    // 列表按钮方法
    buttonDataHandler(event) {
        console.log(event); // 根据event.value来判断不同的请求，来获取结果和方法或者进行路由的跳转
    }



    // 处理行为代码，跳转、弹出框、其他交互
    isActive(event) {

    }


    selectedRow(event) { // 选中方法，折叠层按钮显示方法

    }


    // 搜索框
    search() {

    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(queryParams => {
            this.appGuid = queryParams.productId;
        });

        this.configTitle = '修改'
        this.getData();
    }

    // 根据id查询内容
    getData() {
        // 根据guid查询应用信息
        this.utilityService.getData(appConfig.testUrl + appConfig.API.appDed + '/' + this.appGuid)
            .subscribe(
                (val) => {

                    this.appItem = val.result;
                    this.appName = val.result.appName;
                }
            );

        // 查询功能列表信息
        this.page = {
            page: {
                current: this.funcItem.pi,
                size: this.funcItem.size,
            }
        };
        this.utilityService.postData(appConfig.testUrl + appConfig.API.funcList + '/' + this.appGuid, this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    for (let i = 0; i < val.result.records.length; i++ ) {
                        val.result.records[i].buttonData = [];
                        val.result.records[i].buttonData[0] = '查看行为';
                    }
                    this.data = val.result.records;
                    this.total = val.result.total;
                }

            );
    }

    // 保存方法
    save() {
        const jsonObj = this.funcItem;
        // 枚举值转换
        if (jsonObj.ischeck === 'YES') {
            jsonObj.ischeck = 'Y';
        } else {
            jsonObj.ischeck = 'N';
        }
        if (jsonObj.isopen === 'YES') {
            jsonObj.isopen = 'Y';
        } else {
            jsonObj.isopen = 'N';
        }
        if (!this.isEdit) {  // 新增的业务逻辑
            this.funcItem.guidApp = this.appGuid;
            this.utilityService.postData(appConfig.testUrl + appConfig.API.funcAdd, jsonObj)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        this.nznot.create('success', val.msg , val.msg);
                        this.getData();
                    }
                );
        } else {
            // 修改的保存逻辑
            this.utilityService.putData(appConfig.testUrl + appConfig.API.funcDel, jsonObj)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        this.nznot.create('success', val.msg , val.msg);
                        this.getData();
                    },
                    response => {
                        this.getData();
                    });
        }

        this.modalVisible = false;
    }


    // 行为方法内容
    acfundata: any[] = []; // 表格数据
    // 弹窗功能行为
    activeData = [  // 配置表头内容
        { value: '属性类型', key: 'attrType', isclick: false },
        { value: '属性名', key: 'attrKey', isclick: false },
        { value: '属性值', key: 'attrValue', isclick: false },
        { value: '备注', key: 'memo', isclick: false }
    ];
    activeTitle: string; // 列表标题
    ActriceData = {
        morebutton: true,
        buttons: [
            { key: 'Overview', value: '行为概况' }
        ]
    }


    // 列表翻页方法
    activeHandler(event) {
        console.log(event);
        this.activeItem.pi = event;
        this.activeItem.size = 10;
        this.attrDate();
    }

    // 行为列表方法
    attrDate = function () {
    // 查询功能列表信息
        this.page = {
            page: {
                current: this.activeItem.pi, // 当前页码
                size: this.activeItem.size, // 每页个数
            }
        };
        this.utilityService.postData(appConfig.testUrl + appConfig.API.acFuncList + '/' + this.funGuid, this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    this.acfundata = val.result.records;
                    this.total = val.result.total;
                }
            );
    }

    // 行为弹框新增方法
    addActives(event) {
        // 打开弹窗就查询
        setTimeout(_ => {
            this.activeItem.attrType = 'F';
        }, 100);
        if (event === '这里是新增的方法') {
            this.activeTitle = '新增行为';
            for (const key in this.activeItem) {
                delete this.activeItem[key];
            }
            this.isEdit = false;
        } else { // 代表修改，把修改的内容传递进去，重新渲染
            this.activeTitle = '修改行为';
            this.isEdit = true;
            this.activeItem = event;
        }
        this.activeModal = false;
        this.activeAddModal = true;  // 此时点击了列表组件的新增，打开模态框
    }

    // 列表取消方法
    acTiveCancel() {
        this.activeAddModal = false;  // 关闭行为新增弹窗
        this.activeModal = true;    // 打开行为列表弹窗

    }


    // 行为保存方法
    activeSave() {
        const jsonObj = this.activeItem;
        jsonObj.guidFunc = this.funGuid;
        if (!this.isEdit) {  // 新增的业务逻辑
            this.funcItem.guidApp = this.appGuid;
            this.utilityService.postData(appConfig.testUrl + appConfig.API.acFuncAttr, jsonObj)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        this.nznot.create('success', val.msg , val.msg);
                        this.attrDate(); // 新增总是回到第一页，跟数据有关，可以参考删除的写法
                    }
                );
        } else {
            // 修改的保存逻辑

            this.utilityService.putData(appConfig.testUrl + appConfig.API.acFuncPut, jsonObj)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        this.nznot.create('success', val.msg , val.msg);
                        this.attrDate(); // 新增总是回到第一页，跟数据有关，可以参考删除的写法

                    });
        }

        this.activeAddModal = false;
        this.activeModal = true;
    }


    // 列表弹窗删除方法
    deleatActiveData(event) {
        this.utilityService.deleatData(appConfig.testUrl + appConfig.API.acFuncDel + '/' + event[0].guid)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    // 修改成功只和的处理逻辑
                    this.nznot.create('success', val.msg , val.msg);
                    if ( !(( this.total - 1) % 10)) {
                    // if ( !(( this.total - this.acfundata.length) % 10)) { // 支持批量删除的方法
                        this.activeItem.pi -- ;
                    }
                    this.attrDate();

                });
    }




}
