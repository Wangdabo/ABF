import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ListComponent } from './list/list.component';
import { TreeAntdSearchableComponent } from './tree/searchable.component';
import { NzTreeModule } from 'ng-tree-antd';
import { DndModule } from 'ng2-dnd';

import { TreeComponent } from './pluTree/tree.component';

const COMPONENT_NOROUNT = [
    TreeAntdSearchableComponent
];

@NgModule({
  imports: [
    SharedModule,
    NzTreeModule,
    DndModule.forRoot()
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      ListComponent,
      TreeComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ComponentModule {

}
