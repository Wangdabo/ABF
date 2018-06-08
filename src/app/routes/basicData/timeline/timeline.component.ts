import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {UtilityService} from '../../../service/utils.service';
import {ActivatedRoute} from '@angular/router';
import {LogcChangeModule, PageModule} from '../../../service/common.module';
import {appConfig} from '../../../service/common';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
})
export class TimelineComponent implements OnInit {


    page: any;
    logName: string;
    infoData: any;
    dataInfo: any;
    array = [];
    modalVisible = false;
    data = [];
    total: number;

    logChange: LogcChangeModule = new LogcChangeModule(); // 对象差异值
    pages: PageModule = new PageModule();
    constructor(
        private http: _HttpClient,
        public activatedRoute: ActivatedRoute,
        private utilityService: UtilityService,
        private nznot: NzNotificationService
    ) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(queryParams => {
            this.infoData = JSON.parse(queryParams.logInfo);
            this.logName = queryParams.logInfo.dictName;
        });

        this.getInfo(JSON.parse(this.infoData.dataString));
        this.getData(this.infoData.dataGuid);
    }

    // 详情信息
    getInfo(event) {
        this.dataInfo = event;

        for (let k in this.dataInfo) {
            let  strs = {
                key: k,
                value: this.dataInfo[k]
            };
            this.array.push(strs);
        }
    }

    getData(event) {
        this.page = {
            page: {
                current: this.pages.pi,
                size: this.pages.size,
            }
        };

        this.utilityService.postData(appConfig.testUrl + appConfig.API.logChange + '/' + event, this.page)
            .map(res => res.json())
            .subscribe(
                (val) => {
                    console.log(val.result);
                    for (let i = 0 ; i < val.result.records.length; i++) {
                        val.result.records[i].userName = 'wangbo';
                        val.result.records[i].status = '成功';
                        val.result.records[i].items = '2018/6/7 18:22:00';
                    }
                    this.data = val.result.records;
                    this.total = val.result.total;
                }
            );
    }


    objChange(event) {
        this.utilityService.getData(appConfig.testUrl + appConfig.API.logChanges + '/' + event.guid)
            .subscribe(
                (val) => {
                    if (val.code === '404') {
                        this.nznot.create('error', val.msg , val.msg);
                    } else { // 成功才打开
                        this.logChange = val.result;

                    }
                }
            );

    }

    pageChange(event) {

    }


}
