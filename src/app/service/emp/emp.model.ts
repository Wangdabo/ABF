export class EmpModule {
    // 当前页数
    public pi = 1;
    // 每业个数
    public size = 10;
    // 员工id
    public  guid: string;
    // 员工姓名
    public empName: string;
    // 员工全名
    public empRealname: string;
    // 员工代码
    public empCode: string;
    // 员工编号
    public numbering: string;
    // 性别
    public gender: null;
    // 员工状态
    public empType: null;
    // 员工职级
    public emprank: null;
    // 基本岗位
    public guidPosition: null;
    // 直接主管
    public guidEmpMajor: null;
    // 主机构
    public organization: null;


    // 机构guid
    public guidOrg: string;

    // 入职日期
    public  indate: any;
    // 离职日期
    public  outdate: any;

    // 其他信息
    // 证件类型
    public  paperType: any;
    // 证件号码
    public paperNo: number;
    // 出生日期
    public birthDate: string;
    // 家庭电话
    public  htel: number;
    // 家庭地址
    public haddress: string;

    // 家庭邮编
    public hzipCode: number;

    // 手机号码
    public  mobileNo: number;

    // 备注
    public  remark: string;
    // 操作员编号
    public guidOperator: string;
    // 操作员登陆用户名
    public userId: string;

    // 操作员类型
    public  radioValue: string;
}

