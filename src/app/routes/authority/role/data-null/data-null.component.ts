import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {RoleModule} from '../../../../service/role/role.model';
import {UtilityService} from '../../../../service/utils.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-data-null',
  templateUrl: './data-null.component.html',
})
export class DataNullComponent implements OnInit {
    // roleGuid: string;
    constructor(
        private http: _HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute, // 注入路由，接收到参数
        private nznot: NzNotificationService,
        private utilityService: UtilityService,
    ) { }
    buttonText:string;
    buttonTitle:string;

    ngOnInit() {
        // this.roleGuid = this.activatedRoute.snapshot.params.id; // 拿到父组件传过来的组织机构的guid来进行操作
        // console.log(this.roleGuid);

        //   this.buttonText = this.activatedRoute.snapshot.params.buttonText; // 拿到父组件传过来的组织机构的guid来进行操作
        // this.buttonTitle = this.activatedRoute.snapshot.params.buttonTitle;
        this.activatedRoute.queryParams.subscribe(queryParams => { 
            this.buttonText = queryParams.buttonText;
         this.buttonTitle = queryParams.buttonTitle;
     });
     console.log(this.buttonText);

    }

}
