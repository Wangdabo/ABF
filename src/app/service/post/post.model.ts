import * as moment from 'moment';
import _date = moment.unitOfTime._date;

export class PostModule {
    // 当前页数
    public pi: 1;
    // 每业个数
    public ps: 10;

    // 岗位代码
    public positionCode: string;

    // 岗位名称
    public positonName: string;

    // 岗位类型
    public positionType: any;

    // 岗位状态
    public positionStatus: any;

    // 是否叶子岗位
    public isLeaf: boolean;

    // 子节点数
    public subCount: number;

    // 岗位层次
    public positionLevel: number;

    // 岗位序列
    public positionSeq: number;

    // 父岗位guid
    public  guidParents: string;

    // 所属职务guid
    public  guidDuty: string;

    // 岗位有效开始时间
    public  startDate: string;

    // 岗位有效截止时间
    public endDate: string;
}
