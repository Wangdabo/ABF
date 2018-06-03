import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {appConfig} from '../../../service/common';
import {Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {UtilityService} from '../../../service/utils.service';
import {LogsModule} from '../../../service/common.module';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
})
export class LogsComponent implements OnInit {

    constructor(
        private http: _HttpClient,
        private router: Router,
        private utilityService: UtilityService,
        private modal: NzModalService,
        private nznot: NzNotificationService
    ) { }

    logitem: LogsModule = new LogsModule(); // 搜索值
    logDetails: LogsModule = new LogsModule(); // 日志详情值

    loading = false;
    isshow = true; // 是否是修改，默认不是

    // 应用
    operatorType = [
        { text: '查询', key: 'query' },
        { text: '新增数据', key: 'add' },
        { text: '修改数据',  key: 'update' },
        { text: '删除数据',  key: 'delete' }
    ];

    operatorResult = [
        { text: '成功', key: 'succ' },
        { text: '失败', key: 'fail' },
        { text: '系统处理异常',  key: 'exception' }
    ];
    modalVisible = false;
    showAdd: boolean;

    data: any[] = []; // 表格数据
    headerData = [  // 配置表头内容
        { value: '操作类型', key: 'operatorType', isclick: false },
        { value: '应用名称', key: 'appName', isclick: false },
        { value: '操作结果', key: 'operatorResult', isclick: false },
        { value: '操作时间', key: 'operatorTime', isclick: false },
        { value: '操作员', key: 'userId', isclick: false },
        { value: '操作描述', key: 'procssdesc', isclick: false },
    ];

    moreData = {
        morebutton: true,
        buttons: [
            { key: 'Overview', value: '查看概况' }
        ]
    }
    test: string;
    page: any;
    total: number;
    ngOnInit() {
        this.getData(); // 只会触发一次，但是ngchanges并不会触发咋办\
        this.showAdd = true;
    }

    // 父组件初始化数据
    getData() { // 初始化请求后台数据
        this.data = [
            {operatorType: '查询', appName: 'ABF应用管理', operatorResult: '成功', operatorTime: '2018/6/3 21:49', userId: 'wangbo', procssdesc: '登陆用户'},
            {operatorType: '修改数据', appName: 'ABF应用管理', operatorResult: '失败', operatorTime: '2018/6/3 21:50', userId: 'wangbo', procssdesc: '登陆用户'},
            {operatorType: '查询', appName: 'ABF应用管理', operatorResult: '成功', operatorTime: '2018/6/3 21:51', userId: 'wangbo', procssdesc: '登陆用户'},
            {operatorType: '修改数据', appName: 'ABF应用管理', operatorResult: '失败', operatorTime: '2018/6/3 21:52', userId: 'wangbo', procssdesc: '登陆用户'},
            {operatorType: '新增数据', appName: 'ABF应用管理', operatorResult: '成功', operatorTime: '2018/6/3 21:53', userId: 'wangbo', procssdesc: '登陆用户'},
            {operatorType: '查询', appName: 'ABF应用管理', operatorResult: '失败', operatorTime: '2018/6/3 21:54', userId: 'wangbo', procssdesc: '登陆用户'},
            {operatorType: '删除数据', appName: 'ABF应用管理', operatorResult: '系统处理异常', operatorTime: '2018/6/3 21:55', userId: 'wangbo', procssdesc: '登陆用户'}
        ];
        /*this.page = {
            page: {
                current: this.logitem.pi,
                size: this.logitem.size,
            }
        };
        this.utilityService.postData(appConfig.testUrl + appConfig.API.sysConfigsList, this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    console.log(val.result)
                    this.data = val.result.records;
                    this.total = val.result.total;
                }
            );*//*this.page = {
            page: {
                current: this.logitem.pi,
                size: this.logitem.size,
            }
        };
        this.utilityService.postData(appConfig.testUrl + appConfig.API.sysConfigsList, this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    console.log(val.result)
                    this.data = val.result.records;
                    this.total = val.result.total;
                }
            );*/
    }


    // 想一下，能否把这三个方法封装到一个ts里面，引入即可，不然每次都写着三个方法不太现实。
    // 列表组件传过来的内容
    addHandler(event) {
        this.isshow = !this.isshow; // 要判断 不是登陆才行 如果是登陆也直接跳转时间轴
        this.getinfo(event); // 调用方法,传入对应属性
    }

    // 列表传入的翻页数据
    monitorHandler(event) {
        this.logitem.pi = event;
        this.page = {
            page: {
                current: event, // 页码
                size: this.logitem.size, //  每页个数
            }
        };
        this.getData();
    }


    // 处理行为代码，跳转、弹出框、其他交互
    isActive(event) {
    }

    selectedRow(event) { // 选中方法，折叠层按钮显示方法
    }
    // 搜索框
    search() {

    }
    reset() {
        this.logitem = new LogsModule(); // 重置
    }
    // selete监听方法
    checkSelect(i, k) {

    }
    deleatData(event) {


    }

    buttonDataHandler(event) {
        if (event.value === 'Authority') {
            console.log(event.key);
        }

        if (event.value === 'Overview') {
            console.log(event.key);
        }

    }


    // 查看详情界面
    detailsData: any[] = []; // 表格数据

    headerDetails = [ // 配置表头
        { value: '对象guid', key: 'operatorType', isclick: false },
        { value: '对象来源', key: 'appName', isclick: false },
        { value: '对象类型', key: 'operatorResult', isclick: false },
        { value: '对象名', key: 'operatorTime', isclick: false },
        { value: '对象值', key: 'userId', isclick: false },
        { value: '类型', key: 'procssdesc', isclick: false },
    ]

    detailstotal: number; // 总页数
    getinfo(event) {
        this.logDetails = event; // 渲染

        this.detailsData = [
            {operatorType: '查询', appName: 'ABF应用管理', operatorResult: '成功', operatorTime: '2018/6/3 21:49', userId: 'wangbo', procssdesc: '登陆用户'},
            {operatorType: '修改数据', appName: 'ABF应用管理', operatorResult: '失败', operatorTime: '2018/6/3 21:50', userId: 'wangbo', procssdesc: '登陆用户'},
            {operatorType: '查询', appName: 'ABF应用管理', operatorResult: '成功', operatorTime: '2018/6/3 21:51', userId: 'wangbo', procssdesc: '登陆用户'},
            {operatorType: '修改数据', appName: 'ABF应用管理', operatorResult: '失败', operatorTime: '2018/6/3 21:52', userId: 'wangbo', procssdesc: '登陆用户'},
            {operatorType: '新增数据', appName: 'ABF应用管理', operatorResult: '成功', operatorTime: '2018/6/3 21:53', userId: 'wangbo', procssdesc: '登陆用户'},
            {operatorType: '查询', appName: 'ABF应用管理', operatorResult: '失败', operatorTime: '2018/6/3 21:54', userId: 'wangbo', procssdesc: '登陆用户'},
            {operatorType: '删除数据', appName: 'ABF应用管理', operatorResult: '系统处理异常', operatorTime: '2018/6/3 21:55', userId: 'wangbo', procssdesc: '登陆用户'}
        ];
    }

    back() {
        this.isshow = !this.isshow;
        this.getData(); // 重新调用日志管理
    }

    detailsHandler(event) {
        console.log(event);
        // 路由跳转
    }
    
    monitordetailsData(event) { // 翻页事件

    }





}