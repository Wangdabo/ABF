import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {Router} from '@angular/router';
import {UtilityService} from '../../../service/utils.service';
import { SystemModule } from '../../../service/system';
import {stringDistance} from 'codelyzer/util/utils';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.less']
})
export class SystemComponent implements OnInit {

    constructor(
        private http: _HttpClient,
        private router: Router,
        private service: UtilityService
    ) {
        service.getBillTypes();
    }


    system: SystemModule = new SystemModule(); // 搜索值

    sysAdd: SystemModule = new SystemModule(); // 新增内容

    loading = false;
    isshow: boolean = false; // 默认是false 不显示

    // 应用
    guidApp = [
        { text: 'APF应用', value: false, key: 'ABF' },
        { text: '测试应用', value: false,  key: 'TEST' },
    ];
    // 值来源类型:
    valueFrom = [
        { text: '手动输入', value: false,  key: 'H' },
        { text: '业务类型', value: false,  key: 'busType' },
        { text: '接触方式', value: false,  key: 'contactMethod' },
        { text: '交易状态', value: false,  key: 'tradingStatus' },
        { text: '操作行为类型', value: false,  key: 'operational' },
        { text: '服务评价', value: false,  key: 'serAting' },
        { text: '服务类型', value: false,  key: 'serType' },
    ];

    // 参数值
    value = [
        { text: '选择值', value: false,  key: 'P' },
        { text: '操作值', value: false,  key: 'D' },
        { text: '内容值', value: false,  key: 'S' }
    ]

    modalVisible = false;

    data: any[] = []; // 表格数据
    headerData = [  // 配置表头内容
        {value: '应用系统', key: 'guidApp',  isclick: false},
        {value: '参数组别' , key: 'groupName', isclick: false},
        {value: '参数键', key: 'keyName',  isclick:  false},
        {value: '值来源' , key: 'valueFrom', isclick: false},
        {value: '参数值' , key: 'value', isclick: false},
        {value: '参数描述' , key: 'description', isclick: false},
    ];


    moreData = { morebutton: true,
        buttons: [
            {key: 'Overview' , value: '查看概况'}
        ]
    }

    test: string;





    ngOnInit() {
        this.getData(); // 只会触发一次，但是ngchanges并不会触发咋办
    }


    getData() { // 初始化请求后台数据
        this.data = [
            {'id': 1, 'guidApp': 'ABF', 'groupName': '测试', 'keyName': '测试1', 'valueFrom': '测试数据', 'value': '值1', 'description': '第一条数据'},
            {'id': 2, 'guidApp': '柜面系统', 'groupName': '测试2', 'keyName': '测试2', 'valueFrom': '测试数据2', 'value': '值2', 'description': '第二条数据' },
            {'id': 3, 'guidApp': 'ABF', 'groupName': '测试3', 'keyName': '测试3', 'valueFrom': '测试数据3', 'value': '值3', 'description': '第3条数据' },
            {'id': 4,  'guidApp': '柜面系统', 'groupName': '测试4', 'keyName': '测试4', 'valueFrom': '测试数据4', 'value': '值4', 'description': '第4条数据' },
            {'id': 5, 'guidApp': 'ABF', 'groupName': '测试5', 'keyName': '测试5', 'valueFrom': '测试数据5', 'value': '值5', 'description': '第5条数据' },
            {'id': 6,  'guidApp': '柜面系统', 'groupName': '测试6', 'keyName': '测试6', 'valueFrom': '测试数据6', 'value': '值6', 'description': '第6条数据' },
            {'id': 7,  'guidApp': 'ABF', 'groupName': '测试7', 'keyName': '测试7', 'valueFrom': '测试数据7', 'value': '值7', 'description': '第7条数据' },
            {'id': 8,  'guidApp': 'ABF', 'groupName': '测试8', 'keyName': '测试8', 'valueFrom': '测试数据8', 'value': '值8', 'description': '第8条数据' },
            {'id': 9, 'guidApp': '柜面系统', 'groupName': '测试9', 'keyName': '测试9', 'valueFrom': '测试数据9', 'value': '值9', 'description': '第9条数据' },
        ];
    }

