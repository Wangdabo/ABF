import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {LogsModule} from '../../../service/common.module';
import {appConfig} from '../../../service/common';
import {UtilityService} from '../../../service/utils.service';

@Component({
  selector: 'app-log-data',
  templateUrl: './log-data.component.html',
})
export class LogDataComponent implements OnInit {

    constructor(
        private http: _HttpClient,
        private router: Router,
        public activatedRoute: ActivatedRoute,
        private utilityService: UtilityService,
    ) { }


    // 查看详情界面
    detailsData: any[] = []; // 表格数据
    // 翻页数据
    showAdd: true;
    logDetails: LogsModule = new LogsModule(); // 日志详情值
    configTitle: string;
    headerDetails = [ // 配置表头
        { value: '操作数据类型', key: 'operateType', isclick: false },
        { value: '数据GUID', key: 'dataGuid', isclick: false },
        { value: '数据名称', key: 'dataName', isclick: false },
        { value: '数据类名', key: 'dataClass', isclick: false }
    ]

    detailstotal: number; // 总页数
    logGuid: string;
    iserror: boolean;
    autosize = { // 最大值
        minRows: 2,
        maxRows: 6
    };
    page: any;

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(queryParams => {
            this.logGuid = queryParams.logGuid;
        });

        this.configTitle = '查看详情'
        this.showAdd = true;
        this.getinfo(this.logGuid);
        this.getDetail(this.logGuid);
    }

    // 查询详情
    getDetail(guid) {
        this.utilityService.getData(appConfig.testUrl + appConfig.API.logDetail + '/' + guid)
            .subscribe(
                (val) => {
                    // 修改成功只和的处理逻辑
                    this.logDetails = val.result;
                    console.log(this.logDetails)
                    if (val.result.operateResult === 'ERROR') {
                            this.iserror = true;
                    }
                });
    }

    // 查询内容
    getinfo(guid) {
        this.page = {
            page: {
                current: this.logDetails.pi,
                size: this.logDetails.size,
            }
        };
        this.utilityService.postData(appConfig.testUrl + appConfig.API.logData + '/' + guid, this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    console.log(val.result.records);
                    this.detailsData = val.result.records;
                    this.detailstotal = val.result.total;
                }
            );
    }

    detailsHandler(event) {
        /*this.utilityService.getData(appConfig.testUrl + appConfig.API.logData + '/' + event.dataGuid)
            .subscribe(
                (val) => {
                    // 修改成功只和的处理逻辑
                    console.log(val);
                });*/
        // 路由跳转
        this.router.navigate(['Timeline'],
            { queryParams:
                    { logInfo: JSON.stringify(event)
                    }
            });
    }

    monitordetailsData(event) { // 翻页事件

    }



}
