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
import { FunctionComponent } from './application/function/function.component';


// 权限管理
import { RoleComponent } from './authority/role/role.component';
import { MenuComponent } from './application/menu/menu.component';
// 操作员角色界面
import { OperatorsComponent } from './authority/operators/operators.component';
import { OperatoroleComponent } from './authority/operators/operatorole/operatorole.component';
import { RoleFuncComponent } from './authority/operators/role-func/role-func.component';
import { OperatorInfoComponent } from './authority/operators/operator-info/operator-info.component';


// 组织机构
import { OrgComponent } from './organization/org/org.component';
import { EmpComponent } from './organization/emp/emp.component';
import { PostComponent } from './organization/post/post.component';
// 基础数据
import { DictComponent } from './basicData/dict/dict.component';
import { SystemComponent } from './basicData/system/system.component';

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
import { TreeDemoComponent} from '../component/tree/tree';
import { LogsComponent } from './basicData/logs/logs.component';
import { SeqresourceComponent } from './basicData/seqresource/seqresource.component';
import { TimelineComponent } from './basicData/timeline/timeline.component';
import { LogDataComponent } from './basicData/log-data/log-data.component';
import { GroupComponent } from './organization/group/group.component';
import { AuthorityComponent } from './organization/authority/authority.component';
import { RoleMemberComponent } from './authority/role/role-member/role-member.component';
import { FuncperComponent } from './authority/role/funcper/funcper.component';
import { EntityauthComponent } from './authority/role/entityauth/entityauth.component';
import { FieldperComponent } from './authority/role/fieldper/fieldper.component';
import { DataRangeComponent } from './authority/role/data-range/data-range.component';
import { DataNullComponent } from './authority/role/data-null/data-null.component';

import { GroupdetailComponent } from './organization/groupdetail/groupdetail.component';
import { GroupEmpComponent } from './organization/group/group-emp/group-emp.component';
import { GroupPostComponent } from './organization/group/group-post/group-post.component';




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
        FunctionComponent,
        OrgComponent,
        EmpComponent,
        PostComponent,
        RoleComponent,
        MenuComponent,
        DictComponent,
        // 系统参数组件
        SystemComponent,
        SeqresourceComponent,
        TimelineComponent,
        LogsComponent,
        // 工作组
        GroupComponent,
        AuthorityComponent,
        LogDataComponent,
        RoleMemberComponent,
        FuncperComponent,
        EntityauthComponent,
        FieldperComponent,
        DataRangeComponent,
        DataNullComponent,
        GroupdetailComponent,
        GroupEmpComponent,
        GroupPostComponent,
        // 操作员
        OperatorsComponent,
        OperatorInfoComponent,
        OperatoroleComponent,
        RoleFuncComponent,
        // 组件封装
        ListComponent,
        TreeDemoComponent,
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

export class RoutesModule {
    
}
