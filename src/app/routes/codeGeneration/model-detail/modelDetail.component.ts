import { Component, Input } from '@angular/core';
import { NzModalSubject, NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';

@Component({
    selector: 'app-modelDetail',
    styleUrls: ['./modelDetail.component.less'],
    templateUrl: './modelDetail.component.html'

})
export class modelDetailComponent {
        @Input() name: string;

        constructor(
            private modalHelper: ModalHelper,
            private model: NzModalService,
            private msg: NzMessageService,
            private subject: NzModalSubject) {}

        show() {
            this.modalHelper
                .open(modelDetailComponent, { name: 'From Submodal Data' }, 'sm', {
                    zIndex: 1001 // https://github.com/NG-ZORRO/ng-zorro-antd/issues/317
                })
                .subscribe(result => this.msg.info(`subscribe sub status: ${JSON.stringify(result)}`));
        }

        ok() {
            this.subject.next(`new time: ${+new Date}`);
            this.cancel();
            console.log('点击了OK');
        }

        cancel() {
            this.subject.destroy();
        }






}