    // 想一下，能否把这三个方法封装到一个ts里面，引入即可，不然每次都写着三个方法不太现实。
    // 列表组件传过来的内容
    addHandler(event) {
        console.log(this.system);

        if (event === '这里是新增的方法') {
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
        } else { // 代表修改，把修改的内容传递进去，重新渲染
            console.log(event)
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
        }
    }

    // 列表传入的翻页数据
    monitorHandler(event) {
        this.system.pi = event;
        // 当翻页的时候，重新请求后台，然后把数据重新渲染
        this.data = [
            {'id': 1, 'guidApp': 'ABF', 'groupName': '测试', 'keyName': '测试1', 'valueFrom': '测试数据', 'value': '值1', 'description': '第一条数据'},
            {'id': 2, 'guidApp': '柜面系统', 'groupName': '测试2', 'keyName': '测试2', 'valueFrom': '测试数据2', 'value': '值2', 'description': '第二条数据' },
            {'id': 3, 'guidApp': 'ABF', 'groupName': '测试3', 'keyName': '测试3', 'valueFrom': '测试数据3', 'value': '值3', 'description': '第3条数据' },
            {'id': 4,  'guidApp': '柜面系统', 'groupName': '测试4', 'keyName': '测试4', 'valueFrom': '测试数据4', 'value': '值4', 'description': '第4条数据' },
            {'id': 5, 'guidApp': 'ABF', 'groupName': '测试5', 'keyName': '测试5', 'valueFrom': '测试数据5', 'value': '值5', 'description': '第5条数据' }
        ];

    }

    // 接受子组件删除的数据 单条还是多条
    deleatData(event) {
        console.log(event)
        this.data = [
            {'id': 1, 'guidApp': 'ABF', 'groupName': '测试', 'keyName': '测试1', 'valueFrom': '测试数据', 'value': '值1', 'description': '第一条数据'},
            {'id': 2, 'guidApp': '柜面系统', 'groupName': '测试2', 'keyName': '测试2', 'valueFrom': '测试数据2', 'value': '值2', 'description': '第二条数据' }
        ];
    }


    // 列表按钮方法
    buttonDataHandler(event) {
        console.log(event); // 根据event.value来判断不同的请求，来获取结果和方法或者进行路由的跳转
        if (event.value ===  'Authority') {
            console.log(event.key);
        }

        if (event.value ===  'Overview') {
            console.log(event.key);
        }

    }



    // 处理行为代码，跳转、弹出框、其他交互
    isActive(event) {
        console.log(event); // 拿到数据进行判断，是跳转路由还是弹出框弹出


        // 路由跳转
        this.router.navigate(['APPlication'],{ queryParams: { name: event } });
    }


    selectedRow(event) { // 选中方法，折叠层按钮显示方法
        console.log(event);
      /*  if (event[0].empType === '在职') {
            this.moreData.buttons = [
                {key: 'Departure' , value: '离职'},
                {key: 'Overview' , value: '查看概况'},
                {key: 'orgsettings' , value: '组织机构设置'},
                {key: 'operator' , value: '操作员修改'},
            ];
        }

        if (event[0].empType === '在招') {
            this.moreData.buttons = [
                {key: 'Departure' , value: '入职'},
                {key: 'Overview' , value: '查看概况'},
                {key: 'orgsettings' , value: '组织机构设置'},
                {key: 'operator' , value: '操作员修改'},
            ];
        }*/
    }



