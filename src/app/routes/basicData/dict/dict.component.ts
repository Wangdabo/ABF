import {Component, Inject, Injectable, OnInit, ViewChild} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { DictModule } from '../../../service/dict';
import { DictItemModule } from '../../../service/dict';
import {Router} from '@angular/router';
import {UtilityService} from '../../../service/utils.service';
import {MenuItem} from 'primeng/api';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {appConfig} from '../../../service/common';
import {ListComponent} from '../../../component/list/list.component';

@Component({
    selector: 'app-dict',
    templateUrl: './dict.component.html',
    styleUrls: ['./dict.component.less']
})

// 依赖注入，把url链接注入进来即可
@Injectable()

export class DictComponent implements OnInit {
    private msg: any


    // 拿到table的实例，获取table的方法和属性
    @ViewChild('list')
    listTable: ListComponent;


    constructor(
        private http: _HttpClient,
        private router: Router,
        private utilityService: UtilityService,
        private modal: NzModalService,
        private nznot: NzNotificationService
    ) {

    }
    dict: DictModule = new DictModule(); // 绑定数据

    dictAdd: DictModule = new DictModule(); // 绑定新增数据

    dictItemAdd: DictItemModule = new DictItemModule(); // 绑定业务字典项数据
    loading = false;
    treeshow = false; // 是否显示树结构
    isEdit = false; // 默认是新增
    // guidParents 父字典
    guidParents: any;
    modalVisible = false; // 弹出框是否打开
    dictionaryItems = false; // 新增字典项是否打开
    creatExit = false; // 默认是新增
    eventData: any;
    dictInfo: any; // 业务字典数据信息
    data: any[] = []; // 表格数据
    treedata: any[]; // tree组件数据
    treemenus: MenuItem[];
    searchTitle: string;
    // 翻页和总数数据
    page: any;
    total: number;
    treeSelectData: any; // 树节点选择的数据
    nodrop: boolean; // 是否有拖动的树

    // fromType 字典项来源类型
    fromType: any;

    // itemType  字典项类型
    itemType = [
        { text: '子字典', value: false, key: 'dict' },
        { text: '字典值', value: false, key: 'value' }
    ]

    // dictType 业务字典类型
    dictType: any;

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

    // 右击菜单数据
    configTitle: string;
    ngOnInit() {
        this.fromType = appConfig.Enumeration.fromType;
        this.dictType = appConfig.Enumeration.systemType;
        this.getData(); // 只会触发一次，但是ngchanges并不会触发咋办
        this.nodrop = true;
        this.configTitle = '修改';
    }

