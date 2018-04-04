import { Component, Input } from '@angular/core';
import { NzModalSubject, NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';

@Component({
    selector: 'app-model-custom',
    styleUrls: ['./custom.component.less'],
    templateUrl: './custom.component.html'

})
export class ModelCustomComponent {


    @Input() name: string;
    constructor(
        private modalHelper: ModalHelper,
        private model: NzModalService,
        private msg: NzMessageService,
        private subject: NzModalSubject) {}

    show() {
        this.modalHelper
            .open(ModelCustomComponent, { name: 'From Submodal Data' }, 'sm', {
                zIndex: 1001 // https://github.com/NG-ZORRO/ng-zorro-antd/issues/317
            })
            .subscribe(result => this.msg.info(`subscribe sub status: ${JSON.stringify(result)}`));
    }

    ok() {
        this.subject.next(`new time: ${+new Date}`);
        this.cancel();
        console.log('点击了ok');
    }


    cancel() {
        this.subject.destroy();
    }
}
