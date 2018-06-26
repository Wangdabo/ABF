import {Component, OnInit, Inject, Injectable, APP_INITIALIZER, LOCALE_ID} from '@angular/core';
import {_HttpClient, User} from '@delon/theme';
import {MenuItem} from 'primeng/api';
import { UtilityService} from '../../../service/utils.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {appConfig} from '../../../service/common';
import { AcMenuModule} from '../../../service/common.module';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})

// 依赖注入，把url链接注入进来即可
@Injectable()
export class MenuComponent implements OnInit {
    constructor(
        private http: _HttpClient,
        private utilityService: UtilityService,
    ) { }

    treedata: any[]; // tree组件数据
    treemenus: MenuItem[]; // 右击菜单数据
    page: any;
    total: number;
    acmenuModule: AcMenuModule = new AcMenuModule();
    data: any[] = []; // 表格数据
    appData: any[]; // 应用数据
    guidParents =  [{
        'label': '',
        'guid': ''
    }]; // 父菜单
    isDisplay: boolean ;
    treeshow = false; // 是否显示树结构
    nodrop: boolean;
    searchTitle: string;
    inforShow: boolean;
    disableFlag: boolean;
    addMenuData: AcMenuModule = new AcMenuModule(); // 弹窗页面用的对象
    acMenuInfor: AcMenuModule = new AcMenuModule(); // 详细信息展示用的对象
    modalVisible: boolean;
    select: any;
    proDisable: boolean; // 增加页面时控制字段是否失去焦点
    proParentDisable: boolean; // 增加页面时控制父菜单字段是否失去焦点
    guidFuncshow: boolean; // 弹窗里控制功能字段是否可见
    proLeafDisable: boolean; // 弹窗里控制叶子菜单字段是否可输入
    guidParentsshow: boolean; // 弹窗里控制父菜单字段是否可见
    appcode: string; // 存储页面上应用ID 用来刷新页面
    originPonit: string; // 树拖拽时候的被拖拽菜单guid
    destinaPoint: string; // 树拖拽时候目标菜单的guid
    moveDate: any; // 移动菜单时候需要传的参数
    playOrder: any; // 菜单展示的顺序
    Leafs = [
        {'text': '是' , 'value': 'Y'},
        {'text': '否' , 'value': 'N'}
    ];
    tanchuangTitle: string; // 弹窗名字
    guidFuncList: any; // 存储所有的功能
    options = [
        { value: 'android', label: 'android' },
        { value: 'apple', label: 'apple' },
        { value: 'windows', label: 'windows' },
        { value: 'ie', label: 'ie' },
        { value: 'chrome', label: 'chrome' },
        { value: 'github', label: 'github' },
        { value: 'aliwangwang', label: 'aliwangwang' },
        { value: 'dingding', label: 'dingding' },
        { value: 'xz', label: 'plus-square-o' },
    ];


    ngOnInit() {
        this.isDisplay = true;
        this.acmenuModule.pi = 1;
        this.acmenuModule.size = 10;
         this.getAppData(); // 先查询应用信息
    }

    // 查询有哪些应用
    getAppData() {
        this.page = {
            page: {
                current: 1,
                size: 100,
            }
        };

        // this.utilityService.postData(appConfig.testUrl + appConfig.API.appList, this.page)
        //     .map(res => res.json())
        this.utilityService.getData(appConfig.testUrl + appConfig.API.appListAll)
            .subscribe(
                (val) => {
                    // console.log(val.result);
                    this.appData = val.result;
                }
            );
        // console.log(this.appData);
    }

