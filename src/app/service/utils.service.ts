import { Injectable } from '@angular/core';


@Injectable()
export class UtilityService {

    constructor() { }


    getBillTypes() {
        console.log('这是service里的方法');
    }
}
