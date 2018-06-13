import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilityService} from '../../../service/utils.service';
import { EmpModule } from '../../../service/emp';
import {appConfig} from '../../../service/common';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import { PinYinUtil } from '../../../service/pinyin.util';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.less']
})
export class EmpComponent implements OnInit {

    constructor(
        private http: _HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute, // 注入路由，接收到参数
        private nznot: NzNotificationService,
        private utilityService: UtilityService,
    ) {
    }

    emp: EmpModule = new EmpModule();
    empAdd: EmpModule = new EmpModule();

    ifshow: boolean = true;

    gender: any;
    page: any;

    // 员工状态
    empType: any;


    // 直接主管
    supervisor: any;

    // 证件类型
    paperType: any;
    loading = false;

    type = [
        { text: '正常', value: false, key: 'normal' },
        { text: '挂起', value: false, key: 'hang' },
        { text: '注销', value: false, key: 'logOut' },
        { text: '锁定', value: false, key: 'locking' }
    ];
    // 操作员类型
    radioValue = [
        { text: '新建默认操作员', value: false, key: 'creat' },
        { text: '选择已存在的', value: false, key: 'extant' },
        { text: '暂不选择操作员', value: false, key: 'noselect' }
    ];

    // 弹出框默认关闭
    modalVisible = false;
    onboarding = false;
    departure = false; // 离职弹窗
    isEdit = false; // 默认是新增，不是修改
    total: number;
    emppost: any; // 基本岗位

    data: any[] = []; // 表格数据
    headerData = [  // 配置表头内容
        {value: '员工姓名' , key: 'empName', isclick: false},
        {value: '操作员', key: 'guidOperator',  isclick:  false},
        {value: '基本岗位' , key: 'guidPosition', isclick: false},
        {value: '员工状态' , key: 'empstatus', isclick: false},
        {value: '电话号码' , key: 'mobileno', isclick: false},
        {value: '入职日期' , key: 'inDate', isclick: false},
    ];


    moreData = {
        morebutton: true,
        buttons: [
            {key: 'Onboarding' , value: '入职'},
            {key: 'Departure' , value: '离职'},
            {key: 'Overview' , value: '查看概况'},
            {key: 'operator' , value: '操作员修改'},
        ]
    };

    orgGuid: string;

    ngOnInit() {
        this.orgGuid = this.activatedRoute.snapshot.params.id; // 拿到父组件传过来的组织机构的guid来进行操作
        this.getData();
        // console.log(PinYinUtil.chineseTopinYin('翁方雷').toLowerCase())

        // 枚举值转换
        this.gender = appConfig.Enumeration.gender;
        this.paperType = appConfig.Enumeration.paperType;
        this.empType = appConfig.Enumeration.empType;

    }





