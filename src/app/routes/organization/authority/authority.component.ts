import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
})
export class AuthorityComponent implements OnInit {

    searchOptions; // 选择显示的内容
    selectedMultipleOption; // 多选的内容
    orgGuid: string;
    appclick = false;
    showAdd: boolean;
    configTitle: string;
    total: number;
    array = []; // 定义数组 用来清空


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
    }



    constructor(
        private http: _HttpClient,
        private activatedRoute: ActivatedRoute, // 注入路由，接收到参数
    ) { }

    ngOnInit() {
        this.orgGuid = this.activatedRoute.snapshot.params.id; // 拿到父组件传过来的组织机构的guid来进行操作
        this.showAdd = true;
        this.configTitle = '删除'
        this.selectedMultipleOption = [ 'tom', 'jack', 'lucy' ];
        this.searchOptions = [
                { value: 'jack', label: 'DD应用' },
                { value: 'lucy', label: 'A应用' },
                { value: 'tom', label: 'B应用' }
        ];
    }

    appClick() {
        console.log(this.selectedMultipleOption); // 传入后台，渲染
        this.appclick = true;
        // 调接口，第一个给工作组绑定应用的接口，第二个查询应用的接口
        this.getData('ces');
    }
    getData(id) {
        this.data = [
            {id: 'tom',  'appName': 'B应用', 'appType': '远程', 'openDate': '2018/6/7 14:45:20'},
            {id: 'lucy', 'appName': 'A应用', 'appType': '本次', 'openDate': '2018/6/7 14:45:20'},
            {id: 'jack', 'appName': 'DD应用', 'appType': '本次', 'openDate': '2018/6/7 14:45:20'},
        ];
        this.total = 2;
    }

    // 列表组件传过来的内容
    addHandler(event) {
        this.array = [];
        for ( let i = 0; i < this.data.length; i++ ) {
            if (this.data[i].id === event.id) {
                let indexs = this.data[i]
                this.data.splice(indexs, 1);
            }
        }


        // 删除对应的对象  id是值要删除的那个对象
        let indexs = this.selectedMultipleOption.findIndex(item => item.value === event.id ); // 根据条件删除数组中的指定对象,这个根据删除的id 来删除select数组对应的对象
        this.selectedMultipleOption.splice(indexs, 1);

        for ( var i = 0; i < this.selectedMultipleOption.length; i++) {
            this.array.push(this.selectedMultipleOption[i]);
        }

        setTimeout(_ => {
            this.selectedMultipleOption = this.array; // 重新赋值
        }, 1000);


    }

    // 列表传入的翻页数据
    monitorHandler(event) {
       console.log(event.id);


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
