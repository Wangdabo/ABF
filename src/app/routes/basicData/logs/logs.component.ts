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
    ) { }

    logitem: LogsModule = new LogsModule(); // 搜索值

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
    configTitle: string;

    data: any[] = []; // 表格数据
    headerData = [  // 配置表头内容
        { value: '操作类型', key: 'operateType', isclick: false },
        { value: '操作渠道', key: 'operateFrom', isclick: false },
        { value: '操作结果', key: 'operateResult', isclick: false },
        { value: '操作时间', key: 'operateTime', isclick: false },
        { value: '登录用户名', key: 'userId', isclick: false },
        { value: '操作描述', key: 'operateDesc', isclick: false },
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
        this.configTitle = '查看详情';
    }

    // 父组件初始化数据
    getData() { // 初始化请求后台数据
        this.page = {
            page: {
                current: this.logitem.pi,
                size: this.logitem.size,
                orderByField: 'operateTime',
                asc: false // asc 默认是true  升序排序，时间类型 用false， 降序
            }
        };
        this.utilityService.postData(appConfig.testUrl + appConfig.API.logList, this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    this.data = val.result.records;
                    console.log(val.result.records);
                    this.total = val.result.total;
                }
            );
    }


    // 想一下，能否把这三个方法封装到一个ts里面，引入即可，不然每次都写着三个方法不太现实。
    // 列表组件传过来的内容
    addHandler(event) {
        this.router.navigate(['logData'],
            { queryParams:
                    {
                        // logInfo: JSON.stringify(event)
                         logGuid: event.guid
                    }
            });
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
}
