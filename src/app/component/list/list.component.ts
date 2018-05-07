import {Component, OnInit, EventEmitter, Output, Input, SimpleChanges, OnChanges} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {NzMessageService} from 'ng-zorro-antd';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
    styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit, OnChanges {

    q: any = { // 定义一个对象
        pi: 1, // 页数
        ps: 10, // 每业个数
        sorter: '',
        status: null,
        statusList: []
    };

    data: any[] = [];

    loading = false;
    selectedRows: any[] = [];
    curRows: any[] = [];
    totalCallNo = 0;
    allChecked = false;
    indeterminate = false;

    header:any[]; // 表头数据

    obj:any[];


    @Input() // 输入属性,接受父组件传入的数据
    initDate:any[];

    @Input() // 输入属性,接受父组件传递的表头
    headerDate:any[];

    @Input() // 输入属性,接受按钮层方法
    moreData:any[];


    @Output()
    addCreat: EventEmitter<string> = new EventEmitter(); // 定义一个输出属性，当点击按钮的时候 发射出去

    @Output()
    pageNumber: EventEmitter<number> = new EventEmitter(); // 定义一个输出属性，当点击按钮的时候 发射出去

    @Output()
    deleatData: EventEmitter<any> = new EventEmitter(); // 定义一个输出属性，当点击按钮的时候 发射出去

    @Output()
    isActive: EventEmitter<any> = new EventEmitter(); // 定义一个输出属性，当点击按钮的时候 发射出去

     @Output()
     buttonData: EventEmitter<any> = new EventEmitter(); // 定义一个输出属性，按钮点击事件，非必选

    @Output()
    selectedRow: EventEmitter<any> = new EventEmitter(); // 定义一个输出属性，按钮点击事件，非必选


    constructor(private http: _HttpClient, public msg: NzMessageService) {
    }

    ngOnInit() {
        this.headerDate = this.headerDate;
        this.moreData = this.moreData; // 绑定更多数据
        this.getData();
    }


    ngOnChanges(changes: SimpleChanges): void { // 监听 当组件发生改变的时候，初始化数据
        this.getData();
    }





    // 初始化数据方法
    getData() {
     /*  console.log(this.q)  翻页点击的也是这个方法，实际上可以不用，在搜索的时候可以直接写一个搜索方法，传入页数即可
         console.log(this.q.pi); 页数*/
        // 获取数据，模拟数据来使用
       this.data = this.initDate;
    }


    // 打开模态框方法,点击之后应该往外部发射事件，告诉父组件点击了这个按钮
    add(event) {
        if (event !== undefined){
            this.addCreat.emit(event); // 点击了修改，打开弹出框，把修改的数据传递过去
        } else {
            this.addCreat.emit('这里是新增的方法'); // 点击新增了，把事件发给父组件
        }

    }


    // 点击事件方法
    isClick(d, i) {
        if (d.isclick === true) {
            this.isActive.emit(i); // 此时，代表允许有行为，至于是路由跳转还是弹出框 父组件中进行定义和修改
        }
    };


    // 移除数据方法
    remove() {

        this.deleatData.emit(this.selectedRows); // 把要删除的内容发射给父组件
        this.getData();
        this.clear();
    }


    moreclick(event) {
        const obj = {
            key: this.selectedRows[0],
            value: event
        };

        this.buttonData.emit(obj); // 把要删除的内容发射给父组件
    }

    // 清空方法
    clear() {
        this.selectedRows = [];
        this.totalCallNo = 0;
        this.data.forEach(i => i.checked = false);
        this.refreshStatus();
    }


    //  全选方法
    checkAll(value: boolean) {
        this.curRows.forEach(i => {
            if (!i.disabled) i.checked = value;
        });
        this.refreshStatus();
    }

    // 全选方法底层方法
    refreshStatus() {
        const allChecked = this.curRows.every(value => value.disabled || value.checked);
        const allUnChecked = this.curRows.every(value => value.disabled || !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
        this.selectedRows = this.data.filter(value => value.checked);
        this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);

        const obj = {
            indeterminate: this.indeterminate,
            selectedRows: this.selectedRows,
        }

        if (this.selectedRows.length < 2 ) {
            this.selectedRow.emit( obj ); // 把是否旋转和选中的内容传出去
        }

    }




    dataChange(res: any) {
        this.curRows = res;
        this.refreshStatus();
    }

    // 翻页方法
    pageChange(pi: number): Promise<any> {
        this.q.pi = pi;
        this.pageNumber.emit(this.q.pi); // 发射出去，把当前的页数发射出去

        this.loading = true;
        return new Promise((resolve) => {
            setTimeout(() => {
                this.loading = false;
                resolve();
            }, 500);
        });
    }


    // 重置方法
    reset(ls: any[]) {
        for (const item of ls) item.value = false;
        this.getData();
    }

}
