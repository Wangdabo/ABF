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
    public  operatorType: null;
    // 操作时间
    public  operatorTime: string;
    // 操作结果
    public operatorResult: string;
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
    public  restfulRul: string;
    // 异常堆栈
    public  stacktRace: string;
    // 处理描述
    public  procssdesc: string;


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
