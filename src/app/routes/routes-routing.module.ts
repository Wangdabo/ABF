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
import { OperatorsComponent } from './application/operators/operators.component';
import { RoleComponent } from './application/role/role.component';
import { MenuComponent } from './application/menu/menu.component';

// 组织机构管理
import { OrgComponent } from './organization/org/org.component';
import { EmpComponent } from './organization/emp/emp.component';

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


const routes: Routes = [
    {
        path: '',
        component: LayoutDefaultComponent,
        children: [
            { path: '', redirectTo: 'dashboard/v1', pathMatch: 'full' },
            { path: 'dashboard', redirectTo: 'dashboard/v1', pathMatch: 'full' },
            { path: 'dashboard/v1', component: DashboardV1Component, data: { translate: 'dashboard_v1' } },
            // 应用
            { path: 'role', component: RoleComponent },
            { path: 'menu', component: MenuComponent },
            { path: 'APPlication', component: ApplicationComponent },
            { path: 'operator', component: OperatorsComponent },
            // 组织机构
            { path: 'org', component: OrgComponent },
            { path: 'emp', component: EmpComponent },

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
