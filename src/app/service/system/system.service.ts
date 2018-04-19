import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AlarmService {
    private prefixUrl: string;
    constructor(
                private $http: HttpClient,
                @Inject('apiUrl') private api) {
        this.prefixUrl = `business/alarm`;
    }

}
