import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilityService} from '../../../../service/utils.service';
import {appConfig} from '../../../../service/common';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import { OperatrModule } from '../../../../service/operators';

@Component({
  selector: 'app-operator-info',
  templateUrl: './operator-info.component.html',
})
export class OperatorInfoComponent implements OnInit {

    constructor(
        private modal: NzModalService,
        private http: _HttpClient,
        private router: Router,
        private nznot: NzNotificationService,
        private utilityService: UtilityService,
        private activatedRoute: ActivatedRoute, // 注入路由，接收到参数
    ) { }

    operatorId: string; // 接受传过来的id
    operator: OperatrModule = new OperatrModule();

    id: string; // 传递的值
    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(queryParams => {
            this.operatorId = queryParams.operatorId;
        });

        this.id = this.operatorId;
        this.router.navigate(['operatorInfo/operatorrole', this.id]); // 跳转路由
        this.getOperatorInfo(this.operatorId); // 调用方法

    }


    // 根据id查询操作员详情
    getOperatorInfo(id) {
        this.utilityService.getData(appConfig.testUrl + appConfig.API.acOperatorsAdd + '/' + id)
            .subscribe(
                (val) => {
                    console.log(val)
                    this.operator = val.result;
                }
            );
    }

}
