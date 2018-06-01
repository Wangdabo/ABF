export class DictModule {
    // 当前页数
    public pi: 1;
    // 每业个数
    public size: 10;
    // 字典项来源类型
    public fromType: any;
    // 业务字典类型
    public dictType: null;

    // 业务字典
    public dictKey: string;
    // 字典名称
    public dictName: string;
    // 父字典
    public guidParents: null;
    // 顺序号
    public seqno: number;
    // 解释说明
    public dictDesc: string;

    // 字典项来源表
    public  fromTable: string;
    // 字典项来源列
    public  usefroKey: string;
    // 实际值
    public  defaultValue: string;
    // 记录过滤条件
    public  sqlFilter: string;
    // 筛选条件
    public conditions: null;
}
