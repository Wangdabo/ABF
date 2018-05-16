import {Component, OnInit, Inject, Injectable, APP_INITIALIZER, LOCALE_ID} from '@angular/core';
import {_HttpClient, User} from '@delon/theme';
import {MenuItem} from 'primeng/api';
import { UtilityService} from '../../../service/utils.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

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

    ngOnInit() {
        // this.getData(); // 调用初始化方法，把树数据传输进去
    }

/*
    getData() { // 初始化请求后台数据
        // 传入右击菜单数组,根据需求定
        this.treemenus = [
            {label: '新增', icon: 'fa-search', command: (event) => this.viewFile()},
            {label: '删除', icon: 'fa-close' , command: (event) => this.unselectFile()},
            {label: '复制', icon: 'fa fa-circle-o-notch' , command: (event) => this.close()},
        ];

        // 调用服务获取树操作
        const uri = this.urlconfig + '/treeData';
        // 请求头和请求参数是可选的，根据需求来选择是否使用
        // this.utilityService.getData(uri, {name: 'hello', age: 20}, {QQ: '332904234'})
        this.utilityService.getData(uri)
            .subscribe(
                (val) => {
                    console.log(val)
                    this.treedata = val;
                },
                response => {
                    // 如果数据不正确，则在这里给初始数据
                    this.treedata = [
                        {
                            'label': '测试数据',
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
                        },
                        {
                            'label': '你瞅啥',
                            'data': 'Pictures Folder',
                            'expandedIcon': 'fa-folder-open',
                            'collapsedIcon': 'fa-folder',
                            'children': [
                                {'label': '瞅你咋地', 'icon': 'fa-file-image-o', 'data': 'Barcelona Photo'},
                                {'label': '不服干我', 'icon': 'fa-file-image-o', 'data': 'PrimeFaces Logo'},
                                {'label': '你丫等着', 'icon': 'fa-file-image-o', 'data': 'PrimeUI Logo'}]
                        },
                    ]; // 传入树节点数据
                },
                () => {
                    console.log('The POST observable is now completed.');
                });

      /!*  const ur = this.urlconfig + '/news';

        this.utilityService.postData( ur, {'id': '4' , 'title': 'add data', 'author': 'wangbo'})
            .subscribe(
                (val) => {
                    console.log(val);
                });*!/
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
*/

}
