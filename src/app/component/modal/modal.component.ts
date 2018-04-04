import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {

/*    @Input() // 输入属性
    modalVisible = false;

    description = '';
    loading = false;*/

   /* @Output()
    selectChange = new EventEmitter(); // 定义一个输出属性，当点击按钮的时候 发射出去*/
    constructor(
        private http: _HttpClient
    ) {

}
    ngOnInit() {
       // console.log(this.modalVisible); // 打印无效果
    }


/*
    save(event) {
        console.log('点击了保存')
        this.loading = true
        // 模拟新增
        this.loading = false;
        this.modalVisible = false;
        // 在这个方法里怎么传给父组件？
        this.selectChange.emit({flag: false});
    }
*/

}
