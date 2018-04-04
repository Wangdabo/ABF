import { Component, Input } from '@angular/core';
import { NzModalSubject, NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent, HttpRequest } from '@angular/common/http';

/**
 * 封装HttpClient 主要解决：
 * 优化在参数上的便利性
 * 统一实现loading
 * 统一处理时间格式的问题
 *          -- leo wang
 */

@Component({
    selector: 'app-new-app',
    styleUrls: ['./newApp.component.less'],
    templateUrl: './newApp.component.html'

})
export class NewAppComponent {
    prefixUrl: string;
    public _name;
    public _desc;
    @Input() name: string;

    constructor(
        private modalHelper: ModalHelper,
        private model: NzModalService,
        private msg: NzMessageService,
        private subject: NzModalSubject,
        private http: HttpClient) {
            this.prefixUrl = '192.168.43.104:8080/erApp/add';
        }


    show() {
        this.modalHelper
            .open(NewAppComponent, { name: 'From Submodal Data' }, 'sm', {
                zIndex: 1001 // https://github.com/NG-ZORRO/ng-zorro-antd/issues/317
            })
            .subscribe(result => this.msg.info(`subscribe sub status: ${JSON.stringify(result)}`));
    }

    obj = {
        name:'',
        desc:''
    };

    obj1 = {};
    ok() {
        this.obj.desc = this._desc;
        this.obj.name = this._name;
        this.obj1 = JSON.stringify(this.obj);
        this.subject.next(`new time: ${+new Date}`);
        this.cancel();
        this.http.post('/erApp/add',this.obj1).subscribe((res) => {
             console.log(res)
        });

    }

    cancel() {
        this.subject.destroy();
    }
}



