import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {UtilityService} from '../../../service/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import { PostModule} from '../../../service/post';
import {PickListModule} from 'primeng/picklist';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {

    constructor(
        private http: _HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute, // 注入路由，接收到参数,
        private service: UtilityService
    ) {
        service.getBillTypes();
    }

    post: PostModule = new PostModule();
    postAdd: PostModule = new PostModule();


    ifshow: boolean = true;

    gender = [ // 性别
        {key: 'male' , value: '男'},
        {key: 'Female' , value: '女'},
    ];


    // 岗位类型
    positionType = [
        {key: 'orgPost' , value: '机构岗位'},
        {key: 'workPost' , value: '工作组岗位'},
    ]


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

    type = [
        { text: '正常', value: false, key: 'normal' },
        { text: '挂起', value: false, key: 'hang' },
        { text: '注销', value: false, key: 'logOut' },
        { text: '锁定', value: false, key: 'locking' }
    ];


    // 岗位员工
    modalVisible = false;
    empdistribution = false;

    data: any[] = []; // 表格数据
    headerData = [  // 配置表头内容
        {value: '岗位名称' , key: 'positonName', isclick: false},
        {value: '上级岗位' , key: 'guidParents', isclick: false},
        {value: '岗位状态' , key: 'positionStatus', isclick: false},
        {value: '在线员工数' , key: 'onlineEmp', isclick: true},
        {value: '岗位有效日期' , key: 'startDate', isclick: false},
        {value: '岗位失效日期' , key: 'endDate', isclick: false},
    ];


    moreData = {
        morebutton: true,
        buttons: [
            {key: 'Overview' , value: '查看概况'},
            {key: 'appAuthority' , value: '应用权限'},
        ]
    };

    orgGuid: string;

    ngOnInit() {
        this.getData(); // 只会触发一次，但是ngchanges并不会触发咋办
        this.orgGuid = this.activatedRoute.snapshot.params.id; // 拿到父组件传过来的组织机构的guid来进行操作
        console.log(this.orgGuid);
    }

    getData() { // 初始化请求后台数据
        this.data = [
            { 'positonName': '支行行长', 'guidParents': '总行行长',  'positionStatus': '正常', 'onlineEmp': '3人', 'startDate': '2018-05-14',  'endDate': '2018-06-15'},
            { 'positonName': '支行副行长', 'guidParents': '支行行长', 'positionStatus': '注销', 'onlineEmp': '5人', 'startDate': '2018-05-15',  'endDate': '2018-06-16'},
            { 'positonName': '高柜综合柜员', 'guidParents': '柜面主管',  'positionStatus': '正常', 'onlineEmp': '0人', 'startDate': '2018-05-16',  'endDate': '2018-06-17'},
            {'positonName': '理财柜员', 'guidParents': '理财主管',   'positionStatus': '注销', 'onlineEmp': '10人', 'startDate': '2018-05-17',  'endDate': '2018-06-18'},
            {'positonName': '普通柜员', 'guidParents': '柜面主管',  'positionStatus': '正常', 'onlineEmp': '5人', 'startDate': '2018-05-18',  'endDate': '2018-06-19'},
            {'positonName': '存款业务经理',  'guidParents': '存款业务主管', 'positionStatus': '注销', 'onlineEmp': '9人', 'startDate': '2018-05-19',  'endDate': '2018-06-20'},
            {'positonName': '贷款业务经理',  'guidParents': '贷款业务主管', 'positionStatus': '正常', 'onlineEmp': '4人', 'startDate': '2018-05-20',  'endDate': '2018-06-21'},
            {'positonName': '现金柜员',  'guidParents': '现金主管', 'positionStatus': '正常', 'onlineEmp': '8人', 'startDate': '2018-05-21',  'endDate': '2018-06-22'}
        ];
    }




    // 想一下，能否把这三个方法封装到一个ts里面，引入即可，不然每次都写着三个方法不太现实。
    // 列表组件传过来的内容
    addHandler(event) {
        console.log(this.postAdd);

        this.ifshow = false; // 默认是基础信息
        if (event === '这里是新增的方法') {
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
        } else{ // 代表修改，把修改的内容传递进去，重新渲染
            console.log(event)
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
        }
    }

    // 列表传入的翻页数据
    monitorHandler(event) {
        this.postAdd.pi = event;
        // 当翻页的时候，重新请求后台，然后把数据重新渲染

    }

    // 接受子组件删除的数据 单条还是多条
    deleatData(event) {
        console.log(event)
        this.data = [
            { 'positonName': '支行行长', 'guidParents': '总行行长',  'positionStatus': '正常', 'onlineEmp': '3人' , 'startDate': '2018-05-20',  'endDate': '2018-06-21'},
            { 'positonName': '支行副行长', 'guidParents': '支行行长', 'positionStatus': '注销', 'onlineEmp': '5人' ,'startDate': '2018-05-20',  'endDate': '2018-06-21'},

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



    selectedRow(event) { // 选中方法，折叠层按钮显示方法
        if (event.indeterminate) {
            if (event.selectedRows[0].positionStatus === '正常') {
                this.moreData.buttons = [
                    {key: 'logOutPost' , value: '注销岗位'},
                    {key: 'Overview' , value: '查看概况'},
                ];
            }
            if (event.selectedRows[0].positionStatus === '注销') {
                this.moreData.buttons = [
                    {key: 'logOutPost' , value: '启用岗位'},
                    {key: 'Overview' , value: '查看概况'},
                ];
            }
        }

    }

    // 处理行为代码，跳转、弹出框、其他交互
    isActive(event) {
        console.log(event); // 拿到数据进行判断，是跳转路由还是弹出框弹出
        this.empdistribution = true;
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
        console.log(this.postAdd);
        // 添加了两条数据
        this.data = [
            {'positonName': '理财柜员', 'guidParents': '理财主管',   'positionStatus': '注销', 'onlineEmp': '10人', 'startDate': '2018-05-20',  'endDate': '2018-06-21'},
            {'positonName': '普通柜员', 'guidParents': '柜面主管',  'positionStatus': '正常', 'onlineEmp': '5人', 'startDate': '2018-05-20',  'endDate': '2018-06-21'},
            {'positonName': '存款业务经理',  'guidParents': '存款业务主管', 'positionStatus': '注销', 'onlineEmp': '9人', 'startDate': '2018-05-20',  'endDate': '2018-06-21'},
            {'positonName': '贷款业务经理',  'guidParents': '贷款业务主管', 'positionStatus': '正常', 'onlineEmp': '4人', 'startDate': '2018-05-20',  'endDate': '2018-06-21'},
            {'positonName': '现金柜员',  'guidParents': '现金主管', 'positionStatus': '正常', 'onlineEmp': '8人', 'startDate': '2018-05-20',  'endDate': '2018-06-21'},
           ]
        this.modalVisible = false;
    };



}
