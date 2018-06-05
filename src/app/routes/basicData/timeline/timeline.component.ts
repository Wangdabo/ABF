import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {UtilityService} from '../../../service/utils.service';
import {ActivatedRoute} from '@angular/router';
import {LogcChangeModule} from '../../../service/common.module';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
})
export class TimelineComponent implements OnInit {

    logName: string;
    infoData: any;
    dataInfo: any;
    array = [];
    modalVisible = false;

    logChange: LogcChangeModule = new LogcChangeModule(); // 对象差异值

    constructor(
        private http: _HttpClient,
        public activatedRoute: ActivatedRoute,
        private utilityService: UtilityService,
    ) { }


    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(queryParams => {
            this.infoData = JSON.parse(queryParams.logInfo);
        });
        this.getInfo(JSON.parse(this.infoData.dataString));
    }

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


    data = [
        {key: '新增界面', value: '成功', userId: '汪波', items: '2018/6/4 15:34'},
        {key: '删除界面', value: '成功', userId: '翁方雷', items: '2018/6/4 15:34'},
        {key: '修改界面', value: '成功', userId: '汪波', items: '2018/6/4 15:34'},
        {key: '查询界面', value: '成功', userId: '汪波', items: '2018/6/4 15:34'},
        {key: '新增界面', value: '成功', userId: '赵春海', items: '2018/6/4 15:34'},
    ];


    objChange(event) {
        this.modalVisible = true;
    }


}
