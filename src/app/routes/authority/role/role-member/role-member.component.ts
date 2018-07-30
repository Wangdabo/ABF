import { Component, OnInit ,Input} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {OperaRoleModule } from '../../../../service/common.module';
import {UtilityService} from '../../../../service/utils.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-role-member',
  templateUrl: './role-member.component.html',
})
export class RoleMemberComponent implements OnInit {

   
    // @Input() // 输入属性,接受父组件传入的树数据
    // data: any[];

    constructor(
        private http: _HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute, // 注入路由，接收到参数
        private nznot: NzNotificationService,
        private utilityService: UtilityService,
    ) { }

    operators: OperaRoleModule = new OperaRoleModule(); // 绑定数据
    roleGuid: string;
    loading = false;
    showAdd: boolean; // 配置操作按钮
    configTitle: string; // 操作按钮名称
    total: number; // 总页数
    type = [
        { text: '正常', value: false, key: 'normal' },
        { text: '挂起', value: false, key: 'hang' },
        { text: '注销', value: false, key: 'logOut' },
        { text: '锁定', value: false, key: 'locking' }
    ];


    affiliation = [
        { text: '北京分行', value: false, key: 'ABF' },
        { text: '上海分行', value: false,  key: 'TEST' },
    ]

    modalVisible = false;

    data: any[] = []; // 表格数据
    headerData = [  // 配置表头内容
        {value: '操作员名称', key: 'operatorName',  isclick: false},
        {value: '登陆用户名' , key: 'userId', isclick: true},
        {value: '操作员状态' , key: 'operatorStatus', isclick: true},
        {value: '员工代码', key: 'empCode',  isclick:  false},
        {value: '员工状态' , key: 'empStatus', isclick: false},
        {value: '隶属机构' , key: 'guidOrg', isclick: false},

    ];


    moreData = { morebutton: true,
        buttons: [
            {key: 'Overview' , value: '查看概况'},
            {key: 'Authority' , value: '权限配置'}
        ]
    }

    test: string;


memberdata=[]


    ngOnInit() {

        this.showAdd = true;
        this.configTitle = '删除'
        this.roleGuid = this.activatedRoute.snapshot.params.id; // 拿到父组件传过来的组织机构的guid来进行操作
        console.log(this.roleGuid);
        this.getData(); // 只会触发一次，但是ngchanges并不会触发咋办

    }


    getData() { // 初始化请求后台数据
        this.data = [
            {'id': 1, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 2, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 3, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 4, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 5, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 6, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 7, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 8, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 9, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
        ];
        this.total = 2;
    }

    // 想一下，能否把这三个方法封装到一个ts里面，引入即可，不然每次都写着三个方法不太现实。
    // 列表组件传过来的内容
    addHandler(event) {
        console.log(this.operators);

        if (event === '这里是新增的方法') {
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
        } else{ // 代表修改，把修改的内容传递进去，重新渲染
            console.log(event)
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
        }
    }

    // 列表传入的翻页数据
    monitorHandler(event) {
        this.operators.pi = event;
        // 当翻页的时候，重新请求后台，然后把数据重新渲染

    }

    // 接受子组件删除的数据 单条还是多条
    deleatData(event) {
        console.log(event)
        this.data = [
            {'id': 1, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 2, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 3, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' }
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
        console.log(this.operators)
        // 把搜索值传给后台，后台数据重新传给子组件
        this.data = [
            {'id': 1, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 2, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 3, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 4, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 5, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 6, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 7, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 8, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 9, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
        ];
    }



    // 弹出框保存组件
    save() {
        console.log(this.operators);
        // 添加了两条数据
        this.data = [
            {'id': 1, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 2, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 3, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' },
            {'id': 4, 'operatorName': '汪波', 'userId': 'wangbo', 'operatorStatus': '正常', 'empCode': 'emp001', 'empStatus': '入职', 'guidOrg': '北京银行' }
        ];
        this.modalVisible = false;
    }

}
