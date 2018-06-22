import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilityService} from '../../../service/utils.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {GroupModule} from '../../../service/common.module';
import {appConfig} from '../../../service/common';


@Component({
  selector: 'app-groupdetail',
  templateUrl: './groupdetail.component.html',
})
export class GroupdetailComponent implements OnInit {

    constructor(
        private http: _HttpClient,
        private router: Router,
        private utilityService: UtilityService,
        private activatedRoute: ActivatedRoute, // 注入路由，接收到参数.
        private modal: NzModalService,
        private nznot: NzNotificationService
    ) { }
    guidGroup: string;
    workItem: GroupModule = new GroupModule(); // 赋值
    groupType: any;
    groupStatus: any;
    isEdit: boolean;
    groupData: boolean; // 工作组状态
    guidOrg: any; // 所有机构

    // 枚举值转换
    typeGroup(event) {
        if (event.groupType === '普通工作组') {
            event.groupType = 'normal';
        } else if (event.groupType === '项目型') {
            event.groupType = 'project';
        }   else if (event.groupType === '事务型') {
            event.groupType = 'affair';
        }
    }


    typeStatus(event) {
        if (event.groupStatus === '正常') {
            event.groupStatus = 'running';
        } else if (event.groupStatus === '注销') {
            event.groupStatus = 'cancel';
        }
    }


    ngOnInit() {
        this.guidGroup = this.activatedRoute.snapshot.params.id; // 拿到父组件传过来的组织机构的guid来进行操作

        // 枚举值转换
        this.groupType = appConfig.Enumeration.groupType;
        this.groupStatus = appConfig.Enumeration.groupStatus;
        this.isEdit = true;
        this.getInit();

        // 查询所有机构
        this.utilityService.getData(appConfig.testUrl  + appConfig.API.orgQueryAll)
            .subscribe(
                (val) => {
                    this.guidOrg = val.result;
                });

    }


    getInit() {
        this.utilityService.getData(appConfig.testUrl  + appConfig.API.omGroups + '/' + this.guidGroup)
            .subscribe(
                (val) => {
                    if (val.result.groupStatus === '正常') {
                        this.groupData = true;
                    } else {
                        this.groupData = false;
                    }
                    // 枚举值转换
                    this.typeGroup(val.result)
                    this.typeStatus(val.result)
                    this.workItem = val.result; // 渲染数据
                },
            );
    }


    groupEdit() {
        this.isEdit = false;
    }

    groupSave() {
        const jsonOption =  this.workItem;
        console.log(jsonOption);
        this.utilityService.putData(appConfig.testUrl  + appConfig.API.omGroups, jsonOption)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    this.nznot.create('success', val.msg , val.msg);
                },
            );


        this.isEdit = true;
    }


    // 启动岗位
    openGroup() {

        this.modal.open({
            title: '是否启用下级工作组',
            content: '确定则该工作组下所有工作组都会被启用，取消则只启用当前工作组',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                this.utilityService.putData(appConfig.testUrl  + appConfig.API.omGroups + '/' + this.guidGroup  + '/reenable' + '/' + true)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            this.nznot.create('success', val.msg , val.msg);
                            this.getInit();
                        });
            },
            onCancel: () => {
                this.utilityService.putData(appConfig.testUrl  + appConfig.API.omGroups + '/' + this.guidGroup  + '/reenable' + '/' + false)
                    .map(res => res.json())
                    .subscribe(
                        (val) => {
                            this.nznot.create('success', val.msg , val.msg);
                            this.getInit();
                        });
            }
        });

    }
    // 注销岗位
    cancelGroup() {
        this.utilityService.putData(appConfig.testUrl  + appConfig.API.omGroups + '/' + this.guidGroup  + '/enable')
            .map(res => res.json())
            .subscribe(
                (val) => {
                    console.log(val)
                    this.nznot.create('success', val.msg , val.msg);
                    this.getInit();
                });
    }
}
