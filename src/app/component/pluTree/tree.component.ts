import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-plugins-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent {

  @Input() treeData = [];

  @Input() config: { hasCheck: boolean, children: string, textField: string, valueField: string, isEdit: boolean };

  @Output() onEdit = new EventEmitter();



  constructor() {
  }

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
