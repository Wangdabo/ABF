export class OperatrModule {
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

}