    appCodeChange(event ) {
        //  根据应用ID 查菜单
        // 拖拽属性
        this.nodrop = false ;
        this.searchTitle = 'sss';
        this.appcode = event ;

        // 调用服务来获取列表节点操作
        this.treedata = [];
        this.utilityService.getData(appConfig.testUrl + appConfig.API.acMenuListByAppcode + event)
            .subscribe(
                (val) => {
                    // console.log(val.result);
                    val.result[0].label = val.result[0].menuName;
                    val.result[0].expandedIcon = 'fa-folder-open';
                    val.result[0].collapsedIcon = 'fa-folder';
                    val.result[0].childDict = true; // 是业务字典
                    val.result[0].children = [{
                        // 'label': '',
                        // 'expandedIcon': 'fa-folder-open',
                        // 'collapsedIcon': 'fa-folder'
                    }];
                    this.treedata.push(val.result[0]);

                    // 不是叶子菜单
                    if (this.treedata[0].isleaf === 'N') {


                    }
                });

        this.treeshow = true; // 显示树结构

    }

    // 选中了某个菜单,当它是叶子菜单的时候在页面的右边展示他的信息
    TreeSelect(event) {
        if (event.node.childDict) {
            this.inforShow = false;
        }else {
            this.acMenuInfor = event.node;
            // console.log(event.node);
            this.inforShow = true;
        }
        this.disableFlag = true;
        // console.log(event);
    }

    isleafchange (event) {
        // console.log(event);
        if ( this.tanchuangTitle === '增加子菜单') {
            // 增加菜单时候如果不是叶子菜单 就控制功能不可见
            if (event === 'N') {
                this.guidFuncshow = false;
            }else {
                this.guidFuncshow = true;
            }
        }else {

        }
    }
    // 右键单击文件夹名触发
    RightSelect(event) {
        this.select = event;
        this.treemenus = [
            {label: '删除菜单', icon: 'fa-search', command: () => this.delectMenu()},
            {label: '新增子菜单', icon: 'fa-close' , command: () => this.addMenu()},
            {label: '修改菜单', icon: 'fa fa-circle-o-notch' , command: () => this.updateMenu()},
        ];
    }

    delectMenu() {
        // console.log(this.select.node);
        this.addMenuData = new AcMenuModule();
        // this.modalVisible = true;
        this.guidParents[0].label = this.select.node.menuName;
        this.guidParents[0].guid = this.select.node.guid;
        this.addMenuData.guidParents = this.select.node.guid;
        this.addMenuData.guidApp = this.select.node.guidApp;
        this.addMenuData.menuName = this.select.node.menuName;
        this.addMenuData.menuLabel = this.select.node.menuLabel;
        this.addMenuData.guidFunc = this.select.node.guidFunc;
        this.addMenuData.menuCode = this.select.node.menuCode;
        this.addMenuData.isLeaf = this.select.node.isleaf;
        this.proParentDisable = false;
        this.proDisable = true ;
        console.log(this.select.node);
        // this.appCodeChange(this.appcode );
        this.utilityService.deleatData(appConfig.testUrl  + appConfig.API.acMenuDeletByid + this.select.node.guid)
            .map(res => res.json())
            .subscribe(
                (val) => {
                },
            );
        this.appCodeChange(this.appcode );
    }
    addMenu() {
        // 如果已经是叶子菜单了 就不允许增加子菜单
        if (this.select.node.isleaf === 'Y') {
            // console.log('叶子菜单不允许增加子菜单');
            return;
        }
        // 增加菜单前 查询所有的功能
        this.utilityService.getData(appConfig.testUrl  + appConfig.API.funcListAll )
            .subscribe(
                (val) => {
                    // console.log(val.result);
                    this.guidFuncList = val.result;
                },
            );
        this.addMenuData = new AcMenuModule();
        // this.guidFuncList = [{'key': '功能1' , 'value': 'gongneng1'} , {'key': '功能2' , 'value': 'gongneng2' }];
        this.tanchuangTitle = '增加子菜单';
        this.modalVisible = true;
        this.proLeafDisable = false;
        this.proDisable = false;
        this.guidParents[0].label = this.select.node.menuName;
        this.guidParents[0].guid = this.select.node.guid;
        this.addMenuData.guidParents = this.select.node.guid;
        this.addMenuData.guidApp = this.select.node.guidApp;
        // 增加子菜单父菜单不可输入
        this.proParentDisable = true;
    }

