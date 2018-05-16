import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';



@Injectable()
export class PostService {
    private prefixUrl: string;
    constructor(
                private $http: HttpClient,
                @Inject('apiUrl') private api) {
        this.prefixUrl = `business/alarm`;
    }


    /**
     * 单个清除告警
     * @param alarmId
     * @param callback
     */
   /* public cleanAlarm(alarmId): Promise<Result<any>> {
        return new Promise((resolve, reject) => {
            this.$http.put(`${this.prefixUrl}/clean/${alarmId}`, {}).subscribe((result: Result<any>) => {
                result.code === 0 ? resolve(result) : reject(result)
            })
        })
    }*/



}
