import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SequenceResModule} from '../../../service/common.module';
import {appConfig} from '../../../service/common';
import { UtilityService} from '../../../service/utils.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seqresource',
  templateUrl: './seqresource.component.html',
})
export class SeqresourceComponent implements OnInit {

    // 告诉ANgular 构造器里面的东西帮我实例化  我要用
    constructor(
        private utilityService: UtilityService,
        private router: Router,
        private modal: NzModalService,
        private nznot: NzNotificationService,
        private http: _HttpClient
    ) { }

    sequenceResource: SequenceResModule = new SequenceResModule();
    page: any;
    data: any[] = []; // 表格数据
    total: number;
    modalVisible = false;
    isEdit = false; // 是否是修改，默认不是
    headerData = [  // 配置表头内容
        { value: '序号资源表名称', key: 'seqName', isclick: false },
        { value: '序号键值', key: 'seqKey', isclick: false },
        { value: '序号数', key: 'seqNo', isclick: false },
        { value: '重置方式', key: 'reset', isclick: false },
        { value: '重置处理参数', key: 'resetParams', isclick: false }
    ];


    moreData = {
        morebutton: false,
        buttons: [
            { key: 'Overview', value: '查看概况' }
        ]
    }

    ngOnInit() {
        this.sequenceResource.pi = 1;
    }


    reset() {
        this.sequenceResource = new SequenceResModule();
    }
    // 父组件初始化数据
    getData() { // 初始化请求后台数据
        this.page = {
            page: {
                current: this.sequenceResource.pi,
                size: 10
            }
        };
        this.utilityService.postData(appConfig.testUrl + appConfig.API.sysConfigsList, this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    console.log(val.result)
                    this.data = val.result.records;
                    this.total = val.result.total;
                }
            );
    }

    // 搜索框
    search() {
        console.log(this.sequenceResource); // 有效
    }

    // 列表组件传过来的内容
    addHandler(event) {
        if (event === '这里是新增的方法') {
            this.sequenceResource = new SequenceResModule(); // 先清空
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
            this.isEdit = false;
        } else { // 代表修改，把修改的内容传递进去，重新渲染
            this.sequenceResource = event;
            this.modalVisible = true;  // 此时点击了列表组件的新增，打开模态框
            this.isEdit = true;
        }
    }

    // 列表按钮方法
    buttonDataHandler(event) {

    }

    // 列表传入的翻页数据
    monitorHandler(event) {
        this.sequenceResource.pi = event;
        this.page = {
            page: {
                current: event, // 页码
                size: this.sequenceResource.size, //  每页个数
            }
        };
        this.getData();
    }

    // 接受子组件删除的数据 单条还是多条
    deleatData(event) {
        this.modal.open({
            title: '是否删除',
            content: '您是否确认删除所选数据?',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                this.utilityService.deleatData(appConfig.testUrl + appConfig.API.seqResourcedel + '/' + event[0].seqKey)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {

                            this.nznot.create('success', '状态码' + val.code + val.msg , val.msg);
                            if ( !(( this.total - 1) % 10)) {
                                // if ( !(( this.total - this.acfundata.length) % 10)) { // 支持批量删除的方法
                                this.sequenceResource.pi -- ;
                                this.getData();
                            }
                            this.getData();

                        },
                        response => {
                            // 如果数据不正确，则在这里给初始数据
                            this.data = [];
                        });
            },
            onCancel: () => {
                console.log('取消成功');
            }
        });

    }

    // 处理行为代码，跳转、弹出框、其他交互
    isActive(event) {

    }

    selectedRow(event) { // 选中方法，折叠层按钮显示方法

    }
}