    getData() {
        // 初始化请求后台数据
        this.searchTitle = '请输入业务字典名称';
        // 传入右击菜单数组,根据需求定
        this.treemenus = [
            {label: '删除业务字典', icon: 'fa-search', command: (event) => this.delectDict()},
            {label: '新增字典项', icon: 'fa-close' , command: (event) => this.addDictItem()},
            {label: '删除字典项', icon: 'fa fa-circle-o-notch' , command: (event) => this.delectdictItem()},
            {label: '修改业务字典', icon: 'fa fa-circle-o-notch' , command: (event) => this.exitdictItem()},
        ];

        this.page = {
            page: {
                current: this.dict.pi,
                size: this.dict.size,
            }
        };

        // 调用服务来获取列表节点操作
        this.utilityService.postData(appConfig.testUrl + appConfig.API.sysDictList ,  this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    this.data = val.result.records; // 绑定列表数据
                    this.guidParents = val.result.records;
                    this.total = val.result.total;
                });

    }

    // 枚举值转换
    dictTypeMode(event) {
        if (event.dictType === '应用级') {
            event.dictType = 'a';
        } else if (event.dictType === '系统级') {
            event.dictType = 's';
        }
    }

    formTypeMode(event) {
        if (event.fromType === '字典项') {
            event.fromType = '0';
        } else if (event.fromType === '来自单表') {
            event.fromType = '1';
        } else if (event.fromType === '多表或视图') {
            event.fromType = '2';
        }
    }



    // 列表组件传过来的内容
    addHandler(event) {
        if (event === '这里是新增的方法') {
            for (const key in this.dictAdd) {
                delete this.dictAdd[key];
            }
            this.dictAdd.fromType = '0'; // 弹出框默认选中
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
            this.creatExit = true;
        } else { // 代表修改，把修改的内容传递进去，重新渲染
            console.log(event)
            this.dictAdd =  event;
            this.eventData = event;
            this.dictTypeMode(event); // 枚举值转换
            this.formTypeMode(event); // 枚举值转换
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
            this.creatExit = false;
        }
    }

    // 列表传入的翻页数据
    monitorHandler(event) {
        this.dict.pi = event;
        this.page = {
            page: {
                current: event, // 页码
                size: this.dict.size, //  每页个数
            }
        };
        this.getData();
    }


    // 接受子组件删除的数据 单条还是多条
    deleatData(event) {
        console.log(event); // 原本的数据值
        this.modal.open({
            title: '是否删除',
            content: '您是否确认删除所选数据?',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                this.utilityService.deleatData(appConfig.testUrl + appConfig.API.sysDictDel + '/' + event[0].guid)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            this.nznot.create('success', val.msg , val.msg);
                            if ( !(( this.total - 1) % 10)) {
                                // if ( !(( this.total - this.acfundata.length) % 10)) { // 支持批量删除的方法
                                this.dict.pi -- ;
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



    // 处理行为代码，跳转、弹出框、其他交互
    isActive(event) {
        console.log(event); // 拿到数据进行判断，是跳转路由还是弹出框弹出
        // 路由跳转
        this.router.navigate(['APPlication'],  { queryParams: { name: event } });
    }

    // 查询树方法
    getTreeList(event) {
        this.utilityService.postData(appConfig.testUrl  + appConfig.API.sysDictsTree + '/' + event, {})
            .map(res => res.json())
            .subscribe(
                (val) => {
                    if (val.result.dictName) {
                        val.result.label = val.result.dictName;
                        val.result.expandedIcon = 'fa-folder-open';
                        val.result.collapsedIcon = 'fa-folder';
                        val.result.childDict = true; // 是业务字典
                    }
                    if (val.result.children) {
                        for (let i = 0 ; i < val.result.children.length; i++) {
                            if (val.result.children[i].dictName) { // 子业务字典
                                val.result.children[i].label = val.result.children[i].dictName;
                                val.result.children[i].expandedIcon = 'fa-folder-open';
                                val.result.children[i].collapsedIcon = 'fa-folder';
                                val.result.children[i].childDict = true;
                                val.result.children[i].children = [{'label': ''}];
                            }
                            if (val.result.children[i].itemName) { // 字典项
                                val.result.children[i].label = val.result.children[i].itemName;
                                val.result.children[i].icon = 'fa-file-word-o';
                                val.result.children[i].childDict = false;
                            }


                        }
                    }

                    const treeData = [];
                    treeData.push(val.result);
                    this.treedata  = treeData;
                    this.treeshow = true;
                },
            );
    }
    // 查询树节点方法
    getTreeNode(event) {
        this.utilityService.postData(appConfig.testUrl  + appConfig.API.sysDictsTree + '/' + event.node.guid, {})
            .map(res => res.json())
            .subscribe(
                (val) => {
                    this.treeResult = event.node.guid; // 赋值
                    event.node.children = val.result.children;
                    // 组装树
                    if (val.result.dictName) {
                        val.result.label = val.result.dictName;
                        val.result.expandedIcon = 'fa-folder-open';
                        val.result.collapsedIcon = 'fa-folder';
                        val.result.childDict = true; // 是业务字典
                    }
                    if (val.result.children) {
                        for (let i = 0 ; i < val.result.children.length; i++) {
                            if (val.result.children[i].dictName) { // 子业务字典
                                val.result.children[i].label = val.result.children[i].dictName;
                                val.result.children[i].expandedIcon = 'fa-folder-open';
                                val.result.children[i].collapsedIcon = 'fa-folder';
                                val.result.children[i].childDict = true;
                                val.result.children[i].children = [{'label': ''}];
                            }

                            if (val.result.children[i].itemName) { // 字典项
                                val.result.children[i].label = val.result.children[i].itemName;
                                val.result.children[i].icon = 'fa-file-word-o';
                                val.result.children[i].childDict = false;
                            }
                        }
                    }

                },
            );
    }

    selectedRow(event) {
        // 选中方法，折叠层按钮显示方法
        if (event.selectedRows.length === 1) {
            this.dictInfo = event.selectedRows; // 当前选中的业务字典，绑定 全局使用，用来重新查询树
            // 请求树接口
            this.getTreeList(event.selectedRows[0].guid);
        } else {
            this.treeshow = false;
        }
    }

    treeResult: string; // 接收ID值
    istrue: boolean; // 树请求标识符 true才可以请求
    // 展开节点事件
    Unfold(event) {
        if (event.node.guid === this.treeResult) {
            this.istrue = false;
        } else {
            this.istrue = true;
        }
        if (this.istrue) { // 为true的时候 说明不存在，没有请求过 才去请求
            this.getTreeNode(event);
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

    reset() {
            this.dict = new DictModule();
        }
    // 弹出框保存组件
    save() {
            const jsonOption = this.dictAdd;
            if (this.creatExit) { // 调用新增的逻辑
                // 调用服务来获取列表节点操作
                 this.utilityService.postData(appConfig.testUrl  + appConfig.API.sysDictAdd, jsonOption)
                     .map(res => res.json())
                     .subscribe(
                         (val) => {
                             this.nznot.create('success', val.msg , val.msg);
                             this.getData();
                         },
                     );

            } else { // 调用修改的逻辑
            this.utilityService.putData(appConfig.testUrl + appConfig.API.sysDictEdit, jsonOption)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        console.log(val);
                        this.nznot.create('success', val.msg , val.msg);
                        this.getData();
                    });
        }
        this.modalVisible = false;
        this.treeshow = false; // 关闭右侧树结构
    }


    // 树的方法
    // 右击菜单传递值
    RightSelect(event) {
        console.log(event)
        this.treeSelectData = event.node; // 右击选中的数据绑定全局使用
        if (event.node.childDict) { // 子业务字典
                this.treemenus = [
                    {label: '删除业务字典', icon: 'fa-search', command: (event) => this.delectDict()},
                    {label: '新增字典项', icon: 'fa-close' , command: (event) => this.addDictItem()},
                    {label: '修改业务字典', icon: 'fa fa-circle-o-notch' , command: (event) => this.exitdict()},
                ];
            } else {  // 字典项
                this.treemenus = [
                    {label: '删除字典项', icon: 'fa fa-circle-o-notch' , command: (event) => this.delectdictItem()},
                    {label: '修改字典项', icon: 'fa fa-circle-o-notch' , command: (event) => this.exitdictItem()},
                    {label: '设置默认值', icon: 'fa fa-circle-o-notch' , command: (event) => this.setdefault()},
                ];
        }
    }

    // 左击树菜单节点信息
    TreeSelect(event) {

    }


    // 删除业务字典
    delectDict() {
        this.modal.open({
            title: '是否删除',
            content: '您确认要删除选中的业务字典吗？删除业务字典对应的字典项也会删除',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                this.utilityService.deleatData(appConfig.testUrl + appConfig.API.sysDictDel + '/' +  this.treeSelectData.guid)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            this.nznot.create('success', val.msg , val.msg);
                            if ( !(( this.total - 1) % 10)) {
                                // if ( !(( this.total - this.acfundata.length) % 10)) { // 支持批量删除的方法
                                this.dict.pi -- ;
                                this.getData();
                            }
                            this.getData();
                            this.getTreeList(this.dictInfo[0].guid);
                        });
            },
            onCancel: () => {
                console.log('失败');
            }
        });
    }



    // 删除业务字典项
    delectdictItem() {
        this.modal.open({
            title: '是否删除',
            content: '您确认要删除选中的字典项吗',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                this.utilityService.deleatData(appConfig.testUrl + appConfig.API.sysDicttems + '/' +  this.treeSelectData.guid)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            this.nznot.create('success', val.msg , val.msg);
                            this.getTreeList(this.dictInfo[0].guid);
                        });
            },
            onCancel: () => {
                console.log('失败');
            }
        });
    }

    // 新增字典项
    addDictItem() {
        this.dictItemAdd = new DictItemModule(); // 初始化模块
        this.isEdit  = false; // 新增
        this.dictItemAdd.itemType = 'value'; // 默认字典值
        this.dictionaryItems = true; // 打开弹出框
    }

    // 修改字典项
    exitdictItem() {
        this.isEdit  = true; // 修改
        this.dictItemAdd = this.treeSelectData;
        this.dictionaryItems = true; // 打开弹出框
    }


    // 修改业务字典
    exitdict() {
        // 根据guid查询业务字典详情，然后去复制修改信息
        this.utilityService.getData(appConfig.testUrl  + appConfig.API.sysDictAdd + '/' + this.treeSelectData.guid)
            .subscribe(
                (val) => {
                    this.dictAdd =  val.result;
                    this.dictTypeMode(val.result); // 枚举值转换
                    this.formTypeMode(val.result); // 枚举值转换
                });

        this.modalVisible = true;
    }



    // 设置默认值
    setdefault() {
        alert('是否设置此字典项为业务字典默认值?');
    }

    // 字典项保存
    itemSava() {
        if (!this.isEdit) { // 新增字典项
            const jsonOption = this.dictItemAdd;
            jsonOption.guidDict = this.treeSelectData.guid;
            console.log(jsonOption)
            this.utilityService.postData(appConfig.testUrl  + appConfig.API.sysDictItems, jsonOption)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        this.nznot.create('success', val.msg , val.msg);
                        // this.getData();
                        this.getTreeList(this.dictInfo[0].guid);
                    },
                );
        } else { // 修改业务字典项接口
            const jsonOption = {
                guid: this.treeSelectData.guid,
                guidDict: this.treeSelectData.guidDict,
                itemDesc: this.dictItemAdd.itemDesc,
                itemName: this.dictItemAdd.itemName,
                itemType: this.dictItemAdd.itemType,
                itemValue: this.dictItemAdd.itemValue,
                sendValue: this.dictItemAdd.sendValue,
                seqNo: this.dictItemAdd.seqno,
            };
            this.utilityService.putData( appConfig.testUrl  + appConfig.API.sysDictItems, jsonOption)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        console.log(val);
                        this.nznot.create('success', val.msg , val.msg);
                        this.getTreeList(this.dictInfo[0].guid);
                    }
                );
        }

        this.dictionaryItems = false; // 关闭弹窗
    }



    // 树节点搜索框的内容
    searchVal($event) {
        console.log($event);
    }

}
