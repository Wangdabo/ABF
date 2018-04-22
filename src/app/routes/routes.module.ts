import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';
import { NzTreeModule } from 'ng-tree-antd';

// 首页
import { DashboardV1Component } from './index/v1/v1.component';


// 登录页
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';

// 异常页引用
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';

// 应用管理
import { ApplicationComponent } from './application/application/application.component';
import { OperatorsComponent } from './authority/operators/operators.component';

// 权限管理
import { RoleComponent } from './authority/role/role.component';
import { MenuComponent } from './application/menu/menu.component';

// 组织机构
import { OrgComponent } from './organization/org/org.component';
import { EmpComponent } from './organization/emp/emp.component';

// 基础数据
import { DictComponent } from './basicData/dict/dict.component';

// 代码生成模块
import { FormDetailComponent} from './codeGeneration/form-detail/formDetail.component';
import { ModelCountComponent } from './codeGeneration/model-count/modelCount.component';
import { modelDetailComponent } from './codeGeneration/model-detail/modelDetail.component';
import { NewAppComponent } from './codeGeneration/new-app/newApp.component';
import { TableStandardComponent } from './codeGeneration/standard.component';
import {ModelFormComponent} from './codeGeneration/form.component';
import {ModelCustomComponent} from './codeGeneration/custom.component';

// 公共封装组件
import { ListComponent } from '../component/list/list.component';
import { SystemComponent } from './basicData/system/system.component';
import { TreeComponent } from '../component/pluTree/tree.component';

// 服务
import { UtilityService } from '../service/utils.service';

@NgModule({
    imports: [ SharedModule, RouteRoutingModule, NzTreeModule ], // 模块把特性合并成离散单元的一种方式，当应用需要模块的特性时，将其添加到imports数组中，它告诉Angular应用需要它们来正常工作。
    declarations: [ // 声明当前module控制的组件，创建的指令和管道也要添加至declarations数组中
        DashboardV1Component,
        // 登录页
        UserLoginComponent,
        UserRegisterComponent,
        UserRegisterResultComponent,
        // single pages
        Exception403Component,
        Exception404Component,
        Exception500Component,
        // 业务需求页面 组织机构+应用管理
        ApplicationComponent,
        OrgComponent,
        EmpComponent,
        OperatorsComponent,
        RoleComponent,
        MenuComponent,
        DictComponent,
        // 系统参数组件
        SystemComponent,
        // 封装组件
        ListComponent,
        TreeComponent,
        // 代码生成组件
        FormDetailComponent,
        ModelCountComponent,
        modelDetailComponent,
        NewAppComponent,
        TableStandardComponent,
        ModelFormComponent,
        ModelCustomComponent
    ],
    entryComponents: [
        FormDetailComponent,
        ModelCountComponent,
        modelDetailComponent,
        NewAppComponent,
        TableStandardComponent,
        ModelFormComponent,
        ModelCustomComponent
    ],
    providers: [UtilityService], // 把服务加入到当前的模块,如果是跟模块,则可以应用于任何部分
})

export class RoutesModule {}
