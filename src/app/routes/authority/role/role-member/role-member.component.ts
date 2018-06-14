import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {RoleModule} from '../../../../service/role/role.model';
import {UtilityService} from '../../../../service/utils.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-role-member',
  templateUrl: './role-member.component.html',
})
export class RoleMemberComponent implements OnInit {

    constructor(
        private http: _HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute, // 注入路由，接收到参数
        private nznot: NzNotificationService,
        private utilityService: UtilityService,
    ) { }

    role: RoleModule = new RoleModule(); // 绑定数据
    roleGuid: string;
    loading = false;

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
        {value: '角色代码', key: 'roleCode',  isclick: false},
        {value: '角色名称' , key: 'roleName', isclick: true},
        {value: '角色类别', key: 'roleType',  isclick:  false},
        {value: '隶属应用' , key: 'application', isclick: false}
    ];


    moreData = { morebutton: true,
        buttons: [
            {key: 'Overview' , value: '查看概况'},
            {key: 'Authority' , value: '权限配置'}
        ]
    }

    test: string;





    ngOnInit() {
        this.getData(); // 只会触发一次，但是ngchanges并不会触发咋办

        this.roleGuid = this.activatedRoute.snapshot.params.id; // 拿到父组件传过来的组织机构的guid来进行操作
        console.log(this.roleGuid);

    }


    getData() { // 初始化请求后台数据
        this.data = [
            {'id': 1, 'roleName': '汪波', 'roleCode': 'role001', 'roleType': '系统级', 'application': 'ABF' },
            {'id': 2, 'roleName': '赵春海', 'roleCode': 'role002', 'roleType': '应用级', 'application': '柜面系统' },
            {'id': 3, 'roleName': '王星名', 'roleCode': 'role003', 'roleType': '系统级', 'application': 'ABF' },
            {'id': 4, 'roleName': '李毅', 'roleCode': 'role004', 'roleType': '应用级', 'application': '柜面系统' },
            {'id': 5, 'roleName': '庄壮成', 'roleCode': 'role005', 'roleType': '系统级', 'application': 'ABF' },
            {'id': 6, 'roleName': '李俊华', 'roleCode': 'role006', 'roleType': '应用级', 'application': '柜面系统' },
            {'id': 7, 'roleName': '张三', 'roleCode': 'role007', 'roleType': '应用级', 'application': 'ABF' },
            {'id': 8, 'roleName': '李四', 'roleCode': 'role008', 'roleType': '应用级', 'application': 'ABF' },
            {'id': 9, 'roleName': '王五', 'roleCode': 'role008', 'roleType': '系统级', 'application': '柜面系统' },
        ];
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
        this.data =  [
            {'id': 1, 'roleName': '汪波', 'roleCode': 'role001', 'roleType': '系统级', 'application': 'ABF' },
            {'id': 2, 'roleName': '赵春海', 'roleCode': 'role002', 'roleType': '应用级', 'application': '柜面系统' }
        ]; // 有效
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
        this.data =  [
            {'id': 1, 'roleName': '汪波', 'roleCode': 'role001', 'roleType': '系统级', 'application': 'ABF' },
            {'id': 2, 'roleName': '赵春海', 'roleCode': 'role002', 'roleType': '应用级', 'application': '柜面系统' },
            {'id': 3, 'roleName': '王星名', 'roleCode': 'role003', 'roleType': '系统级', 'application': 'ABF' },
            {'id': 4, 'roleName': '李毅', 'roleCode': 'role004', 'roleType': '应用级', 'application': '柜面系统' },
            {'id': 5, 'roleName': '庄壮成', 'roleCode': 'role005', 'roleType': '系统级', 'application': 'ABF' }
        ]; // 有效
    }



    // 弹出框保存组件
    save() {
        console.log(this.role);
        // 添加了两条数据
        this.data =  [
            {'id': 1, 'roleName': '汪波', 'roleCode': 'role001', 'roleType': '系统级', 'application': 'ABF' },
            {'id': 2, 'roleName': '赵春海', 'roleCode': 'role002', 'roleType': '应用级', 'application': '柜面系统' },
            {'id': 3, 'roleName': '王星名', 'roleCode': 'role003', 'roleType': '系统级', 'application': 'ABF' },
            {'id': 4, 'roleName': '李毅', 'roleCode': 'role004', 'roleType': '应用级', 'application': '柜面系统' },
            {'id': 5, 'roleName': '庄壮成', 'roleCode': 'role005', 'roleType': '系统级', 'application': 'ABF' },
            {'id': 6, 'roleName': '李俊华', 'roleCode': 'role006', 'roleType': '应用级', 'application': '柜面系统' },
            {'id': 7, 'roleName': '张三', 'roleCode': 'role007', 'roleType': '应用级', 'application': 'ABF' },
            {'id': 8, 'roleName': '李四', 'roleCode': 'role008', 'roleType': '应用级', 'application': 'ABF' },
            {'id': 9, 'roleName': '王五', 'roleCode': 'role009', 'roleType': '系统级', 'application': '柜面系统' },
            {'id': 10, 'roleName': '李二', 'roleCode': 'role010', 'roleType': '系统级', 'application': '柜面系统' },
            {'id': 11, 'roleName': '网易', 'roleCode': 'role011', 'roleType': '应用级', 'application': 'ABF' },
            {'id': 12, 'roleName': '腾讯', 'roleCode': 'role012', 'roleType': '系统级', 'application': 'ABF' },
            {'id': 13, 'roleName': '勾三', 'roleCode': 'role013', 'roleType': '应用级', 'application': 'ABF' },
        ]; // 有效
        this.modalVisible = false;
    }

}