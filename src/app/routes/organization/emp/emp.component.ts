import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilityService} from '../../../service/utils.service';
import { EmpModule } from '../../../service/emp';
import {appConfig} from '../../../service/common';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';

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

    // 员工状态
    empType: any;

    // 员工职级
    emprank = [
        {key: 'practice' , value: '实习'},
        {key: 'primary' , value: '初级'},
        {key: 'intermediate' , value: '中级'},
        {key: 'Senior' , value: '资深'},
        {key: 'scientist' , value: '科学家'},
        {key: 'management' , value: '管理'},
        {key: 'Director' , value: '总管'},
    ];

    // 基本岗位
    emppost = [
        {key: 'President' , value: '行长'},
        {key: 'Teller' , value: '柜员'},
        {key: 'accounting' , value: '会计'},
        {key: 'Outlets' , value: '网点'},
        {key: 'principal' , value: '负责人'}
    ];

    // 直接主管
    supervisor = [
        {key: 'emp001' , value: '张三'},
        {key: 'emp002' , value: '来哥'},
        {key: 'emp003' , value: '李四'},
        {key: 'emp004' , value: '王五'},
        {key: 'emp005' , value: '金四'}
    ]
    // 主机构
    organization = [
        {key: 'org001' , value: '工商银行'},
        {key: 'org002' , value: '上海银行'},
        {key: 'org003' , value: '中国银行分行'},
        {key: 'org004' , value: '上海银行浦东分行'},
        {key: 'org005' , value: '北京银行'},
        {key: 'org006' , value: '农商分行'},
        {key: 'org007' , value: '建设银行'},
        {key: 'org008' , value: '上海银行浦东分行'},
    ];
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

    data: any[] = []; // 表格数据
    headerData = [  // 配置表头内容
        {value: '员工代码', key: 'empCode',  isclick: false},
        {value: '员工姓名' , key: 'empName', isclick: false},
        {value: '性别', key: 'gender',  isclick:  false},
        {value: '员工状态' , key: 'empType', isclick: false},
        {value: '员工职级' , key: 'emprank', isclick: false},
        {value: '基本岗位' , key: 'emppost', isclick: false},
        {value: '直接主管' , key: 'supervisor', isclick: false},
        {value: '主机构' , key: 'organization', isclick: false},
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
        this.getData();

        // this.orgGuid = this.activatedRoute.snapshot.params.id; // 拿到父组件传过来的组织机构的guid来进行操作
        this.orgGuid = '1006066753115021313'; // 测试新增员工接口
        console.log(this.orgGuid);


        // 枚举值转换
        this.gender = appConfig.Enumeration.gender;
        this.paperType = appConfig.Enumeration.paperType;
        this.empType = appConfig.Enumeration.empType;
    }


    getData() { // 初始化请求后台数据
        this.data = [
            {'id': 1, 'empName': '汪波', 'empCode': 'EMP000199', 'gender': '男', 'empType': '在职', 'emprank': '初级', 'emppost': '\n' +
                '科长' , 'supervisor': '来哥', 'organization': '上海银行' },
            {'id': 2, 'empName': '郝甜甜', 'empCode': 'EMP000198', 'gender': '女', 'empType': '在职', 'emprank': '中级', 'emppost': '\n' +
                '存款业务经理' , 'supervisor': '庄壮志', 'organization': '工商分行' },
            {'id': 3, 'empName': '李宁宁', 'empCode': 'EMP000178', 'gender': '男', 'empType': '在招', 'emprank': '高级', 'emppost': '\n' +
                '理财柜员' , 'supervisor': '鲍晨捷', 'organization': '北京银行' },
            {'id': 4, 'empName': '赵天赏', 'empCode': 'EMP000172', 'gender': '男', 'empType': '在职', 'emprank': '初级', 'emppost': '\n' +
                'JAVA开发工程师' , 'supervisor': '黄锡华', 'organization': '上海银行' },
            {'id': 5, 'empName': '李雪', 'empCode': 'EMP000172', 'gender': '男', 'empType': '离职', 'emprank': '中级', 'emppost': '\n' +
                '贷款业务经理' , 'supervisor': '刘朋华', 'organization': '上海银行浦东分行' },
            {'id': 6, 'empName': '赵钰', 'empCode': 'EMP000174', 'gender': '男', 'empType': '在职', 'emprank': '特级', 'emppost': '\n' +
                '高柜综合柜员' , 'supervisor': '过光锋', 'organization': '工商分行' },
            {'id': 7, 'empName': '李凤', 'empCode': 'EMP000179', 'gender': '女', 'empType': '在招', 'emprank': '实习', 'emppost': '\n' +
                '现金柜员' , 'supervisor': '王勇', 'organization': '上海银行' },
            {'id': 8, 'empName': '关月', 'empCode': 'EMP000207', 'gender': '女', 'empType': '在职', 'emprank': '初级', 'emppost': '\n' +
                'web前端开发' , 'supervisor': '过光锋', 'organization': '工商银行网点' }
        ];
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
        console.log(event); // 根据event.value来判断不同的请求，来获取结果和方法或者进行路由的跳转
        if (event.value ===  'Onboarding') { // 入职方法
            this.onboarding = true; // 打开入职弹出框
        }

        if (event.value ===  'Departure') { // 离职方法
            this.departure = true;
        }

        if (event.value === 'Overview') {
            console.log('查看概况');
        }

        // 如果有操作员 则编辑操作员
        if (event.value === 'operator') {
            console.log('员工操作员修改');
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

        console.log(jsonOption);
        if (!this.isEdit) { // 新增数据
            this.utilityService.postData(appConfig.testUrl  + appConfig.API.emporgAdd, jsonOption)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        console.log(val)
                        this.nznot.create('success', val.msg , val.msg);
                    },
                );
        } else {
             console.log('修改数据');
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