    updateMenu() {
        this.tanchuangTitle = '修改菜单';
        this.modalVisible = true;
        // 修改菜单叶子菜单字段不可输入
        this.proLeafDisable = true;
        // 修改菜单父菜单字段不可见
        this.guidParentsshow = false;
        this.addMenuData = new AcMenuModule();
        // 最底层菜单才能修改功能
        if (this.select.node.isleaf === 'Y') {
            this.guidFuncshow = true;
            this.addMenuData.guidFunc = this.select.node.guidFunc;
        }else {
            // 控制功能字段是否可见
            this.guidFuncshow = false;

        }
        this.addMenuData.isLeaf = this.select.node.isleaf;
        this.addMenuData.guidApp = this.select.node.guidApp;
        this.addMenuData.menuName = this.select.node.menuName;
        this.addMenuData.menuLabel = this.select.node.menuLabel;
        this.addMenuData.menuCode = this.select.node.menuCode;
        this.addMenuData.guid = this.select.node.guid;
        this.addMenuData.imagePath = this.select.node.imagePath;
        this.addMenuData.uiEntry = this.select.node.uiEntry;
        this.proParentDisable = false;
        this.proDisable = false ;
        // console.log(this.select.node.imagePath);
    }

    // 弹窗页面的确认方法
    save () {
        this.modalVisible = false;
        if (this.tanchuangTitle === '修改菜单') {
            // console.log(this.addMenuData);
            this.utilityService.putData(appConfig.testUrl  + appConfig.API.acMenuUpdate , this.addMenuData)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                    },
                );
        }
        if (this.tanchuangTitle === '增加子菜单') {
            // console.log(this.addMenuData);
            this.utilityService.postData(appConfig.testUrl  + appConfig.API.acMenuAddChild, this.addMenuData)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                    },
                );
        }
        this.appCodeChange(this.appcode );
    }

    viewFile() {
        alert('点我1');
    }

    unselectFile() {
        alert('电你1');
    }


    close() {
         alert('改变');
    }


    dropEvent($event) {
        console.log($event);
        console.log($event.dragNode.guid) ; // 被拖拽的数据
        console.log($event.dropNode.guid) ; // 拖拽的数据目标地的guid
        this.originPonit = $event.dragNode.guid;
        this.destinaPoint = $event.dropNode.guid;
        // 如果拖拽的目的地菜单是叶子菜单，拖拽目标目的地设为它的父菜单
        if ($event.dropNode.isleaf === 'Y') {
            this.destinaPoint = $event.dropNode.guidParents;
        }
        this.playOrder = $event.dropNode.displayOrder;
        this.moveDate = {
            'targetGuid': this.destinaPoint,
            'moveGuid': this.originPonit,
            'order': this.playOrder
        };
        this.utilityService.postData(appConfig.testUrl  + appConfig.API.acMenuMove , this.moveDate )
            .map(res => res.json())
            .subscribe(
                (val) => {
                },
            );
        this.appCodeChange(this.appcode );
    }

    searchVal($event) {
        console.log('searchVal');
    }

    // 点击左侧文件夹标时候触发
    Unfold(event ) {
        // console.log(event.node.guid);
        // 根据上一级guid查询 下一级菜单数据
        this.utilityService.getData(appConfig.testUrl  + appConfig.API.acMenuQueryByFather + event.node.guid)
            .subscribe(
                (val) => {
                    for (let i = 0 ; i < val.result.length; i++) {
                        if (val.result[i].isleaf === 'N') { // 不是最底层的菜单
                            val.result[i].label = val.result[i].menuName;
                            val.result[i].expandedIcon = 'fa-folder-open';
                            val.result[i].collapsedIcon = 'fa-folder';
                            val.result[i].childDict = true;
                            val.result[i].children = [{'label': ''}];
                        }

                        if (val.result[i].isleaf === 'Y') { // 是最底层的菜单
                            val.result[i].label = val.result[i].menuName;
                            val.result[i].icon = 'fa-file-word-o';
                            val.result[i].childDict = false;
                        }

                    }
                    event.node.children = val.result;

                },
            );

    }

}
