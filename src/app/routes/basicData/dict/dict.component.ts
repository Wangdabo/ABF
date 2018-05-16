import {Component, Inject, Injectable, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { DictModule } from '../../../service/dict';
import { DictItemModule } from '../../../service/dict';
import {Router} from '@angular/router';
import {UtilityService} from '../../../service/utils.service';
import {MenuItem} from 'primeng/api';
import {NzModalService} from 'ng-zorro-antd';
import {appConfig} from '../../../service/common';

@Component({
  selector: 'app-dict',
  templateUrl: './dict.component.html',
    styleUrls: ['./dict.component.less']
})

// 依赖注入，把url链接注入进来即可
@Injectable()

export class DictComponent implements OnInit {
    private msg: any;
    constructor(
        private http: _HttpClient,
        private router: Router,
        private utilityService: UtilityService,
        private modal: NzModalService,
    ) {

    }


    dict: DictModule = new DictModule(); // 绑定数据

    dictAdd: DictModule = new DictModule(); // 绑定新增数据

    dictItemAdd: DictItemModule = new DictItemModule(); // 绑定业务字典项数据

    loading = false;
    urlconfig: string = 'http://localhost:3000';
    treeshow = false; // 是否显示树结构

    // fromType 字典项来源类型
    fromType = [
        { text: '字典项', value: false, key: 'normal' },
        { text: '来自单表', value: false, key: 'hang' },
        { text: '多表或视图', value: false, key: 'logOut' }
    ];

    // itemType  字典项类型
    itemType = [
        { text: '子字典', value: false, key: 'dict' },
        { text: '字典值', value: false, key: 'value' }
    ]


    // dictType 业务字典类型
    dictType = [
        { text: '应用级', value: false, key: 'APP' },
        { text: '系统级', value: false,  key: 'SYS' },
    ];

    // guidParents 父字典
    guidParents = [
        { text: '字段类型', value: false, key: 'A' },
        { text: '配置风格', value: false,  key: 'S' },
        { text: '认证模式', value: false,  key: 'P' },
        { text: '岗位状态', value: false,  key: 'O' },
        { text: '岗位类别', value: false,  key: 'E' },
        { text: '是与否', value: false,  key: 'Y' },
        { text: '交易状态', value: false,  key: 'F' },
    ];

    // 字典项
    itemValue = [
        { text: '字段类型', value: false, key: 'A' },
        { text: '配置风格', value: false,  key: 'S' },
        { text: '认证模式', value: false,  key: 'P' },
        { text: '岗位状态', value: false,  key: 'O' },
        { text: '岗位类别', value: false,  key: 'E' },
        { text: '是与否', value: false,  key: 'Y' },
        { text: '交易状态', value: false,  key: 'F' },
    ]


    // 筛选条件
    conditions = [
        { text: '所有业务字典', value: false, key: 'all' },
        { text: '跟字典', value: false,  key: 'root' },
    ]


    modalVisible = false; // 弹出框是否打开
    dictionaryItems = false; // 新增字典项是否打开
    creatExit = false; // 默认是新增
    eventData: any;

    data: any[] = []; // 表格数据
    headerData = [  // 配置表头内容
        {value: '业务字典', key: 'dictKey',  isclick: false},
        {value: '字典名称' , key: 'dictName', isclick: false},
        {value: '字典类型', key: 'dictType',  isclick:  false},
        {value: '字典项来源' , key: 'fromType', isclick: false}
    ];


    moreData = { morebutton: true,
        buttons: [
            {key: 'Overview' , value: '查看概况'},
            {key: 'Authority' , value: '权限配置'}
        ]
    }


    treedata: any[]; // tree组件数据

    treemenus: MenuItem[];

    searchTitle: string;

    // 右击菜单数据



    ngOnInit() {
        this.getData(); // 只会触发一次，但是ngchanges并不会触发咋办
        this.dictAdd.fromType = 'normal'; // 弹出框默认选中
    }

    getData() { // 初始化请求后台数据

        console.log(appConfig);
        this.searchTitle = '请输入业务字典名称';

        // 传入右击菜单数组,根据需求定
        this.treemenus = [
            {label: '删除业务字典', icon: 'fa-search', command: (event) => this.delectDict()},
            {label: '新增字典项', icon: 'fa-close' , command: (event) => this.addDictItem()},
            {label: '删除字典项', icon: 'fa fa-circle-o-notch' , command: (event) => this.delectdictItem()},
            {label: '修改业务字典', icon: 'fa fa-circle-o-notch' , command: (event) => this.exitdictItem()},
        ];

        // 调用服务获取树节点操作
        this.utilityService.getData(appConfig.ABFUrl + '/' + appConfig.API.treeData)
            .subscribe(
                (val) => {
                    this.treedata = val; // 绑定树节点
                },
                response => {
                    // 如果数据不正确，则在这里给初始数据
                    this.treedata = [
                        {
                            'label': '测试数据',
                            'data': 'Documents Folder',
                            'expandedIcon': 'fa-folder-open',
                            'collapsedIcon': 'fa-folder',
                            'children': [{
                                'label': '工作',
                                'data': 'Work Folder',
                                'expandedIcon': 'fa-folder-open',
                                'collapsedIcon': 'fa-folder',
                                'children': [{'label': '睡觉', 'icon': 'fa-file-word-o', 'data': 'Expenses Document'}, {'label': '唱歌', 'icon': 'fa-file-word-o', 'data': 'Resume Document'}]
                            },
                                {
                                    'label': '下班',
                                    'data': 'Home Folder',
                                    'expandedIcon': 'fa-folder-open',
                                    'collapsedIcon': 'fa-folder',
                                    'children': [{'label': '回家', 'icon': 'fa-file-word-o', 'data': 'Invoices for this month'}]
                                }]
                        },
                        {
                            'label': '你瞅啥',
                            'data': 'Pictures Folder',
                            'expandedIcon': 'fa-folder-open',
                            'collapsedIcon': 'fa-folder',
                            'children': [
                                {'label': '瞅你咋地', 'icon': 'fa-file-image-o', 'data': 'Barcelona Photo'},
                                {'label': '不服干我', 'icon': 'fa-file-image-o', 'data': 'PrimeFaces Logo'},
                                {'label': '你丫等着', 'icon': 'fa-file-image-o', 'data': 'PrimeUI Logo'}]
                        },
                    ]; // 传入树节点数据
                });


        // 调用服务来获取列表节点操作
        this.utilityService.getData(appConfig.ABFUrl + '/' + appConfig.API.listData)
            .subscribe(
                (val) => {
                    console.log(val); // 后台传给我的数组
                    this.data = val; // 绑定列表数据
                },
                response => {
                    // 如果数据不正确，则在这里给初始数据
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
                    ]; // 传入树节点数据
                });
    }


    // 列表组件传过来的内容
    addHandler(event) {
        if (event === '这里是新增的方法') {
            for (const key in this.dictAdd){
                delete this.dictAdd[key];
            }

            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
            this.creatExit = true;

        } else { // 代表修改，把修改的内容传递进去，重新渲染
            console.log(event);
            this.dictAdd =  event;
            this.eventData = event;
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
        }
    }

    // 列表传入的翻页数据
   monitorHandler(event) {
        this.dict.pi = event;
    }


    // 接受子组件删除的数据 单条还是多条
    deleatData(event) {
        console.log(event); // 原本的数据值
        // 删除各节点内容
        this.utilityService.deleatData(appConfig.ABFUrl + '/' + appConfig.API.listData + event[0].id)
            .subscribe(
                (val) => {
                    console.log(val);
                    if (val.status === 200) {
                        // 修改成功只和的处理逻辑
                    }
                },
                response => {
                },
                () => {
                    // 新增接口之后，在调用查询接口，查询最新的数据
                    this.utilityService.getData(appConfig.ABFUrl + '/' + appConfig.API.listData)
                        .subscribe(
                            (val) => {
                                console.log(val)
                                this.data = val; // 绑定列表数据
                            });
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



    // 处理行为代码，跳转、弹出框、其他交互
    isActive(event) {
        console.log(event); // 拿到数据进行判断，是跳转路由还是弹出框弹出
        // 路由跳转
        this.router.navigate(['APPlication'],{ queryParams: { name: event } });
    }



    selectedRow(event) { // 选中方法，折叠层按钮显示方法
        if (event.indeterminate) {
            this.treeshow = true;
        } else {
            this.treeshow = false;
        }
    }


    // 搜索框
    search() {
        console.log(this.dict)
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
        if (this.creatExit) { // 调用新增的逻辑
            console.log(this.dictAdd);
            // 调用服务来获取列表节点操作
            const jsonOption = this.dictAdd;
            console.log(jsonOption);
            if (jsonOption.dictName !== undefined) {
                this.utilityService.postData(appConfig.ABFUrl + '/' + appConfig.API.listData, jsonOption)
                    .subscribe(
                        (val) => {

                            console.log(val);
                        },
                        response => {
                        },
                        () => {
                            // 新增接口之后，在调用查询接口，查询最新的数据
                            this.utilityService.getData(appConfig.ABFUrl + '/' + appConfig.API.listData)
                                .subscribe(
                                    (val) => {
                                        this.treeshow = false;
                                        this.data = val; // 绑定列表数据
                                    });
                        });

            }else {
                alert('请填写完成信息之后在进行提交');
            }


        } else { // 调用修改的逻辑
              console.log(this.eventData.id)
              const id  = this.eventData.id;
              const jsonOption = this.dictAdd;
            this.utilityService.putData(appConfig.ABFUrl + '/' + appConfig.API.listData + id, jsonOption)
                .subscribe(
                    (val) => {
                        console.log(val);
                        if (val.status === 200) {
                            // 修改成功只和的处理逻辑
                        }
                    },
                    response => {
                    },
                    () => {
                        // 流结束之后再去做查询验证
                        // 新增接口之后，在调用查询接口，查询最新的数据
                        this.utilityService.getData(appConfig.ABFUrl + '/' + appConfig.API.listData)
                            .subscribe(
                                (val) => {
                                     this.data = val; // 绑定列表数据
                                });
                    });
        }
        this.modalVisible = false;
    }


    // 树的方法

    // 右击菜单传递值
    RightSelect(event) {
        // console.log(event);
        if (event.node.isLeaf) {
            this.treemenus = [
                {label: '删除字典项', icon: 'fa fa-circle-o-notch' , command: (event) => this.delectdictItem()},
                {label: '修改字典项', icon: 'fa fa-circle-o-notch' , command: (event) => this.exitdictItem()},
                {label: '设置默认值', icon: 'fa fa-circle-o-notch' , command: (event) => this.setdefault()},
            ];
        } else {
            this.treemenus = [
                {label: '删除业务字典', icon: 'fa-search', command: (event) => this.delectDict()},
                {label: '新增字典项', icon: 'fa-close' , command: (event) => this.addDictItem()},
                {label: '删除字典项', icon: 'fa fa-circle-o-notch' , command: (event) => this.delectdictItem()},
                {label: '修改业务字典', icon: 'fa fa-circle-o-notch' , command: (event) => this.exitdict()},
            ];
        }

    }

    // 左击树菜单节点信息
    TreeSelect(event) {
        // console.log(event);
    }


    // 删除业务字典
    delectDict() {
        this.modal.open({
            title: '是否删除',
            content: '您确认要删除选中的业务字典吗？删除业务字典对应的字典项也会删除',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
               console.log('好的');
            },
            onCancel: () => {
                console.log('失败');
            }
        });
    }

    // 新增字典项
    addDictItem() {
        this.dictItemAdd.itemType = 'dict'; // 默认子字典
        this.dictionaryItems = true; // 打开弹出框
    }

    // 删除业务字典项目
    delectdictItem() {
        this.modal.open({
            title: '是否删除',
            content: '您确认要删除选中的字典项吗',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                console.log('好的');
            },
            onCancel: () => {
                console.log('失败');
            }
        });
    }



    // 修改业务字典
    exitdict() {
        this.modalVisible = true;
        this.dictAdd.fromType = 'normal'; // 弹出框默认选中
    }

    // 修改字典项
    exitdictItem() {
        this.dictItemAdd.itemType = 'dict'; // 默认子字典
        this.dictionaryItems = true; // 打开弹出框
    }

    // 设置默认值
    setdefault() {
        alert('是否设置此字典项为业务字典默认值?');
    }

    // 字典项保存
    itemSava() {
        console.log(this.dictItemAdd);
        this.dictionaryItems = false; // 关闭弹窗

    }


    dropEvent($event) {
        console.log($event) ; // 拿到tree拖拽来的数据
        this.treedata = [
            {
                'label': '测试数据1111',
                'data': 'Documents Folder',
                'expandedIcon': 'fa-folder-open',
                'collapsedIcon': 'fa-folder',
                'children': [{
                    'label': '工作',
                    'data': 'Work Folder',
                    'expandedIcon': 'fa-folder-open',
                    'collapsedIcon': 'fa-folder',
                    'children': [{'label': '睡觉', 'icon': 'fa-file-word-o', 'data': 'Expenses Document'}, {'label': '唱歌', 'icon': 'fa-file-word-o', 'data': 'Resume Document'}]
                },
                    {
                        'label': '下班',
                        'data': 'Home Folder',
                        'expandedIcon': 'fa-folder-open',
                        'collapsedIcon': 'fa-folder',
                        'children': [{'label': '回家', 'icon': 'fa-file-word-o', 'data': 'Invoices for this month'}]
                    }]
            }
        ];
    }

    // 树节点搜索框的内容
    searchVal($event) {
        console.log($event);
    }

}
