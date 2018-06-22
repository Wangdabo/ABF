import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {appConfig} from '../../../service/common';
import {UtilityService} from '../../../service/utils.service';
import {PageModule} from '../../../service/common.module';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';


@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
})

export class AuthorityComponent implements OnInit {

    searchOptions; // 选择显示的内容
    selectedMultipleOption; // 多选的内容
    groupGuid: string;
    showAdd: boolean;
    configTitle: string;
    total: number;
    array = []; // 定义数组 用来清空
    page: any;
    pages: PageModule = new PageModule();

    data: any[] = []; // 表格数据
    headerData = [  // 配置表头内容
        { value: '应用名称', key: 'appName', isclick: false },
        { value: '应用类型', key: 'appType', isclick: false },
        { value: '应用开通时间', key: 'openDate', isclick: false },

    ];
    moreData = {
        morebutton: true,
        buttons: [
            { key: 'Overview', value: '查看概况' }
        ]
    };


    constructor(
        private http: _HttpClient,
        private activatedRoute: ActivatedRoute, // 注入路由，接收到参数
        private utilityService: UtilityService,
        private nznot: NzNotificationService
    ) { }

    ngOnInit() {
        this.groupGuid = this.activatedRoute.snapshot.params.id; // 拿到父组件传过来的组织机构的guid来进行操作
        this.showAdd = true;
        this.configTitle = '删除'
        this.queryNoApp();
        this.querygroupApp();

    }
    // 查询不在工作组内的其他应用
    queryNoApp() {
        this.utilityService.getData(appConfig.testUrl  + appConfig.API.omGroups + '/' + this.groupGuid + '/availableApp')
            .subscribe(
                (val) => {
                    this.searchOptions = val.result;
                    console.log(this.searchOptions);
                });
    }


    // 查询工作组下的应用
    querygroupApp() {
        this.page = {
            page: {
                current: this.pages.pi,
                size: this.pages.size,
            }
        };

        this.utilityService.postData(appConfig.testUrl  + appConfig.API.omGroups + '/' + this.groupGuid + '/app', this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    console.log(val)
                    this.data = val.result.records;
                    this.total = val.result.total;
                });


    }




    appClick() {
        console.log(this.selectedMultipleOption); // 传入后台，渲染
        const jsonObj = {
            groupCode: this.groupGuid,
            appGuidList: this.selectedMultipleOption,
        }

        this.utilityService.postData(appConfig.testUrl  + appConfig.API.groupApp, jsonObj)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    this.nznot.create('success', val.msg , val.msg);
                    this.selectedMultipleOption = [];
                    this.queryNoApp()
                    this.querygroupApp();
                });
    }






    // 列表组件传过来的内容
    addHandler(event) {
        console.log(event)
        // 删除应用
        this.utilityService.deleatData(appConfig.testUrl  + appConfig.API.omGroups + '/' + this.groupGuid + '/app/' + event.guid )
            .map(res => res.json())
            .subscribe(
                (val) => {
                    this.nznot.create('success', val.msg , val.msg);
                    this.querygroupApp();
                });

    }


    // 列表传入的翻页数据
    monitorHandler(event) {
        console.log(event)
        this.pages.pi = event;
        this.page = {
            page: {
                current: event, // 页码
                size: this.pages.size, //  每页个数
            }
        };
        this.querygroupApp();
    }


    // 列表按钮方法
    buttonDataHandler(event) {
        console.log(event); // 根据event.value来判断不同的请求，来获取结果和方法或者进行路由的跳转
    }

    selectedRow(event) { // 选中方法，折叠层按钮显示方法
    }

    // 处理行为代码，跳转、弹出框、其他交互
    isActive(event) {
        console.log(event); // 拿到数据进行判断，是跳转路由还是弹出框弹出

    }



}
