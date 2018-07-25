import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilityService} from '../../../../service/utils.service';
import {appConfig} from '../../../../service/common';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import { OperatrModule } from '../../../../service/operators';

@Component({
  selector: 'app-role-func',
  templateUrl: './role-func.component.html',
})
export class RoleFuncComponent implements OnInit {

    constructor(
        private http: _HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute, // 注入路由，接收到参数
        private modal: NzModalService,
        private nznot: NzNotificationService,
        private utilityService: UtilityService,
    ) { }

    ngOnInit() {
    }

}