    // 搜索框
    search() {
        console.log(this.system)
        // 把搜索值传给后台，后台数据重新传给子组件
        this.data = [
            {'id': 1, 'guidApp': 'ABF', 'groupName': '测试', 'keyName': '测试1', 'valueFrom': '测试数据', 'value': '值1', 'description': '第一条数据'},
            {'id': 2, 'guidApp': '柜面系统', 'groupName': '测试2', 'keyName': '测试2', 'valueFrom': '测试数据2', 'value': '值2', 'description': '第二条数据' },
            {'id': 3, 'guidApp': 'ABF', 'groupName': '测试3', 'keyName': '测试3', 'valueFrom': '测试数据3', 'value': '值3', 'description': '第3条数据' },
            {'id': 4,  'guidApp': '柜面系统', 'groupName': '测试4', 'keyName': '测试4', 'valueFrom': '测试数据4', 'value': '值4', 'description': '第4条数据' },
            {'id': 5, 'guidApp': 'ABF', 'groupName': '测试5', 'keyName': '测试5', 'valueFrom': '测试数据5', 'value': '值5', 'description': '第5条数据' },
            {'id': 6,  'guidApp': '柜面系统', 'groupName': '测试6', 'keyName': '测试6', 'valueFrom': '测试数据6', 'value': '值6', 'description': '第6条数据' }
        ]; // 有效
    }


    // selete监听方法
    checkSelect(i, k) {
        if (i !== null) {
            this.isshow = true;
            this.sysAdd.value = null

            if ( i === 'busType') {
                this.value = [
                    { text: '改变值', value: false,  key: 'G' },
                    { text: '座位置', value: false,  key: 'P' }
                ];
            }

            if ( i === 'serAting') {
                this.value = [
                    { text: '好评', value: false,  key: 'H' },
                    { text: '差评', value: false,  key: 'S' },
                ];
            }
        } else {
            this.isshow = false;
        }




    }




    // 弹出框保存组件
    save() {
        console.log(this.sysAdd);
        // 添加了两条数据
        this.data = [
            {'id': 1, 'guidApp': 'ABF', 'groupName': '测试', 'keyName': '测试1', 'valueFrom': '测试数据', 'value': '值1', 'description': '第一条数据'},
            {'id': 2, 'guidApp': '柜面系统', 'groupName': '测试2', 'keyName': '测试2', 'valueFrom': '测试数据2', 'value': '值2', 'description': '第二条数据' },
            {'id': 3, 'guidApp': 'ABF', 'groupName': '测试3', 'keyName': '测试3', 'valueFrom': '测试数据3', 'value': '值3', 'description': '第3条数据' },
            {'id': 4,  'guidApp': '柜面系统', 'groupName': '测试4', 'keyName': '测试4', 'valueFrom': '测试数据4', 'value': '值4', 'description': '第4条数据' },
            {'id': 5, 'guidApp': 'ABF', 'groupName': '测试5', 'keyName': '测试5', 'valueFrom': '测试数据5', 'value': '值5', 'description': '第5条数据' },
            {'id': 6,  'guidApp': '柜面系统', 'groupName': '测试6', 'keyName': '测试6', 'valueFrom': '测试数据6', 'value': '值6', 'description': '第6条数据' },
            {'id': 7,  'guidApp': 'ABF', 'groupName': '测试7', 'keyName': '测试7', 'valueFrom': '测试数据7', 'value': '值7', 'description': '第7条数据' },
            {'id': 8,  'guidApp': 'ABF', 'groupName': '测试8', 'keyName': '测试8', 'valueFrom': '测试数据8', 'value': '值8', 'description': '第8条数据' },
            {'id': 9, 'guidApp': '柜面系统', 'groupName': '测试9', 'keyName': '测试9', 'valueFrom': '测试数据9', 'value': '值9', 'description': '第9条数据' },
            {'id': 10, 'guidApp': '柜面系统', 'groupName': '测试10', 'keyName': '测试10', 'valueFrom': '测试数据10', 'value': '值10', 'description': '第10条数据' },
            {'id': 11, 'guidApp': '柜面系统', 'groupName': '测试11', 'keyName': '测试11', 'valueFrom': '测试数据11', 'value': '值11', 'description': '第11条数据' },
            {'id': 12, 'guidApp': '柜面系统', 'groupName': '测试12', 'keyName': '测试12', 'valueFrom': '测试数据12', 'value': '值12', 'description': '第12条数据' },
        ]; // 有效
        this.modalVisible = false;
    }
}
