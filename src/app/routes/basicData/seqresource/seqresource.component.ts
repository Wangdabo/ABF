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
    sequenceResource2: SequenceResModule = new SequenceResModule(); // 弹出框对象
    page: any;
    data: any[] = []; // 表格数据
    total: number;
    modalVisible = false;
    isEdit = false; // 是否是修改，默认不是
    title: string;
    disableFlag: boolean;
    disableFlag2: boolean;
    configTitle: string;

    headerData = [  // 配置表头内容
        { value: '序号资源表名称', key: 'seqName', isclick: false },
        { value: '序号键值', key: 'seqKey', isclick: false },
        { value: '序号数', key: 'seqNo', isclick: false },
        { value: '重置方式', key: 'reset', isclick: false },
        { value: '重置处理参数', key: 'resetParams', isclick: false }
    ];

    reset = [
        {key: '不重置', value: 'E'},
        {key: '按天重置', value: 'D'},
        {key: '按周重置', value: 'W'},
        {key: '自定义重置周期 ', value: 'C'},
    ]
    moreData = {
        morebutton: false,
        buttons: [
            { key: 'Overview', value: '查看概况' }
        ]
    }

    ngOnInit() {
        this.sequenceResource.pi = 1;
        this.getData();
        this.configTitle = '查看详情';
    }


    resetf() {
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
        this.utilityService.postData(appConfig.testUrl + appConfig.API.seqResource, this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    console.log(val.result);
                    for (let i = 0; i < val.result.records.length; i++ ) {
                        val.result.records[i].buttonData = ['重置序号', '修改序号'];

                    }
                    this.data = val.result.records;
                    this.total = val.result.total;
                }
            );
    }

    getDataByCondition() { // 初始化请求后台数据
        this.page = {
            page: {
                current: this.sequenceResource.pi,
                size: 10
            },
            condition: {
                SequenceResModule: this.sequenceResource
            }

        };
        this.utilityService.postData(appConfig.testUrl + appConfig.API.seqResource, this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    console.log(val.result);
                    for (let i = 0; i < val.result.records.length; i++ ) {
                        val.result.records[i].buttonData = ['重置序号', '修改序号'];

                    }
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
        this.title = '查看详情';
        this.disableFlag = true;
        this.disableFlag2 = true;
        this.modalVisible = true;
        for (let i = 0 ; i < this.reset.length; i++) {
            if (this.reset[i].key === event.reset ) {
                event.reset = this.reset[i].value;
                break;
            }
        }
        console.log(event);
        this.sequenceResource2 = event;
    }

    // 列表按钮方法
    buttonDataHandler(event) {
        // console.log(event);
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

    buttonEvent(e) {
      if (e.names) {
            if (e.names === '重置序号') {
                console.log(e);
                this.modal.open({
                    title: '是否重置',
                    content: '你是否要重置该序号，一旦重置，该序号恢复成0',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        // 接口待确认
                         this.utilityService.putData(appConfig.testUrl + appConfig.API.restSeqResource + e.seqKey)
                             .map(res => res.json())
                                .subscribe(
                                    (val) => {
                                        console.log(val.result);
                                    }
                                );
                    },
                    onCancel: () => {
                    }
                });

            }

            if (e.names === '修改序号') {
                this.modalVisible = true;
                this.title = '修改序号';
                this.sequenceResource2 = e;
                this.disableFlag2 = false;
                this.disableFlag = true;
                for (let i = 0 ; i < this.reset.length; i++) {
                    if (this.reset[i].key === e.reset ) {
                        this.sequenceResource2.reset = this.reset[i].value;
                        break;
                    }
                }
            }
      } else {
          // console.log('调用查看详情方法');
      }
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

    // 取消新增
    cancel() {
        this.modalVisible = false;
        this.sequenceResource = new SequenceResModule();
        this.getData();
    }

    // 弹出框保存组件
    save() {
        if (this.title === '查看详情') {
            this.getData();
        } else {
           console.log('调用修改序号接口');
           console.log(this.sequenceResource2);
            this.utilityService.putData(appConfig.testUrl + appConfig.API.seqResourceUpdate, this.sequenceResource2)
                .map(res => res.json())
                .subscribe(
                    (val) => {
                        console.log(val.result);
                    }
                );

        }

        this.modalVisible = false;
    }
}

