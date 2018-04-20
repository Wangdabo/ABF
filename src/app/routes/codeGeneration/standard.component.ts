// tslint:disable:member-ordering
import { Component, OnInit,EventEmitter,Input, Output} from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ModelCustomComponent } from './custom.component';
import { ModelFormComponent } from './form.component';
import { NewAppComponent } from './new-app/newApp.component';


@Component({
    selector: 'app-table-standard',
    styleUrls: ['./standard.component.less'],
    templateUrl: './standard.component.html',
})

export class TableStandardComponent implements OnInit {
    _value = '';

    onSearch(event: string): void {
        console.log(event);
    }

    data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }
    ];

    ageSort = '';

    ageSortChange($event) {
        if ($event === 'ascend') {
            this.data = [...this.data.sort((a, b) => {
                return a.age - b.age;
            })];
        } else if ($event === 'descend') {
            this.data = [...this.data.sort((a, b) => {
                return b.age - a.age;
            })];
        }
    }


    _allChecked = false;
    _indeterminate = false;
    _displayData = [];

    _displayDataChange($event) {
        this._displayData = $event;
        this._refreshStatus();
    }

    _refreshStatus() {
        const allChecked = this._displayData.every(value => value.checked === true);
        const allUnChecked = this._displayData.every(value => !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = (!allChecked) && (!allUnChecked);
    }

    _checkAll(value) {
        if (value) {
            this._displayData.forEach(data => {
                data.checked = true;
            });
        } else {
            this._displayData.forEach(data => {
                data.checked = false;
            });
        }
        this._refreshStatus();
    }

    // ajax
    _current = 1;
    _pageSize = 3;
    _total = 1;
    _ajaxDataSet = [];
    _ajaxLoading = true;

    constructor(private message: NzMessageService, private modal: NzModalService,
        private msg: NzMessageService) { }

    _ajaxRefreshData = () => {
        this._ajaxLoading = true;

    }

    ngOnInit() {
        this._ajaxRefreshData();

        this._genData();
    }

    dynamic
    _dataSet = [];
    _bordered = false;
    _loading = false;
    _pagination = true;
    _header = true;
    _title = true;
    _footer = false;
    _size = 'small';
    _noresult = false;

    _toggleData() {
        if (this._noresult) {
            this._dataSet = [];
        } else {
            this._genData();
        }
    }

    _genData() {
        this._dataSet = [
            {
                key: '1',
                name: '业务模型一',
                mCount: 12,
                fCount: 23,
            },
            {
                key: '2',
                name: '业务模型二',
                mCount: 22,
                fCount: 31,
            },
            {
                key: '3',
                name: '业务模型三',
                mCount: 15,
                fCount: 30,
            }
        ];
    }

    options = {};



    customCompModel(size: '' | 'lg' | 'sm' = '') {
        this.options = {
            wrapClassName: size ? 'modal-' + size : '',
            content: ModelCustomComponent,
            footer: false,
            componentParams: {
                name: 'From Parent Data'
            }
        };
        this.modal.open(this.options).subscribe(result => {
            // this.msg.info(`subscribe status: ${JSON.stringify(result)}`);
        });
    }

    buildNewApp(size: '' | 'lg' | 'sm' = '') {
        this.options = {
            wrapClassName: size ? 'modal-' + size : '',
            content: NewAppComponent,
            footer: false,
            componentParams: {
                name: 'From Parent Data'
            }
        };
        this.modal.open(this.options).subscribe(result => {
            // this.msg.info(`subscribe status: ${JSON.stringify(result)}`);
        });
    }

    formModel(size: '' | 'lg' | 'sm' = '') {
        this.options = {
            wrapClassName: size ? 'modal-' + size : '',
            content: ModelFormComponent,
            footer: false,
            componentParams: {
                name: 'From Parent Data'
            }
        };
        this.modal.open(this.options).subscribe(result => {
            // this.msg.info(`subscribe status: ${JSON.stringify(result)}`);
        });
    }

    cancel = function () {
        this.message.info('已经取消删除');
      };

      confirm = () => {
        this.message.info('删除成功');
      }


      @Input() treeData = [];

  @Input() config: { hasCheck: boolean, children: string, textField: string, valueField: string, isEdit: boolean };

  @Output() onEdit = new EventEmitter();
      itemExpended(item) {
        item.$$isExpend = !item.$$isExpend;
        if (!this.isLeaf(item)) {
          return item[this.config.children].forEach(e => this.itemExpended(e));
        }
      }
    
      getItemIcon(item) {
        if (this.isLeaf(item)) {
          return 'fa fa-leaf';
        }
        return item.$$isExpend ? 'fa fa-minus' : 'fa fa-plus';
      }
    
      isLeaf = function (item) {
        return !item[this.config.children] || !item[this.config.children].length;
      };
    
      checkedChildren(item) {
        if (!this.isLeaf(item)) {
          return item[this.config.children].forEach(e => {
            e.$$isExpend = item.$$isExpend;
            if (!this.isLeaf(e)) {
              return this.checkedChildren(e);
            }
          });
        }
      }
    
      edit({action, item}) {
        this.onEdit.emit({action: action, item: item});
      }
    
      stopEvent(event) {
        event.stopPropagation();
      }
    

}
