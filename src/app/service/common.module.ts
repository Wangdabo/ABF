export class PageModule {
    // 当前页数
    public pi: number = 1;
    // 每业个数
    public size: number = 10;
}

export class AppliaModule {
    // 当前页数
    public pi: number = 1;
    // 每业个数
    public size: number = 10;

    // 应用代码
    public appCode: number;

    // 应用名称
    public appName: string;

    // 应用类型
    public appType: string;

    // 是否开通
    public isOpen: any;

    // 开通时间
    public openDate: string;

    // 访问地址
    public  url: string;

    // Ip
    public  ipAddr: string;

    // 端口
    public ipPort: string;

    // 应用描述
    public appDesc: string;


}

// 功能module
export class FuncModule {
    // 当前页数
    public pi: number = 1;
    // 每业个数
    public size: number = 10;

    // 隶属应用
    public guidApp: string;

    // 功能类型
    public funcType: any;

    // 功能编号
    public funcCode: string;

    // 功能名称
    public funcName: string;

    // 功能描述
    public  funcDesc: string;

    // 是否启用
    public isopen: any;

    // 是否验证权限
    public  ischeck: any;

    // 父功能
    public  guidFunc: string;

    // 显示顺序
    public  displayOrder: number;
}


export class FuncattrModule {
    // 当前页数
    public pi: number = 1;
    // 每业个数
    public size: number = 10;
    // 对应功能
    public  guidFunc: string;
    // 属性类型
    public  attrType: any;
    // 属性名
    public attrKey: string;
    // 属性值
    public  attrValue: string;
    // 备注
    public  memo: string;


}

// 日志模块
export class LogsModule {
    // 当前页数
    public pi: number = 1;
    // 每业个数
    public size: number = 10;
    // 操作类型
    public  operateType: null;
    // 操作时间
    public  operateTime: string;
    // 操作结果
    public operateResult: string;
    // 操作渠道
    public operateFrom: string;
    // 操作员姓名
    public  operatorName: string;
    // 操作员
    public  userId: string;
    // 应用代码
    public  appCode: string;
    // 应用名称
    public  appName: string;
    // 功能编号
    public  funcCode: string;
    // 功能名称
    public  funcName: string;
    // 服务地址
    public  restfulUrl: string;
    // 异常堆栈
    public  stackTrace: string;
    // 处理描述
    public  procssDesc: string;
}

// 对象差异模块
export class LogcChangeModule {
    // 操作数据GUID
    public guidData: string;
    // 变化项字段名
    public physicalName: string;
    // 变化项逻辑名称
    public logicName: string;
    // 变化之前值
    public oldValue: string;
    // 变化之后值
    public newValue: string;
}

// 序号资源表模块
export class SequenceResModule {
    // 当前页数
    public pi: number;
    // 每页个数
    public size: number;
    // 序号资源表名称
    public seqName: string;
    // 序号键值
    public seqKey: string;
    // 序号数
    public seqNo: number;
    // 重置方式
    public reset: any;
    // 重置处理参数
    public resetParams: string;

}


// 工作组模块
export class GroupModule {
    // 工作组代码
    public groupCode: string;
    // 工作组名称
    public groupName: string;
    // 工作组类型
    public groupType: any;
    // 工作组状态
    public groupStatus: any;
    // 工作组描述
    public groupDesc: string;
    // 负责人
    public guidEmpManager: string;
    // 隶属机构
    public guidOrg: string;
    // 是否叶子节点
    public  isleaf: boolean;
    // 工作组有效开始日期
    public  startDate: boolean;
    // 工作组有效截止日期
    public  endDate: boolean;
    // 父工作组guid
    public  guidParents: boolean;
    // 测试gropuOrg代码 后台会改回guidOrg
    public  groupOrg: string;
    // guidName 后台会改回guidName
    public  guidName: string;
}

// 组织机构模块
export class OrgModule {
    // 机构代码
    public orgCode: string;
    // 机构名称
    public orgName: string;
    // 机构类型
    public orgType: any;
    // 机构等级
    public orgDegree: string;
    // 机构状态
    public orgStatus: any;
    // 父机构GUID
    public guidParents: string;
    // 机构地址
    public orgAddr: string;
    // 联系人姓名
    public  linkMan: string;
    // 联系电话
    public  linkTel: string;
    // 所属地域
    public  area: any;
    // 排列顺序编号
    public  sortNo: string;
    // 备注
    public remark: string;
}


// 菜单管理
export class AcMenuModule {
    // 当前页数
    public pi: number;
    // 每页个数
    public size: number;
    // 应用ID
    public guidApp: string;
    // 功能ID
    public guidFunc: string;
    // 菜单名称
    public menuName: string;
    // 菜单中文显示
    public menuLabel: string;
    // 菜单代码
    public menuCode: string;
    // 是否叶子菜单
    public isLeaf: boolean;
    // UI入口
    public uiEntry: string;
    // 菜单层次
    public menuLevel: number;
    // 父菜单的ID
    public guidParents: string;
    // 根菜单的ID
    public guidRoot: string;
    // 显示顺序
    public displayOrder: number;
    // 菜单闭合图片路径
    public imagePath: string;
    // 菜单展开图片路径
    public expandPath: string;
    // 菜单路径序列
    public menuSeq: string;
    // 页面打开方式
    public openMode: string;
    // guid
    public guid: string;
}


// 菜单管理
export class OperaRoleModule {
    // 当前页数
    public pi: number = 1;
    // 每业个数
    public size: number = 10;
    // 操作员姓名
    public operatorName: string;
    // 登陆密码
    public password: string;
    // 操作员id
    public userId: string;
    // 过期时间
    public invalDate: string;
    // 操作员状态
    public operatorStatus: any;
    // 认证模式
    public  authMode: null;
    // 锁定次数限制
    public lockLimit: number;
    // 当前错误次数
    public errCount: number;
    // 最近登陆时间
    public lastLogin: any;
    // 员工代码
    public empCode: string;
    // 员工状态
    public empStatus: string;
    // 隶属机构
    public guidOrg: string;
}
