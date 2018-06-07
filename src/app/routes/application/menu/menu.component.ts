import {Component, OnInit, Inject, Injectable, APP_INITIALIZER, LOCALE_ID} from '@angular/core';
import {_HttpClient, User} from '@delon/theme';
import {MenuItem} from 'primeng/api';
import { UtilityService} from '../../../service/utils.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {appConfig} from '../../../service/common';
import { AcMenuModule} from '../../../service/common.module';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})

// 依赖注入，把url链接注入进来即可
@Injectable()
export class MenuComponent implements OnInit {
    constructor(
        private http: _HttpClient,
        private utilityService: UtilityService,
    ) { }

    treedata: any[]; // tree组件数据
    treemenus: MenuItem[]; // 右击菜单数据
    page: any;
    total: number;
    acmenuModule: AcMenuModule = new AcMenuModule();
    data: any[] = []; // 表格数据
    appData: any[]; // 应用数据
    guidParents: any; // 父菜单
    isDisplay: boolean ;
    treeshow = false; // 是否显示树结构

    ngOnInit() {
        this.isDisplay = true;
        this.acmenuModule.pi = 1;
        this.acmenuModule.size = 10;
         this.getAppData(); // 先查询应用信息
    }

    // 查询有哪些应用
    getAppData() {
        this.page = {
            page: {
                current: 1,
                size: 100,
            }
        };
        this.utilityService.postData(appConfig.testUrl + appConfig.API.appList, this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    this.appData = val.result.records;
                }
            );
    }

    appCodeChange(uuid: string) {
        //  根据应用ID 查菜单
        // 传入右击菜单数组,根据需求定
        this.treemenus = [
            {label: '新增', icon: 'fa-search', command: (event) => this.viewFile()},
            {label: '删除', icon: 'fa-close' , command: (event) => this.unselectFile()},
            {label: '复制', icon: 'fa fa-circle-o-notch' , command: (event) => this.close()},
        ];

        // 调用服务获取树操作
        // this.page = {
        //     page: {
        //         current: this.acmenuModule.pi,
        //         size: this.acmenuModule.size,
        //     }
        // };

        // 调用服务来获取列表节点操作
        this.utilityService.getData(appConfig.testUrl + appConfig.API.acMenuListByAppcode + uuid)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    // this.treedata = val.result.records; // 绑定列表数据
                    // this.guidParents = val.result.records;
                    // this.total = val.result.total;
                    val.result.label = '应用';
                    val.result.expandedIcon = 'fa-folder-open';
                    val.result.collapsedIcon = 'fa-folder';
                    val.result.childDict = true; // 是业务字典
                });
        this.treeshow = true; // 显示树结构

    }






    viewFile() {
        alert('点我1');
    }

    unselectFile() {
        alert('电你1');
    }


    close() {
         alert('改变');
    }


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

    searchVal($event) {

        console.log($event);
    }


}
