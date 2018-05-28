import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {Router} from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import {UtilityService} from '../../../service/utils.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {appConfig} from '../../../service/common';
import {AppliaModule} from '../../../service/common.module';
import {FuncModule} from '../../../service/common.module';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
    styleUrls: ['./function.component.less']
})
export class FunctionComponent implements OnInit {

    appGuid: any;
    appName: string;
    modalVisible  = false; // 弹出框默认不打开
    activeModal = false; // 默认列表弹出框不打开
    activeAddModal = false; // 默认列表弹出框不打开
    loading = false;
    isEdit = false; // 是否是修改，默认不是
    funTitle: string; // 功能弹窗标题

    // 列表数据
    data: any[] = []; // 表格数据
    headerData = [  // 配置表头内容
        { value: '功能代码', key: 'funcCode', isclick: false },
        { value: '功能名称', key: 'funcName', isclick: false },
        { value: '功能类型', key: 'funcType', isclick: false },
        { value: '是否启用', key: 'isopen', isclick: false },
        { value: '是否验证权限', key: 'isCheck', isclick: false },
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
        { key: 'Y', value: '开启' },
        { key: 'N', value: '关闭' }
    ]

    isCheck = [
        { key: 'Y', value: '需进行权限验证' },
        { key: 'N', value: '无需验权' }
    ]
    // 应用的数据值
    appItem: AppliaModule = new AppliaModule(); // 搜索值
    // 功能的数据值
    funcItem: FuncModule = new FuncModule();

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
        console.log(event)
        if (event === '这里是新增的方法') {
            setTimeout(_ => {
                this.funcItem.funcType = 'F';
            }, 100);
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
        this.appItem.pi = event;
        this.page = {
            page: {
                current: event, // 页码
                size: this.appItem.size, //  每页个数
            }
        };
        this.getData();
    }

    // 接受子组件删除的数据 单条还是多条
    deleatData(event) {
        console.log(event);
        this.modal.open({
            title: '是否删除',
            content: '您是否确认删除所选数据?',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                // 模拟接口
                this.utilityService.deleatData(appConfig.testUrl + appConfig.API.funcDel + '/' + event[0].guid)
                    .subscribe(
                        (val) => {
                            if (val.status === 200) {
                                // 修改成功只和的处理逻辑
                            }
                        });
            },
            onCancel: () => {

            }
        });

    }


    // 按钮点击事件
    buttonEvent(event) {
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

        this.getData();

    }

    // 根据id查询内容
    getData() { // 初始化请求后台数据
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

        this.utilityService.postData(appConfig.testUrl + appConfig.API.funcList, this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    this.data = val.result.records;
                    this.total = val.result.total;
                }
            );

        // 模拟请求
       /* this.utilityService.getData(appConfig.ABFUrl + '/' + appConfig.API.listData)
            .subscribe(
                (val) => {
                    for (let i = 0; i < val.length; i++ ) {
                        val[i].buttonData = [];
                        val[i].buttonData[0] = '查看行为';
                    }
                    this.data = val;
                    this.total = 10;
                }
            );*/
    }

    // 保存方法
    save() {
        const jsonObj = this.funcItem;
        if (!this.isEdit) {  // 新增的业务逻辑
            this.funcItem.guidApp = this.appGuid;
            this.utilityService.postData(appConfig.testUrl + appConfig.API.funcAdd, jsonObj)
                .subscribe(
                    (val) => {
                        console.log(val);
                    }
                );
            // 模拟新增
        } else {    // 修改的保存逻辑
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



    // 弹窗功能行为
    activeData = [  // 配置表头内容
        { value: '行为代码', key: 'funcCode', isclick: false },
        { value: '行为名称', key: 'funcName', isclick: false },
        { value: '行为类型', key: 'funcType', isclick: false },
        { value: '属性', key: 'isopen', isclick: false }
    ];

    // 行为保存方法
    activeSave() {
        // this.activeModal = false;
        this.activeAddModal = true;
    }

}
