import {Component, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {Router} from '@angular/router';
import {UtilityService} from '../../../service/utils.service';
import { AppliaModule } from '../../../service/common.module';
import {appConfig} from '../../../service/common';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.less']
})
export class ApplicationComponent implements OnInit {

    constructor(
        private http: _HttpClient,
        private router: Router,
        private utilityService: UtilityService,
        private modal: NzModalService,
        private nznot: NzNotificationService
    ) {

    }

    appItem: AppliaModule = new AppliaModule(); // 搜索值
    appAdd: AppliaModule = new AppliaModule(); // 新增内容

    loading = false;
    isEdit = false; // 是否是修改，默认不是

    // 应用类型
    appType = [
        { key: '本地', value: '本地' },
        { key: '远程', value: '远程' }
    ]

    // 是否开通
    isOpen = [
        { key: 'Y', value: '开启' },
        { key: 'N', value: '关闭' }
    ]
    modalVisible = false;


    data: any[] = []; // 表格数据
    headerData = [  // 配置表头内容
        { value: '应用名称', key: 'appName', isclick: true },
        { value: '应用代码', key: 'appCode', isclick: false },
        { value: '应用类型', key: 'appType', isclick: false },
        { value: '是否开通', key: 'isopen', isclick: false },
        { value: '访问地址', key: 'url', isclick: false },
        { value: 'Ip地址', key: 'ipAddr', isclick: false },
        { value: '端口', key: 'ipPort', isclick: false },
        { value: '应用描述', key: 'appDesc', isclick: false },
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
    configTitle: string;
    ngOnInit() {
        this.getData(); // 只会触发一次，但是ngchanges并不会触发咋办
        this.configTitle = '修改';

    }




    // 父组件初始化数据
    getData() { // 初始化请求后台数据
        this.page = {
            page: {
                current: this.appItem.pi,
                size: this.appItem.size,
            }
        };
        this.utilityService.postData(appConfig.testUrl + appConfig.API.appList, this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    console.log(val.result);
                    for (let i = 0; i < val.result.records.length; i++ ) {
                        if (val.result.records[i].isopen ===  'YES') {
                            val.result.records[i].buttonData = ['关闭'];
                        } else {
                            val.result.records[i].buttonData = ['开启'];
                        }
                    }
                    console.log(val.result.records)
                    this.data = val.result.records;
                    this.total = val.result.total;
                }
            );
    }

    // 列表组件传过来的内容
    addHandler(event) {
        console.log(event)
        setTimeout(_ => {
            this.appAdd.isOpen = 'N'; // 默认关闭
        }, 100);
        if (event === '这里是新增的方法') {
            for (const key in this.appAdd) {
                delete this.appAdd[key];
            }
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
            this.isEdit = false;
        } else { // 代表修改，把修改的内容传递进去，重新渲染
            this.appAdd = event;
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
            this.isEdit = true;
        }
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
                console.log(event[0].guid);
                this.utilityService.deleatData(appConfig.testUrl + appConfig.API.appDed + '/' + event[0].guid)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            this.nznot.create('success', val.msg , val.msg);

                            if ( !(( this.total - 1) % 10)) {
                                // if ( !(( this.total - this.acfundata.length) % 10)) { // 支持批量删除的方法
                                this.appItem.pi -- ;
                                this.getData();
                            }

                            this.getData();
                        },
                        response => {
                            this.getData();
                        });
            },
            onCancel: () => {

            }
        });

    }



    // 按钮点击事件
    buttonEvent(event) {
        console.log(event)
        console.log(event.guid)
       if (event.isopen === 'NO') { // 关闭状态，调用开启逻辑
           this.utilityService.putData(appConfig.testUrl + appConfig.API.openApp + '/' + event.guid)
               .map(res => res.json())
               .subscribe(
                   (val) => {
                       this.nznot.create('success', val.msg , val.msg);
                       this.getData();
                   },
                   response => {
                   });
       } else {
           this.utilityService.putData(appConfig.testUrl + appConfig.API.stopApp + '/' + event.guid)
               .map(res => res.json())
               .subscribe(
                   (val) => {
                       console.log(val)
                       this.nznot.create('success', val.msg , val.msg);
                       this.getData();
                   },
                   response => {
                       this.getData();
                   });
       }
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
        // 路由跳转 跳转到对应的功应用页
        this.router.navigate(['function'],
            { queryParams:
                    { productId: event.guid
                    }
            });

    }


    selectedRow(event) { // 选中方法，折叠层按钮显示方法

    }


    // 搜索框
    search() {
        console.log(this.appItem); // 有效
    }




    // 弹出框保存组件
    save() {
        const jsonOption = this.appAdd;
        console.log(jsonOption)
        // 枚举值转换
        // 枚举值转换
        if (jsonOption.appType === '本地') {
            jsonOption.appType = 'local';
        } else {
            jsonOption.appType = 'remote';
        }
        if (!this.isEdit) {
            this.utilityService.postData(appConfig.testUrl + appConfig.API.acappAdd, jsonOption)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        this.nznot.create('success', val.msg , val.msg);
                        this.getData();
                    });
        } else {
            this.utilityService.putData(appConfig.testUrl + appConfig.API.appDed, jsonOption)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        this.nznot.create('success', val.msg , val.msg);
                        this.getData();
                    });
        }

        this.modalVisible = false;
    }
}
