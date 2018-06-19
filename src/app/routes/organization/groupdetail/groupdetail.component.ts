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

    guidOrg = [
        {value: '北京总行', key: '1006423149442502658'},
        {value: '机构A-3-2', key: 'org1102'},
        {value: '机构A-3-3', key: 'org1103'},
        {value: '机构A-3-4', key: 'org1104'},
        {value: '机构A-3-5', key: 'org1105'}
    ]


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
        if (event.groupType === '正常') {
            event.groupType = 'running';
        } else if (event.groupType === '注销') {
            event.groupType = 'cancel';
        }
    }


    ngOnInit() {
        this.guidGroup = this.activatedRoute.snapshot.params.id; // 拿到父组件传过来的组织机构的guid来进行操作
        // 枚举值转换
        this.groupType = appConfig.Enumeration.groupType;
        this.groupStatus = appConfig.Enumeration.groupStatus;
        this.isEdit = true;

        this.utilityService.getData(appConfig.testUrl  + appConfig.API.omGroups + '/' + this.guidGroup)
            .subscribe(
                (val) => {
                    if (val.result.groupStatus === '正常') {
                        this.groupData = true;
                    } else {
                        this.groupData = false;
                    }
                    // if (val.result)
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
        this.isEdit = true;
    }


    // 启动岗位
    openGroup() {

    }
    // 注销岗位
    cancelGroup() {

    }
}
