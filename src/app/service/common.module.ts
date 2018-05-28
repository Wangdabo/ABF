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
    public  isCheck: any;

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
