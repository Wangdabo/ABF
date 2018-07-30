import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';
import { UtilityService } from '../../../service/utils.service';
import { SystemModule } from '../../../service/system';
import { appConfig } from '../../../service/common';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';

@Component({
    selector: 'app-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.less']
})
export class SystemComponent implements OnInit {

    constructor(
        private http: _HttpClient,
        private router: Router,
        private utilityService: UtilityService,
        private modal: NzModalService,
        private nznot: NzNotificationService
    ) {

    }

    system: SystemModule = new SystemModule(); // 搜索值

    sysAdd: SystemModule = new SystemModule(); // 新增内容

    loading = false;
    isshow: boolean = false; // 默认是false 不显示
    isEdit = false; // 是否是修改，默认不是
    // 应用
    guidApp = [
        { text: 'APF应用', value: false, key: 'ABF' },
        { text: '测试应用', value: false, key: 'TEST' },
    ];
    // 值来源类型:
    valueFrom = [
        { text: '手动输入', value: false, key: 'H' },
        { text: '业务类型', value: false, key: 'busType' },
        { text: '接触方式', value: false, key: 'contactMethod' },
        { text: '交易状态', value: false, key: 'tradingStatus' },
        { text: '操作行为类型', value: false, key: 'operational' },
        { text: '服务评价', value: false, key: 'serAting' },
        { text: '服务类型', value: false, key: 'serType' },
    ];

    // 参数值
    value = [
        { text: '选择值', value: false, key: 'P' },
        { text: '操作值', value: false, key: 'D' },
        { text: '内容值', value: false, key: 'S' }
    ]

    modalVisible = false;

    data: any[] = []; // 表格数据
    headerData = [  // 配置表头内容
        { value: '应用系统', key: 'guidApp', isclick: false },
        { value: '参数组别', key: 'groupName', isclick: false },
        { value: '参数键', key: 'keyName', isclick: false },
        { value: '值来源', key: 'valueFrom', isclick: false },
        { value: '参数值', key: 'value', isclick: false },
        { value: '参数描述', key: 'description', isclick: false },
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
    configTitle: string;
    ngOnInit() {
        this.getData(); // 只会触发一次，但是ngchanges并不会触发咋办
        this.configTitle = '修改';
    }

    // 父组件初始化数据
    getData() { // 初始化请求后台数据
        this.page = {
            page: {
                current: this.system.pi,
                size: this.system.size,
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
            );
    }


    // 想一下，能否把这三个方法封装到一个ts里面，引入即可，不然每次都写着三个方法不太现实。
    // 列表组件传过来的内容
    addHandler(event) {
        if (event === '这里是新增的方法') {
            for (const key in this.sysAdd) {
                delete this.sysAdd[key];
            }
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
            this.isEdit = false;
        } else { // 代表修改，把修改的内容传递进去，重新渲染
            this.sysAdd = event;
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
            this.isEdit = true;
        }
    }

    // 列表传入的翻页数据
    monitorHandler(event) {
        this.system.pi = event;
        this.page = {
            page: {
                current: event, // 页码
                size: this.system.size, //  每页个数
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
                this.utilityService.deleatData(appConfig.testUrl + appConfig.API.sysConfigsDel + '/' + event[0].guid)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {

                             this.nznot.create('success', '状态码' + val.code + val.msg , val.msg);
                            if ( !(( this.total - 1) % 10)) {
                                // if ( !(( this.total - this.acfundata.length) % 10)) { // 支持批量删除的方法
                                this.system.pi -- ;
                                this.getData();
                            }
                            this.getData();

                        },
                        response => {
                            // 如果数据不正确，则在这里给初始数据
                            this.data = [];
                        });
            },
            onCancel: () => {
                console.log('取消成功');
            }
        });

    }


    // 列表按钮方法
    buttonDataHandler(event) {
        console.log(event); // 根据event.value来判断不同的请求，来获取结果和方法或者进行路由的跳转
        if (event.value === 'Authority') {
            console.log(event.key);
        }

        if (event.value === 'Overview') {
            console.log(event.key);
        }

    }



    // 处理行为代码，跳转、弹出框、其他交互
    isActive(event) {
        console.log(event); // 拿到数据进行判断，是跳转路由还是弹出框弹出
        // 路由跳转
        this.router.navigate(['APPlication'], { queryParams: { name: event } });
    }


    selectedRow(event) { // 选中方法，折叠层按钮显示方法

    }


    // 搜索框
    search() {

    }


    reset() {
        this.system = new SystemModule(); // 重置
    }
    // selete监听方法
    checkSelect(i, k) {
        if (i !== null) {
            this.isshow = true;
            this.sysAdd.value = null
            if (i === 'busType') {
                this.value = [
                    { text: '改变值', value: false, key: 'G' },
                    { text: '座位置', value: false, key: 'P' }
                ];
            }

            if (i === 'serAting') {
                this.value = [
                    { text: '好评', value: false, key: 'H' },
                    { text: '差评', value: false, key: 'S' },
                ];
            }
        } else {
            this.isshow = false;
        }
    }


    // 弹出框保存组件
    save() {
        const jsonOption = this.sysAdd;
        if (!this.isEdit) {
            this.utilityService.postData(appConfig.testUrl + appConfig.API.sysConfigAdd, jsonOption)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        this.nznot.create('success', val.msg , val.msg);
                        this.getData();
                    },
                    response => {
                        this.getData();
                    });
        } else {
            this.utilityService.putData(appConfig.testUrl + appConfig.API.sysConFigs, jsonOption)
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
}
