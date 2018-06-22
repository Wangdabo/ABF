import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ActivatedRoute, Router} from '@angular/router';
import { UtilityService} from '../../../../service/utils.service';
import { EmpModule } from '../../../../service/emp';
import {appConfig} from '../../../../service/common';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import { PinYinUtil } from '../../../../service/pinyin.util';
import * as moment from 'moment';
import {PageModule} from '../../../../service/common.module';

@Component({
  selector: 'app-group-emp',
  templateUrl: './group-emp.component.html',
})
export class GroupEmpComponent implements OnInit {

    constructor(
        private http: _HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute, // 注入路由，接收到参数
        private modal: NzModalService,
        private nznot: NzNotificationService,
        private utilityService: UtilityService,
    ) {
    }

    gender: any;
    page: any;
    // 员工状态
    empType: any;
    // 直接主管
    supervisor: any;
    pages: PageModule = new PageModule();
    operData: any; // 操作员

    empGuid: string; // 员工guid

    // 证件类型
    paperType: any;
    loading = false;

    selectedOption;
    searchOptions;

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
    isEdit = false; // 默认是新增，不是修改
    total: number;

    data: any[] = []; // 表格数据
    headerData = [  // 配置表头内容
        {value: '员工姓名' , key: 'empName', isclick: false},
        {value: '操作员', key: 'userId',  isclick:  false},
        {value: '基本岗位' , key: 'positionName', isclick: false},
        {value: '员工状态' , key: 'empstatus', isclick: false},
        {value: '电话号码' , key: 'mobileno', isclick: false},
        {value: '入职日期' , key: 'inDate', isclick: false},
    ];
    orgGuid: '';
    configTitle: string;
    moreData = {
        morebutton: true,
        buttons: [
            {key: 'Overview' , value: '查看概况'}
        ]
    };
    empAddType: any;
    codeGroup: string; // 工作组code
    // 选择状态
    itemType = [
        {value: '当前机构员工', key: 'orgEmp'},
        {value: '其他机构员工', key: 'orginfoEmp'},
    ];


    ngOnInit() {
        this.codeGroup = this.activatedRoute.snapshot.params.id; // 拿到父组件传过来的组织机构的guid来进行操作
        // 枚举值转换
        this.gender = appConfig.Enumeration.gender;
        this.paperType = appConfig.Enumeration.paperType;
        this.empType = appConfig.Enumeration.empType;
        this.configTitle = '删除'
        // 查询工作组详情
        this.utilityService.getData(appConfig.testUrl  + appConfig.API.omGroups + '/' + this.codeGroup)
            .subscribe(
                (val) => {
                    this.orgGuid = val.result.guidOrg; // 绑定机构guid
                },
            );

        this.queryGroupEmp(); // 查询工作组下的员工
    }


    queryGroupEmp() {
        const page = {
            page: {
                current: this.pages.pi,
                size: this.pages.size,
            }
        };
        this.utilityService.postData(appConfig.testUrl + appConfig.API.omGroups + '/' + this.codeGroup + '/emp', page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    for (let i = 0; i < val.result.records.length; i++) {
                        val.result.records[i].buttonData = ['删除'];
                    }
                    this.data = val.result.records;
                    this.total = val.result.total;
                });
    }

    // 查询机构下员工,感觉应该是查出不在当前工作组下的
    getData(orgGuid) {

        this.utilityService.getData(appConfig.testUrl + appConfig.API.omGroups + '/' + this.codeGroup + '/empNotIn/' + orgGuid, {})
            .subscribe(
                (val) => {
                    console.log(val)
                    this.searchOptions = val.result;
                });

    };

    // 查询机构之外的其他员工,同样应该是不在当前工作组下的
    getallData(e) {

    }


    // 列表组件传过来的内容
    addHandler(event) {
        this.empAddType = 'orgEmp'; // 默认是当前机构员工
        this.getData(this.orgGuid);
        this.modalVisible = true;
    }


    // 列表传入的翻页数据
    monitorHandler(event) {
        this.pages.pi = event;
        // 当翻页的时候，重新请求后台，然后把数据重新渲染
    }

    // 接受子组件删除的数据 单条还是多条
    deleatData(event) {

    }


    // 列表按钮方法
    buttonDataHandler(event) {

    }


    // 右侧按钮方法
    buttonEvent(e) {
        console.log(e)
        if (e.names) {

            if (e.names === '删除') {
                this.modal.open({
                    title: '是否删除',
                    content: '您是否确认删除所选员工?',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        this.utilityService.deleatData(appConfig.testUrl + appConfig.API.omGroups + '/' + this.codeGroup + '/empGroup/' + e.guid)
                            .map(res => res.json())
                            .subscribe(
                                (val) => {
                                    this.nznot.create('success', val.msg , val.msg);
                                    if ( !(( this.total - 1) % 10)) {
                                        // if ( !(( this.total - this.acfundata.length) % 10)) { // 支持批量删除的方法
                                        this.pages.pi -- ;
                                        this.queryGroupEmp();
                                    }
                                    this.queryGroupEmp();
                                });
                    },
                    onCancel: () => {
                        console.log('取消成功');
                    }
                });
            }
        }
    }


    selectedRow(event) { // 选中方法，折叠层按钮显示方法
    }

    // 处理行为代码，跳转、弹出框、其他交互
    isActive(event) {
        console.log(event); // 拿到数据进行判断，是跳转路由还是弹出框弹出

    }


    // 搜索框
    search() {
        // 把搜索值传给后台，后台数据重新传给子组件
    }

    // 弹出框保存组件
    save() {
        this.modalVisible = false;
    }

    // 点击入职的方法
    select(i) {

    }

    // 查看选择内容
    checkSelect(e) {
        if (e === 'orgEmp') { // 查询机构下员工
            this.getData(this.orgGuid);
        } else { // 查询所有员工
            this.getallData(this.orgGuid);
        }
    }

    appClick() {
        const jsonObj = {
            groupCode: this.codeGroup,
            guidEmp: this.selectedOption,
        }
        this.utilityService.postData(appConfig.testUrl + appConfig.API.empGroup, jsonObj)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    this.nznot.create('success', val.msg , val.msg);
                    this.modalVisible = false;
                });

    }


    // 邀请员工, 先放着，还没有通知功能
    invite() {

    }



}
