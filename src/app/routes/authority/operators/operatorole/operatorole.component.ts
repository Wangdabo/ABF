import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilityService} from '../../../../service/utils.service';
import {appConfig} from '../../../../service/common';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {RoleModule} from '../../../../service/role/role.model';




@Component({
  selector: 'app-operatorole',
  templateUrl: './operatorole.component.html',
})
export class OperatoroleComponent implements OnInit {

    constructor(
        private http: _HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute, // 注入路由，接收到参数
        private modal: NzModalService,
        private nznot: NzNotificationService,
        private utilityService: UtilityService,

    ) { }


    role: RoleModule = new RoleModule(); // 绑定数据
    operatorGuid: string; // 操作guid
    loading = false;
    configTitle: string;
    total: number; // 总页数
    type = [
        { text: '正常', value: false, key: 'normal' },
        { text: '挂起', value: false, key: 'hang' },
        { text: '注销', value: false, key: 'logOut' },
        { text: '锁定', value: false, key: 'locking' }
    ];


    affiliation = [
        { text: 'APF应用', value: false, key: 'ABF' },
        { text: '测试应用', value: false,  key: 'TEST' },
    ]

    modalVisible = false;

    data: any[] = []; // 表格数据
    headerData = [  // 配置表头内容
        {value: '角色名称' , key: 'roleName', isclick: false},
        {value: '角色代码', key: 'roleCode',  isclick: false},
        {value: '隶属应用' , key: 'guidApp', isclick: false},
        {value: '角色描述' , key: 'roleDesc', isclick: false},
    ];


    moreData = { morebutton: true,
        buttons: [
            {key: 'Overview' , value: '查看概况'},
            {key: 'Authority' , value: '权限配置'}
        ]
    }

    test: string;


    ngOnInit() {

        this.operatorGuid = this.activatedRoute.snapshot.params.id; // 拿到父组件传过来的操作员的guid来进行操作
        console.log(this.operatorGuid);
        this.configTitle = '删除';
        this.getData(); // 只会触发一次，但是ngchanges并不会触发咋办

        this.getDatas()
    }


    getData() { // 初始化请求后台数据
        this.data = [
            {'id': 1, 'roleName': '汪波', 'roleCode': 'role001',  'guidApp': 'ABF', 'roleDesc': '角色一' },
            {'id': 2, 'roleName': '赵春海', 'roleCode': 'role002', 'guidApp': '柜面系统', 'roleDesc': '角色二' },
            {'id': 3, 'roleName': '王星名', 'roleCode': 'role003',  'guidApp': 'ABF', 'roleDesc': '角色三' },
            {'id': 4, 'roleName': '李毅', 'roleCode': 'role004',  'guidApp': '柜面系统', 'roleDesc': '角色四' },
            {'id': 5, 'roleName': '庄壮成', 'roleCode': 'role005',  'guidApp': 'ABF' , 'roleDesc': '角色五'},
            {'id': 6, 'roleName': '李俊华', 'roleCode': 'role006', 'guidApp': '柜面系统', 'roleDesc': '角色六' },
            {'id': 7, 'roleName': '张三', 'roleCode': 'role007',  'guidApp': 'ABF' , 'roleDesc': '角色七'},
            {'id': 8, 'roleName': '李四', 'roleCode': 'role008', 'guidApp': 'ABF' , 'roleDesc': '角色八'},
            {'id': 9, 'roleName': '王五', 'roleCode': 'role008',  'guidApp': '柜面系统' , 'roleDesc': '角色九'},
        ];
        this.total = 1;
    }

    // 想一下，能否把这三个方法封装到一个ts里面，引入即可，不然每次都写着三个方法不太现实。
    // 列表组件传过来的内容
    addHandler(event) {
        console.log(this.role);

        if (event === '这里是新增的方法') {
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
        } else{ // 代表修改，把修改的内容传递进去，重新渲染
            console.log(event)
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
        }
    }

    // 列表传入的翻页数据
    monitorHandler(event) {
        this.role.pi = event;
        // 当翻页的时候，重新请求后台，然后把数据重新渲染

    }

    // 接受子组件删除的数据 单条还是多条
    deleatData(event) {
        console.log(event)
        this.data = [
            {'id': 1, 'roleName': '汪波', 'roleCode': 'role001',  'guidApp': 'ABF', 'roleDesc': '角色一' },
            {'id': 2, 'roleName': '赵春海', 'roleCode': 'role002', 'guidApp': '柜面系统', 'roleDesc': '角色二' },
            {'id': 3, 'roleName': '王星名', 'roleCode': 'role003',  'guidApp': 'ABF', 'roleDesc': '角色三' },
            {'id': 4, 'roleName': '李毅', 'roleCode': 'role004',  'guidApp': '柜面系统', 'roleDesc': '角色四' }
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
        console.log(event);
    }



    // 处理行为代码，跳转、弹出框、其他交互
    isActive(event) {


        // 路由跳转
        this.router.navigate(['APPlication'],{ queryParams: { name: event } });
    }


    // 搜索框
    search() {
        console.log(this.role)
        // 把搜索值传给后台，后台数据重新传给子组件
        this.data = [
            {'id': 1, 'roleName': '汪波', 'roleCode': 'role001',  'guidApp': 'ABF', 'roleDesc': '角色一' }
        ];
    }



    // 弹出框保存组件
    save() {
        console.log(this.role);
        // 添加了两条数据
        this.data =  [
                {'id': 2, 'roleName': '赵春海', 'roleCode': 'role002', 'guidApp': '柜面系统', 'roleDesc': '角色二' },
                {'id': 3, 'roleName': '王星名', 'roleCode': 'role003',  'guidApp': 'ABF', 'roleDesc': '角色三' },
                {'id': 4, 'roleName': '李毅', 'roleCode': 'role004',  'guidApp': '柜面系统', 'roleDesc': '角色四' },
                {'id': 5, 'roleName': '庄壮成', 'roleCode': 'role005',  'guidApp': 'ABF' , 'roleDesc': '角色五'},
                {'id': 6, 'roleName': '李俊华', 'roleCode': 'role006', 'guidApp': '柜面系统', 'roleDesc': '角色六' },
                {'id': 7, 'roleName': '张三', 'roleCode': 'role007',  'guidApp': 'ABF' , 'roleDesc': '角色七'},
                {'id': 8, 'roleName': '李四', 'roleCode': 'role008', 'guidApp': 'ABF' , 'roleDesc': '角色八'},
                {'id': 9, 'roleName': '王五', 'roleCode': 'role008',  'guidApp': '柜面系统' , 'roleDesc': '角色九'}
            ]
        this.modalVisible = false;
    }


    list: any[] = [];
    getDatas() {
        const ret = [];
        for (let i = 0; i < 20; i++) {
            ret.push({
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                direction: Math.random() * 2 > 1 ? 'right' : ''
            });
        }
        this.list = ret;
    }

    reload(direction: string) {
        this.getData();

    }

    select(ret: any) {
        console.log('nzSelectChange', ret);
    }

    change(ret: any) {
        console.log('nzChange', ret);
    }


}
