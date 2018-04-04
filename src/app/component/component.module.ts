import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ListComponent } from './list/list.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      ListComponent,
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ComponentModule { }
