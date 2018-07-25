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

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(queryParams => {
            this.operatorId = queryParams.operatorId;
        });


    }

}
