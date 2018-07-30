import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ActivatedRoute, Router} from '@angular/router';
import { PostModule} from '../../../service/post';
import {appConfig} from '../../../service/common';
import {UtilityService} from '../../../service/utils.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {EmpModule} from '../../../service/emp';
import {PageModule} from '../../../service/common.module';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {

    constructor(
        private http: _HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute, // 注入路由，接收到参数,
        private utilityService: UtilityService,
        private modal: NzModalService,
        private nznot: NzNotificationService,
    ) {}

    post: PostModule = new PostModule();
    postAdd: PostModule = new PostModule();

    ifshow: boolean = true;
    // 性别
    gender: any;
    // 岗位类型
    positionType: any;
    // 状态
    postStatus: any;
    page: any;

    // blDuct 所属职务
    blDuct= [
        {key: 'practice' , value: '行长'},
        {key: 'primary' , value: '业务经理'},
        {key: 'intermediate' , value: '理财经理'},
        {key: 'Senior' , value: '营销经理'},
        {key: 'scientist' , value: '大厅经理'},
        {key: 'management' , value: '会计'},
        {key: 'Director' , value: '总管'},
    ];

    loading = false;
    total: number;
    postGuid: string;
    pages: PageModule = new PageModule(); // 分页内容
    // 岗位员工
    modalVisible = false;
    empdistribution = false;
    modelSelect: boolean; // 弹出框内容选择

    isEdit = false; // 默认是新增 不是修改
    data: any[] = []; // 表格数据
    headerData = [  // 配置表头内容
        {value: '岗位名称' , key: 'positionName', isclick: false},
        {value: '上级岗位' , key: 'parentName', isclick: false},
        {value: '岗位状态' , key: 'positionStatus', isclick: false},
        {value: '在岗员工数' , key: 'employeeCount', isclick: true},
        {value: '岗位有效日期' , key: 'startDate', isclick: false},
        {value: '岗位失效日期' , key: 'endDate', isclick: false},
    ];


    moreData = {
        morebutton: true,
        buttons: [
            {key: 'Overview' , value: '查看概况'},
        ]
    };

    copy: any;

    orgGuid: string;
    Parentsguid: any;
    configTitle: string;
    ngOnInit() {
        this.orgGuid = this.activatedRoute.snapshot.params.id; // 拿到父组件传过来的组织机构的guid来进行操作
        // 枚举值转换
        this.postStatus = appConfig.Enumeration.postStatus;
        this.positionType = appConfig.Enumeration.postType;
        this.getData(); // 只会触发一次，但是ngchanges并不会触发咋办
        this.configTitle = '修改'
    }

    getData() { // 初始化请求后台数据
        this.page = {
            page: {
                current: this.post.pi,
                size: this.post.size,
            }
        };
        // 查询机构下所有岗位，先用list接口
        this.utilityService.getData(appConfig.testUrl + appConfig.API.postorgEmp + '/' + this.orgGuid)
            .subscribe(
                (val) => {
                    this.Parentsguid = val.result;
                    console.log(this.Parentsguid)
                    sessionStorage.setItem('post', JSON.stringify(val.result));
                });

        // 查询组织机构下所有岗位
        this.utilityService.postData(appConfig.testUrl + appConfig.API.posttreeList + '/' + this.orgGuid ,  this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    console.log(val)
                    // 没有在岗员工，模拟一下
                    for ( let i = 0; i < val.result.records.length; i++) {
                        if ( val.result.records[i].positionStatus === '正常') {
                            val.result.records[i].buttonData = ['注销', ' ', ' ', '应用权限'];
                        } else {
                            val.result.records[i].buttonData = ['启用'];
                        }
                    }
                    this.data = val.result.records;
                    this.total = val.result.total;
                });

    }


    // 枚举值转换
    // 岗位类型转换
    postType(event) {
        if (event.positionType === '机构岗位') {
            event.positionType = '01';
        } else if (event.positionType === '工作组岗位') {
            event.positionType = '02';
        }
    }
    // 岗位状态转换
    Statuspost(event) {
        if (event.positionStatus === '正常') {
            event.positionStatus = 'running';
        } else if (event.positionStatus === '注销') {
            event.positionStatus = 'cancel';
        }
    }



    // 想一下，能否把这三个方法封装到一个ts里面，引入即可，不然每次都写着三个方法不太现实。
    // 列表组件传过来的内容
    addHandler(event) {
        this.ifshow = false; // 默认是基础信息
        this.postAdd = new PostModule(); // 重新清空赋值
        if (event === '这里是新增的方法') {
            this.postAdd.positionType = '01';
            this.postAdd.positionStatus = 'running';
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
            this.isEdit = false;
        } else { // 代表修改，把修改的内容传递进去，重新渲染
            this.Parentsguid = [];
            // 前端移除当前岗位，获取当前岗位之外的所有岗位
            let copys = JSON.parse(sessionStorage.getItem('post'));
            this.Parentsguid = copys;
            // 枚举值改变
            let indexs = this.Parentsguid.findIndex(item => item.guid === event.guid ); // 根据条件删除数组中的指定对象,这个根据删除的id 来删除select数组对应的对象
            this.Parentsguid.splice(indexs, 1);

            this.Statuspost(event)
            this.postType(event)
            this.postAdd = event;
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
            this.isEdit = true;
        }
    }

    buttonEvent(event) {
        console.log(event)
        if (event.names) {
            if (event.names === '注销') {
                this.utilityService.putData(appConfig.testUrl  + appConfig.API.cancel + '/' + event.guid )
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            console.log(val)
                            this.nznot.create('success', val.msg , val.msg);
                            this.getData();
                        },
                    );
            }

            if (event.names === '应用权限') {
                this.showAdd = true; // 没有新增
                this.postName = event.postName;
                this.postGuid = event.guid;
                this.modelSelect = false; // 打开弹出框
                this.empdistribution = true; // 弹出在岗员工数代码
                this.getPostApp(); // 查询不在岗位下的应用
                this.getPostApplist(); // 查询岗位下应用
            }

            if (event.names === '启用') {
                this.utilityService.putData(appConfig.testUrl  + appConfig.API.running + '/' + event.guid )
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            console.log(val)
                            this.nznot.create('success', val.msg , val.msg);
                            this.getData();
                        },
                    );
            }
        } else {

        }
    }


    // 列表传入的翻页数据
    monitorHandler(event) {
        this.postAdd.pi = event;
        // 当翻页的时候，重新请求后台，然后把数据重新渲染

    }

    // 接受子组件删除的数据 单条还是多条
    deleatData(event) {
        this.modal.open({
            title: '是否删除',
            content: '您是否确认删除所选岗位?',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                this.utilityService.deleatData(appConfig.testUrl + appConfig.API.postDel + '/' + event[0].guid)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            this.nznot.create('success', val.msg , val.msg);
                            if ( !(( this.total - 1) % 10)) {
                                // if ( !(( this.total - this.acfundata.length) % 10)) { // 支持批量删除的方法
                                this.post.pi -- ;
                                this.getData();
                            }
                            this.getData();
                        });
            },
            onCancel: () => {
                console.log('取消成功');
            }
        });
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


    selectedRow(event) { // 选中方法，折叠层按钮显示方法

    }

    // 处理行为代码，跳转、弹出框、其他交互
    isActive(event) {
        this.empdistribution = true; // 弹出在岗员工数代码
        this.modelSelect = true;

        this.postGuid = event.guid;
        this.getEmpData(event.guid);
        this.getEmpList(event.guid);
    }


    // 搜索框
    search() {
        console.log(this.postAdd)
        // 把搜索值传给后台，后台数据重新传给子组件
        this.data = [
            { 'positonName': '高柜综合柜员', 'guidParents': '柜面主管',  'positionStatus': '正常', 'onlineEmp': '0人' , 'startDate': '2018-05-20',  'endDate': '2018-06-21'}
        ];
    }

    // 弹出框保存组件
    save() {
        const jsonOption = this.postAdd;
        jsonOption.guidOrg = this.orgGuid;
        jsonOption.isLeaf = 'Y' ;
        jsonOption.subCount = 0 ;
        if (!this.isEdit) { // 新增数据
            if (jsonOption.guidParents) { // 如果存在调用子岗位接口
                this.utilityService.postData(appConfig.testUrl  + appConfig.API.postChild, jsonOption)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            console.log(val)
                            this.nznot.create('success', val.msg , val.msg);
                            this.getData();
                        },
                    );
            } else { // 调用父岗位接口
                this.utilityService.postData(appConfig.testUrl  + appConfig.API.postRoot, jsonOption)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            this.nznot.create('success', val.msg , val.msg);
                            this.getData();
                        },
                    );
            }


        } else {
            this.utilityService.putData(appConfig.testUrl  + appConfig.API.postDel, jsonOption)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        this.getData();
                        this.nznot.create('success', val.msg , val.msg);
                    },
                );
        }
        this.modalVisible = false;
    }


    // 在岗员工数代码部分
    empDataheader = [  // 配置表头内容
        {value: '员工姓名' , key: 'empName', isclick: false},
        {value: '操作员', key: 'guidOperator',  isclick:  false},
        {value: '员工状态' , key: 'empstatus', isclick: false},
        {value: '电话号码' , key: 'mobileno', isclick: false},
        {value: '入职日期' , key: 'inDate', isclick: false},
    ];


    EmpData = {
        morebutton: true,
        buttons: [
            {key: 'Onboarding' , value: '入职'},
            {key: 'Departure' , value: '离职'},
            {key: 'Overview' , value: '查看概况'},
            {key: 'operator' , value: '操作员修改'},
        ]
    };

    empTotal: number; // 总页数
    empData: any; // 总数据
    emp: EmpModule = new EmpModule();
    showAdd: boolean; // 是否显示新增按钮
    searchOptions: any;
    selectedOption: any;

    // 初始化信息
    getEmpData(guid) {
        this.showAdd = true; // 没有新增
        this.utilityService.getData(appConfig.testUrl + appConfig.API.listsByOrg + '/' +  this.orgGuid)
            .subscribe(
                (val) => {
                    console.log(val)
                    this.searchOptions = val.result; // 查询所有的员工，后期更改，应该查询不在岗位内的员工，接口没有好
                    // 没有在岗员工，模拟一下
                });
    }

    getEmpList(guid) {
        this.page = {
            condition: {
                guidOrg: this.orgGuid,
                guidPosition: guid,
            },
            page: {
                current: this.emp.pi,
                size: this.emp.size,
            }
        };
        this.utilityService.postData(appConfig.testUrl + appConfig.API.queryByOrgPosition,  this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    console.log(val.result.records)
                    // 没有在岗员工，模拟一下
                    for ( let i = 0; i < val.result.records.length; i++) {
                        val.result.records[i].buttonData = ['删除'];
                    }
                    this.empData = val.result.records;
                    this.empTotal = val.result.total;
                });
    }
    // 新增方法
    addEmp(e) {
        console.log(e);
    }
    // 顶部按钮事件
    buttonEmp(e) {
        console.log(e);
    }

    empsave(e) {
        this.empdistribution = false; // 弹出在岗员工数代码
    }

    empEvent(e) {
        console.log(e)
        if (e.names) {
            if (e.names === '删除') {
                this.utilityService.deleatData(appConfig.testUrl + appConfig.API.postDelemp + '/' + e.guid + '/' + this.postGuid)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            this.nznot.create('success', val.msg , val.msg);
                            this.getEmpList(this.postGuid); // 重新查询列表内容
                        });
            }
        }
    }

    // 翻页事件
    empHandler(e) {

    }
    // 删除事件
    deleatEmp(e) {

    }

    // 选中事件
    selectedemp() {

    }



    // 给岗位添加员工
    addEmpClick() {
        console.log(this.selectedOption)
        console.log(this.selectedOption.length)
        if (this.selectedOption) {
            const josnObj = {
                guidEmp: this.selectedOption,
                guidPosition: this.postGuid,
                ismain: 'N'
            }
            this.utilityService.postData(appConfig.testUrl + appConfig.API.empAdd,  josnObj)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        this.nznot.create('success', val.msg , val.msg);

                        this.getEmpList(this.postGuid); // 重新查询列表内容
                    });
        } else {
            this.nznot.create('error', '请最起码选择一个员工进行添加' , '请最起码选择一个员工进行添加');
        }


    }

    // 岗位应用权限内容
    searchOptionse; // 选择显示的内容
    selectedMultipleOption; // 多选的内容


    array = []; // 定义数组 用来清空
    Apptotal: number; // 应用翻页
    postName: string; // 岗位名称
    appData: any[] = []; // 表格数据
    AppheaderData = [  // 配置表头内容
        { value: '应用名称', key: 'appName', isclick: false },
        { value: '应用类型', key: 'appType', isclick: false },
        { value: '应用开通时间', key: 'openDate', isclick: false },

    ];


    // 查询所有应用（已经分配之外的除外）
    getPostApp() {
        this.utilityService.getData(appConfig.testUrl + appConfig.API.appNoth + '/' + this.postGuid)
            .subscribe(
                (val) => {
                    console.log(val);
                    this.searchOptions = val.result;
                    console.log(this.searchOptions);
                }
            );
    }

    // 查询岗位下已经有的应用列表
    getPostApplist() {
        this.page = {
            page: {
                current: this.pages.pi,
                size: this.pages.size,
            }
        };
        // 模拟一下
        this.utilityService.postData(appConfig.testUrl + appConfig.API.listByPosition + '/' + this.postGuid,  this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    console.log(val)
                    for (let i = 0; i < val.result.records.length; i++ ) {
                        val.result.records[i].buttonData = ['删除'];
                    }
                    this.appData = val.result.records;
                    this.Apptotal = val.result.total;
                }
            );
    }


    // 给岗位新增员工
    postappAdd(event) {
        console.log(event)
        this.utilityService.postData(appConfig.testUrl + appConfig.API.addByList,  event)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    this.nznot.create('success', val.msg , val.msg);
                    this.selectedMultipleOption = [];
                    // 重新查询岗位信息
                    this.getPostApp(); // 重新查询
                    this.getPostApplist();
                });
    }


    appClick() {
        console.log(this.selectedMultipleOption); // 传入后台，渲染
        const jsonObj = {
            guidList : this.selectedMultipleOption,
        };
        const addApp = {
            guidPosition: this.postGuid,
            appList  : this.selectedMultipleOption,
        }
        // 调用新增接口方法
        this.postappAdd(addApp);

    }


    // 应用列表方法
    // 列表组件传过来的内容
    addappHandler(event) {
        console.log(event);
    }


    // 列表传入的翻页数据
    monitorappHandler(event) {
        console.log(event)
        this.pages.pi = event;
        this.page = {
            page: {
                current: event, // 页码
                size: this.pages.size, //  每页个数
            }
        };
        this.getPostApplist();
    }


    // 列表按钮方法
    buttonappDataHandler(event) {
        console.log(event); // 根据event.value来判断不同的请求，来获取结果和方法或者进行路由的跳转
    }

    selectedappRow(event) { // 选中方法，折叠层按钮显示方法
    }


    // 删除按钮
    appDel(event) {
        const jsonObj = {
            guidApp: event.guid,
            guidPosition: this.postGuid,
        }
        console.log(jsonObj)
        // 传第三表的id  event.id 即可
        this.utilityService.deleatData(appConfig.testUrl + appConfig.API.appDelpost + '/' + event.guid + '/' + this.postGuid )
            .map(res => res.json())
            .subscribe(
                (val) => {
                    this.nznot.create('success', val.msg , val.msg);
                   this.getPostApp()
                    this.getPostApplist();
                });

    }

    appsave() {
        this.empdistribution = false;
    }


}