    getData() { // 初始化请求后台数据
        this.page = {
            page: {
                current: this.emp.pi,
                size: this.emp.size,
            }
        };

        // 查询所有岗位
        this.utilityService.getData(appConfig.testUrl + appConfig.API.allpostList)
            .subscribe(
                (val) => {
                    this.emppost = val.result;
                });

        // 查询组织机构下所有员工
        this.utilityService.postData(appConfig.testUrl + appConfig.API.queryorgList + '/' + this.orgGuid ,  this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    console.log(val.result.records)
                    // 没有在岗员工，模拟一下
                    for ( let i = 0; i < val.result.records.length; i++) {
                        if ( val.result.records[i].empstatus === '在招') {
                            val.result.records[i].buttonData = ['入职'];
                        } else if (val.result.records[i].empstatus === '在职') {
                            val.result.records[i].buttonData = ['离职'];
                        }
                    }
                    // 测试主管，后期删掉
                    this.supervisor = val.result.records;
                    this.data = val.result.records;
                    this.total = val.result.total;
                });
    }

    // 枚举值转换
    empStatus(event) {
        if (event.empstatus === '在招') {
            event.empstatus = 'offer';
        } else if (event.empstatus === '在职') {
            event.empstatus = 'onjob';
        } else if (event.empstatus === '离职') {
            event.empstatus = 'offjob';
        }
    }

    empgender(event) {
        if (event.gender === '男') {
            event.gender = 'M';
        } else if (event.gender === '女') {
            event.gender = 'F';
        } else if (event.gender === '未知') {
            event.fromType = 'U';
        }
    }

    // 想一下，能否把这三个方法封装到一个ts里面，引入即可，不然每次都写着三个方法不太现实。
    // 列表组件传过来的内容
    addHandler(event) {
        this.empAdd = new EmpModule(); // 重新清空赋值
        this.ifshow = false; // 默认是基础信息
        if (event === '这里是新增的方法') {
            this.isEdit = false;
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
            this.empAdd.radioValue = 'creat';
        } else { // 代表修改，把修改的内容传递进去，重新渲染
            this.isEdit = true;  // 修改
            this.empgender(event);
            this.empAdd =  event;
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
        }
    }

    // 列表传入的翻页数据
    monitorHandler(event) {
        this.emp.pi = event;
        // 当翻页的时候，重新请求后台，然后把数据重新渲染

    }

    // 接受子组件删除的数据 单条还是多条
    deleatData(event) {
        console.log(event)
        this.data = [
            {'id': 1, 'empName': '汪波', 'empCode': 'EMP000199', 'gender': '男', 'empType': '在职', 'emprank': '初级', 'emppost': '\n' +
                '科长' , 'supervisor': '来哥', 'organization': '上海银行' },
            {'id': 2, 'empName': '郝甜甜', 'empCode': 'EMP000198', 'gender': '女', 'empType': '在职', 'emprank': '中级', 'emppost': '\n' +
                '存款业务经理' , 'supervisor': '庄壮志', 'organization': '工商分行' }
        ];
    }


    // 列表按钮方法
    buttonDataHandler(event) {


        if (event.value === 'Overview') {
            console.log('查看概况');
        }

        // 如果有操作员 则编辑操作员
        if (event.value === 'operator') {
            console.log('员工操作员修改');
        }
    }



    // 右侧按钮方法
    buttonEvent(e) {
        if (e.names) {
            if (e.names === '入职') {
                this.onboarding = true; // 打开入职弹出框
                console.log('调用入职方法');

            } else if (e.names === '离职') {
                console.log('调用离职方法');

            }
        }
    }


    selectedRow(event) { // 选中方法，折叠层按钮显示方法
        if (event.indeterminate) {
            if (event.selectedRows[0].empType === '在职') {
                this.moreData.buttons = [
                    {key: 'Departure' , value: '离职'},
                    {key: 'Overview' , value: '查看概况'},
                    {key: 'orgsettings' , value: '组织机构设置'},
                    {key: 'operator' , value: '操作员修改'},
                ];
            }
            if (event.selectedRows[0].empType === '在招') {
                this.moreData.buttons = [
                    {key: 'Onboarding' , value: '入职'},
                    {key: 'Overview' , value: '查看概况'},
                    {key: 'orgsettings' , value: '组织机构设置'},
                    {key: 'operator' , value: '操作员修改'},
                ];
            }
        }

    }

    // 处理行为代码，跳转、弹出框、其他交互
    isActive(event) {
        console.log(event); // 拿到数据进行判断，是跳转路由还是弹出框弹出

        // 路由跳转
        this.router.navigate(['APPlication'],{ queryParams: { name: event } });
    }


    // 搜索框
    search() {
        // 把搜索值传给后台，后台数据重新传给子组件
        this.data = [
            {'id': 1, 'empName': '汪波', 'empCode': 'EMP000199', 'gender': '男', 'empType': '在职', 'emprank': '初级', 'emppost': '\n' +
                '科长' , 'supervisor': '来哥', 'organization': '上海银行' },
            {'id': 2, 'empName': '郝甜甜', 'empCode': 'EMP000198', 'gender': '女', 'empType': '在职', 'emprank': '中级', 'emppost': '\n' +
                '存款业务经理' , 'supervisor': '庄壮志', 'organization': '工商分行' },
            {'id': 3, 'empName': '李宁宁', 'empCode': 'EMP000178', 'gender': '男', 'empType': '在招', 'emprank': '高级', 'emppost': '\n' +
                '理财柜员' , 'supervisor': '鲍晨捷', 'organization': '北京银行' },
            {'id': 4, 'empName': '赵天赏', 'empCode': 'EMP000172', 'gender': '男', 'empType': '在职', 'emprank': '初级', 'emppost': '\n' +
                'JAVA开发工程师' , 'supervisor': '黄锡华', 'organization': '上海银行' }
        ];
    }

    // 弹出框保存组件
    save() {
        const jsonOption = this.empAdd;
        jsonOption.guidOrg = this.orgGuid;
        if (!this.isEdit) { // 新增数据
            jsonOption.guidOperator = '1004255384455671810'; // 修改之前模拟测试
            this.utilityService.postData(appConfig.testUrl  + appConfig.API.emporgAdd, jsonOption)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        this.nznot.create('success', val.msg , val.msg);
                        this.getData();
                    },
                );
        } else {
            this.empStatus(jsonOption);
            this.utilityService.putData(appConfig.testUrl  + appConfig.API.emporgAdd, jsonOption)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        this.nznot.create('success', val.msg , val.msg);
                        this.getData();
                    },
                );
        }

        this.modalVisible = false;
    }

    // 点击入职的方法
    select(i) {
        if (i.key === 'noselect') { // 如果是不选择，那么就为空
            this.empAdd.userId = '';
        }
    }


    // 入职弹出框保存按钮
    onboardingsave() {
        console.log(this.empAdd);
    }

    // 点击离职方法
    ondeparturesave() {
        console.log(this.empAdd);
        this.departure = false;

    }


    // 完善其他信息
    basicinfo() {
        this.ifshow = !this.ifshow;
    }

    // 返回上一步
    addBack() {
        console.log(1)
        this.ifshow = !this.ifshow;
    }


}
