import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';

// 首页
import { DashboardV1Component } from './index/v1/v1.component';

// 应用功能管理

import { ApplicationComponent } from './application/application/application.component';
import { FunctionComponent} from './application/function/function.component';

// 权限管理
import { RoleComponent } from './authority/role/role.component';
import { MenuComponent } from './application/menu/menu.component';
import { RoleMemberComponent } from './authority/role/role-member/role-member.component';
import { FuncperComponent } from './authority/role/funcper/funcper.component';
// 操作员管理
import { OperatorsComponent } from './authority/operators/operators.component';
import { OperatoroleComponent } from './authority/operators/operatorole/operatorole.component';
import { RoleFuncComponent } from './authority/operators/role-func/role-func.component';

// 组织机构管理
import { OrgComponent } from './organization/org/org.component';
import { EmpComponent } from './organization/emp/emp.component';
import { PostComponent } from './organization/post/post.component';

// 基础数据
import { DictComponent } from './basicData/dict/dict.component';
import { SystemComponent } from './basicData/system/system.component';
import { LogsComponent } from './basicData/logs/logs.component';
import {SeqresourceComponent} from './basicData/seqresource/seqresource.component';

// 用户登录引入
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';

// 异常页面
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';

// 代码生成组件
import {TableStandardComponent} from './codeGeneration/standard.component';
import {modelDetailComponent} from './codeGeneration/model-detail/modelDetail.component';
import {ModelCountComponent} from './codeGeneration/model-count/modelCount.component';
import {FormDetailComponent} from './codeGeneration/form-detail/formDetail.component';
import {TimelineComponent} from './basicData/timeline/timeline.component';
import {LogDataComponent} from './basicData/log-data/log-data.component';
import {GroupComponent} from './organization/group/group.component';
import {AuthorityComponent} from './organization/authority/authority.component';
import { EntityauthComponent } from './authority/role/entityauth/entityauth.component';
import { FieldperComponent } from './authority/role/fieldper/fieldper.component';
import { DataRangeComponent } from './authority/role/data-range/data-range.component';
import { DataNullComponent } from './authority/role/data-null/data-null.component';
import {GroupdetailComponent} from './organization/groupdetail/groupdetail.component';
import {GroupEmpComponent} from './organization/group/group-emp/group-emp.component';
import {GroupPostComponent} from './organization/group/group-post/group-post.component';
import { OperatorInfoComponent } from './authority/operators/operator-info/operator-info.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutDefaultComponent,
        children: [
            { path: '', redirectTo: 'dashboard/v1', pathMatch: 'full' },
            { path: 'dashboard', redirectTo: 'dashboard/v1', pathMatch: 'full' },
            { path: 'dashboard/v1', component: DashboardV1Component },
            // 角色
            { path: 'role', component: RoleComponent, children: [
                    {path: 'rolemember/:id', component: RoleMemberComponent, data: { i18n: 'rolemember' , title: '角色管理' } },
                    {path: 'funcper/:id', component: FuncperComponent, data: { i18n: 'funcper' , title: '角色管理' } },
                    {path: 'entity/:id', component: EntityauthComponent, data: { i18n: 'entity' , title: '角色管理' } },
                    {path: 'field/:id', component: FieldperComponent, data: { i18n: 'field' , title: '角色管理' } },
                    {path: 'datarang', component: DataRangeComponent, data: { i18n: 'datarang' , title: '角色管理' ,datamember:[]} },
                     {path: 'datanull', component: DataNullComponent, data: { i18n: 'datanull' , title: '角色管理' } },
                ]},
            { path: 'menu', component: MenuComponent },
            { path: 'APPlication', component: ApplicationComponent },
            { path: 'function', component: FunctionComponent, data: { i18n: 'function' , title: '应用功能' } },
            // 操作员路由
            { path: 'operator', component: OperatorsComponent},
            // 操作员详情路由
            { path: 'operatorInfo', component: OperatorInfoComponent, data: { i18n: 'operatorInfo' , title: '操作员详情' },  children: [
                {path: 'operatorrole/:id', component: OperatoroleComponent, data: { i18n: 'operatorrole' , title: '操作员管理' } },
                {path: 'operatfunc/:id', component: RoleFuncComponent, data: { i18n: 'operatfunc' , title: '操作员管理' } },
            ]},
            // 组织机构
            { path: 'org', component: OrgComponent, children: [
                    {path: 'emp/:id', component: EmpComponent, data: { i18n: 'emp' , title: '组织机构' } },
                    {path: 'post/:id', component: PostComponent, data: { i18n: 'post' , title: '组织机构' } },
                ]},
            // 工作组
            { path: 'workGroup', component: GroupComponent, children: [
                    {path: 'group/:id', component: GroupdetailComponent, data: { i18n: 'group' , title: '工作组' } },
                    {path: 'groupEmp/:id', component: GroupEmpComponent, data: { i18n: 'groupEmp' , title: '工作组' } },
                    {path: 'groupPost/:id', component: GroupPostComponent, data: { i18n: 'groupPost' , title: '工作组' } },
                    {path: 'authority/:id', component: AuthorityComponent, data: { i18n: 'post' , title: '工作组' } },
                ]},
            // 基本数据
            { path: 'business', component: DictComponent },
            { path: 'system', component: SystemComponent },
            { path: 'logs', component: LogsComponent },
            { path: 'seqresource', component: SeqresourceComponent },
            { path: 'Timeline', component: TimelineComponent, data: { i18n: 'Timeline' , title: '日志历史记录' }},
            { path: 'logData', component: LogDataComponent, data: { i18n: 'logData' , title: '日志详情' }},
            // 代码生成路由
            {path: 'standard', component: TableStandardComponent },
            {path:  'model-detail/modelDetail/:name', component: modelDetailComponent},
            {path:  'model-count/modelCount', component: ModelCountComponent},
            {path:  'form-detail/formDetail', component: FormDetailComponent},
        ]
    },
    // passport
    {
        path: 'passport',
        component: LayoutPassportComponent,
        children: [
            { path: 'login', component: UserLoginComponent },
            { path: 'register', component: UserRegisterComponent },
            { path: 'register-result', component: UserRegisterResultComponent }
        ]
    },
    // 单页不包裹Layout
    { path: '403', component: Exception403Component },
    // { path: '404', component: Exception404Component },
    { path: '500', component: Exception500Component },
    { path: '**', redirectTo: 'dashboard' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
    exports: [RouterModule]
  })
export class RouteRoutingModule { }
