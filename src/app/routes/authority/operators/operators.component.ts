import {Component, Input, NgModule, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ActivatedRoute, Router} from '@angular/router';
import { UtilityService } from '../../../service/utils.service';
import { OperatrModule } from '../../../service/operators';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {appConfig} from '../../../service/common';


@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.less']
})


@NgModule({
    providers: [
        UtilityService
    ],
})

export class OperatorsComponent implements OnInit {
    operator: OperatrModule = new OperatrModule();
    operatorAdd: OperatrModule = new OperatrModule();
    loading = false;
    isEdit = false; // 默认是修改
    page: any; // 翻页数据
    total: number; // 数据总数
    modalVisible = false;
    data: any[] = []; // 表格数据


    status = [
        { text: '正常', value: false, type: 'login' },
        { text: '挂起', value: false, type: 'pause' },
        { text: '注销', value: false, type: 'clear' },
        { text: '锁定', value: false, type: 'lock' },
        { text: '退出', value: false, type: 'logout' },
        { text: '停用', value: false, type: 'stop' },
    ];

    authStype = [
        { text: '密码', type: 'password' },
        { text: '动态密码', type: 'dynpassword' },
        { text: '验证码', type: 'captcha' },
        { text: 'LDAP认证', type: 'ldap' },
        { text: '指纹', type: 'fingerprint' },
        { text: '指纹卡', type: 'fingerprintcard' },
    ]


    headerData = [  // 配置表头内容
        {value: '登陆用户名', key: 'userId', isclick: false},
        {value: '操作员姓名' , key: 'operatorName',isclick: false},
        {value: '操作员状态', key: 'operatorStatus',isclick: false},
        {value: '认证模式' , key: 'authMode',isclick: false},
        {value: '锁定次数限制', key: 'lockLimit',isclick: false},
        {value: '密码失效日期', key: 'invalDate',isclick: false},
    ];


    moreData = { morebutton: true,
                 buttons: [
                     {key: 'Onboarding' , value: '入职'},
                     {key: 'Departure' , value: '离职'},
                     {key: 'Review' , value: '审核'},
                 ]
                }

    constructor(
        private http: _HttpClient,
        private router: Router,
        public activatedRoute: ActivatedRoute,
        private utilityService: UtilityService,
        private modal: NzModalService,
        private nznot: NzNotificationService
    ) {
    }


    ngOnInit() {
        this.getData(); // 只会触发一次，但是ngchanges并不会触发咋办
    }


    getData() { // 初始化请求后台数据
        // 查询功能列表信息
        this.page = {
            page: {
                current: this.operator.pi,
                size: this.operator.size,
            }
        };
        this.utilityService.postData(appConfig.testUrl + appConfig.API.acOperatorsList, this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    this.data = val.result.records;
                    this.total = val.result.total;
                }
            );
    }



    // 枚举值转换
    operStatue(event) {
        if (event.operatorStatus === '正常') {
            event.operatorStatus = 'login';
        } else if (event.operatorStatus === '注销') {
            event.operatorStatus = 'clear';
        } else if (event.operatorStatus === '锁定') {
            event.operatorStatus = 'lock';
        } else if (event.operatorStatus === '挂起') {
            event.operatorStatus = 'pause';
        }else if (event.operatorStatus === '退出') {
            event.operatorStatus = 'logout';
        }else if (event.operatorStatus === '停用') {
            event.operatorStatus = 'stop';
        }
    }

    operauthMode(event) {
        if (event.authMode === '密码') {
            event.authMode = 'password';
        } else if (event.authMode === '动态密码') {
            event.authMode = 'dynpassword';
        } else if (event.authMode === '验证码') {
            event.authMode = 'captcha';
        } else if (event.authMode === 'LDAP认证') {
            event.authMode = 'ldap';
        }else if (event.authMode === '指纹') {
            event.authMode = 'fingerprint';
        }else if (event.authMode === '指纹卡') {
            event.authMode = 'fingerprintcard';
        }
    }


    // 想一下，能否把这三个方法封装到一个ts里面，引入即可，不然每次都写着三个方法不太现实。
    // 列表组件传过来的内容
    addHandler(event) {
        if (event === '这里是新增的方法') {
            this.operatorAdd = new OperatrModule(); //  新建的时候 清空 重新构建
            for (const key in this.operator) {
                delete this.operator[key];
            }
            this.operatorAdd.operatorStatus = 'stop';
            this.operatorAdd.lockLimit = 5;
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
            this.isEdit = true;
        } else { // 代表修改，把修改的内容传递进去，重新渲染
            this.operStatue(event);
            this.operauthMode(event); // 枚举值转换

            this.operatorAdd = event;
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
            this.isEdit = false;
        }
    }

    // 列表传入的翻页数据
    monitorHandler(event) {
        this.operator.pi = event;
    }



    selectedRow(event) {
        console.log(event); // 对齐进行出来，来判断按钮层是否显示
    }



    // 接受子组件删除的数据 单条还是多条
    deleatData(event) {
        this.utilityService.deleatData(appConfig.testUrl + appConfig.API.acOperatorsDel + '/' + event[0].guid)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    // 修改成功只和的处理逻辑
                    this.nznot.create('success', val.msg , val.msg);
                    if ( !(( this.total - 1) % 10)) {
                        // if ( !(( this.total - this.acfundata.length) % 10)) { // 支持批量删除的方法
                        this.operator.pi -- ;
                    }
                    this.getData();
                });

    }



    // 列表按钮方法
    buttonDataHandler(event) {
       console.log(event); // 根据event.value来判断不同的请求，来获取结果和方法或者进行路由的跳转
    }


    // 处理行为代码，跳转、弹出框、其他交互
    isActive(event) {
        console.log(event); // 拿到数据进行判断，是跳转路由还是弹出框弹出
        // 路由跳转
        this.router.navigate(['APPlication'],{ queryParams: { name: event } });
    }



    // 搜索框
    search() {
        console.log(this.operator);
        // 把搜索值传给后台，后台数据重新传给子组件
    }


    // 重置搜索框
    reset() {
        this.operator = new OperatrModule();
    }

    // 弹出框保存组件
    save() {
        const jsonObj  = this.operatorAdd;
        if (this.isEdit) { // 新增
            this.utilityService.postData(appConfig.testUrl + appConfig.API.acOperatorsAdd, jsonObj)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        console.log(val)
                        this.nznot.create('success', val.msg , val.msg);
                        this.getData();
                    }
                );
        } else { // 修改
            this.utilityService.putData(appConfig.testUrl + appConfig.API.acOperatorsDel, jsonObj)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        this.nznot.create('success', val.msg , val.msg);
                        this.getData();
                    }
                );
        }
        this.modalVisible = false;
    }
}
