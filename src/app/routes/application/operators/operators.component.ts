import {Component, Input, NgModule, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Router} from '@angular/router';
import { UtilityService } from '../../../service/utils.service';


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


   /* // @ViewChild(子组件名称)   可以直接调用子组件的方法
    @ViewChild(ListComponent) child: ListComponent;*/

    operator: any = { // 定义一个对象
        pi: 1, // 页数
        ps: 10, // 每业个数
        name:'', // 操作员姓名
        password:'',
        userId:'',
        invalDate:'',
        status: null,
    };


    loading = false;

    status = [
        { text: '正常', value: false, type: 'normal' },
        { text: '挂起', value: false, type: 'hang' },
        { text: '注销', value: false, type: 'logOut' },
        { text: '锁定', value: false, type: 'locking' }
    ];

    modalVisible = false;

    data: any[] = []; // 表格数据
    headerData = [  // 配置表头内容
        {value: '规则编号', key: 'no', isclick:false},
        {value: '描述' , key: 'description',isclick:true},
        {value: '服务调用次数', key: 'callNo',isclick:false},
        {value: '状态' , key: 'status',isclick:false},
        {value: '更新时间', key: 'updatedAt',isclick:false},
        {value: '标题', key: 'title',isclick:false},
    ];

    test: string;

    constructor(
        private http: _HttpClient,
        private router: Router,
        private service: UtilityService
    ) {
        service.getBillTypes();
    }



    ngOnInit() {
        this.getData(); // 只会触发一次，但是ngchanges并不会触发咋办
    }




    getData() { // 初始化请求后台数据
        this.data = [
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 1,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"父组件传递的内容值",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 1",
                owner: "王星名",
                progress: 53,
                status: 1,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 1",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'
            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 2,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 2",
                owner: "王星名",
                progress: 54,
                status: 2,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 2",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'
            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 3,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 3",
                owner: "王星名",
                progress: 55,
                status: 3,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 3",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 4,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述4",
                disabled: false,
                href: "https://ant.design",
                key: 4,
                no: "TradeCode 1",
                owner: "王星名",
                progress: 56,
                status: 4,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 4",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 5,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述",
                disabled: false,
                href: "https://ant.design",
                key: 5,
                no: "TradeCode 5",
                owner: "王星名",
                progress: 57,
                status: 5,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 5",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 6,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述6",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 3",
                owner: "王星名",
                progress: 58,
                status: 6,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 6",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 7,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 7",
                owner: "王星名",
                progress: 60,
                status: 7,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 7",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 8,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述8",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 8",
                owner: "王星名",
                progress: 61,
                status: 8,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 8",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 9,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 9",
                owner: "王星名",
                progress: 62,
                status: 9,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 9",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            }
        ];
    }

    // 想一下，能否把这三个方法封装到一个ts里面，引入即可，不然每次都写着三个方法不太现实。
    // 列表组件传过来的内容
    addHandler(event) {

       // this.modalVisible = true;  // 把列表组件传入的内容复制给prictQuote
        if (event === '这里是新增的方法') {
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
        } else{ // 代表修改，把修改的内容传递进去，重新渲染
            console.log(event)
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
        }
    }

    // 列表传入的翻页数据
    monitorHandler(event) {
        this.operator.pi = event;
        // 当翻页的时候，重新请求后台，然后把数据重新渲染
        /*this.data = [
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 1,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"父组件传递的内容值",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 1",
                owner: "王星名",
                progress: 53,
                status: 1,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 1",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            }
        ];*/

    }

    // 接受子组件删除的数据 单条还是多条
    deleatData(event) {
        console.log(event)
        this.data =   [
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 10,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一条新增的数据",
                disabled: false,
                href: "https://ant.design",
                key: 10,
                no: "TradeCode 10",
                owner: "王星名",
                progress: 63,
                status: 10,
                statusText: "运行中",
                statusType: "processing",
                title: "模拟新增的一条数据",
                updatedAt:'2018/3/27 15:44:40'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 1,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"父组件传递的内容值",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 1",
                owner: "王星名",
                progress: 53,
                status: 1,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 1",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },

        ];
    }


    // 处理行为代码，跳转、弹出框、其他交互
    isActive(event) {
        console.log(event); // 拿到数据进行判断，是跳转路由还是弹出框弹出


        // 路由跳转
        this.router.navigate(['APPlication'],{ queryParams: { name: event } });
    }


    // 搜索框
    search() {
        console.log(this.operator)
        // 把搜索值传给后台，后台数据重新传给子组件
        this.data =   [
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 10,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一条新增的数据",
                disabled: false,
                href: "https://ant.design",
                key: 10,
                no: "TradeCode 10",
                owner: "王星名",
                progress: 63,
                status: 10,
                statusText: "运行中",
                statusType: "processing",
                title: "模拟新增的一条数据",
                updatedAt:'2018/3/27 15:44:40'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 1,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"父组件传递的内容值",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 1",
                owner: "王星名",
                progress: 53,
                status: 1,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 1",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 2,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 2",
                owner: "王星名",
                progress: 54,
                status: 2,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 2",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'
            }
        ]; // 有效
    }



    // 弹出框保存组件
    save() {
        console.log(this.operator);
        // 添加了两条数据
        this.data =   [
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 10,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一条新增的数据",
                disabled: false,
                href: "https://ant.design",
                key: 10,
                no: "TradeCode 10",
                owner: "王星名",
                progress: 63,
                status: 10,
                statusText: "运行中",
                statusType: "processing",
                title: "模拟新增的一条数据",
                updatedAt:'2018/3/27 15:44:40'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 1,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"父组件传递的内容值",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 1",
                owner: "王星名",
                progress: 53,
                status: 1,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 1",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 2,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 2",
                owner: "王星名",
                progress: 54,
                status: 2,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 2",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'
            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 3,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 3",
                owner: "王星名",
                progress: 55,
                status: 3,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 3",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 4,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述4",
                disabled: false,
                href: "https://ant.design",
                key: 4,
                no: "TradeCode 1",
                owner: "王星名",
                progress: 56,
                status: 4,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 4",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 5,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述",
                disabled: false,
                href: "https://ant.design",
                key: 5,
                no: "TradeCode 5",
                owner: "王星名",
                progress: 57,
                status: 5,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 5",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 6,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述6",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 3",
                owner: "王星名",
                progress: 58,
                status: 6,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 6",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 7,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 7",
                owner: "王星名",
                progress: 60,
                status: 7,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 7",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 8,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述8",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 8",
                owner: "王星名",
                progress: 61,
                status: 8,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 8",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 9,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 9",
                owner: "王星名",
                progress: 62,
                status: 9,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 9",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 4,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述4",
                disabled: false,
                href: "https://ant.design",
                key: 4,
                no: "TradeCode 1",
                owner: "王星名",
                progress: 56,
                status: 4,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 4",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 5,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述",
                disabled: false,
                href: "https://ant.design",
                key: 5,
                no: "TradeCode 5",
                owner: "王星名",
                progress: 57,
                status: 5,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 5",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 6,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述6",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 3",
                owner: "王星名",
                progress: 58,
                status: 6,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 6",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 7,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 7",
                owner: "王星名",
                progress: 60,
                status: 7,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 7",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 8,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述8",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 8",
                owner: "王星名",
                progress: 61,
                status: 8,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 8",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            },
            {
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                callNo: 9,
                createdAt:'Tue Jul 18 2017 08:00:00 GMT+0800',
                description:"这是一段描述",
                disabled: false,
                href: "https://ant.design",
                key: 1,
                no: "TradeCode 9",
                owner: "王星名",
                progress: 62,
                status: 9,
                statusText: "运行中",
                statusType: "processing",
                title: "一个任务名称 9",
                updatedAt:'Tue Jul 18 2017 08:00:00 GMT+0800'

            }
    ]; // 有效
        this.modalVisible = false;
    }



    /* 如果弹出框单独抽出来，通过这个方法进行传递内容，感觉没必要单独抽出来
    selectChanges(event) {
        console.log(event);
        this.modalVisible = event.flag; // 重新赋值
    }*/
}
