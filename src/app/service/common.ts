export let appConfig = {
    ABFUrl: 'http://localhost:3000', // 根路径地址
    RootUrl: 'http://localhost:30001', // 其他地址
    testUrl: 'http://106.15.103.14:18080',

    // 所有接口名
    API: {
        treeData: 'treeData',
        listData: 'listData',
        roleData: 'roleData',
        roleList: 'roleList', // 新增的成员列表
        orgTreeData: 'orgTreeData',
        jurisdictionTree:'jurisdictionTree',// 角色功能权限树
        // 系统运行参数
        sysConfigAdd: '/sysConfigs', // 新增系统参数
        sysConfigsList: '/sysConfigs/list', // 查询系统参数
        sysConFigs: '/sysConfigs', // 修改系统参数
        sysConfigsDel: '/sysConfigs', // 删除系统参数

        // 业务字典
        sysDictList: '/sysDicts/list', // 查询所有业务字典
        sysDictLists: '/sysDicts/lists', // dictKey和dictName查询
        sysDictAdd: '/sysDicts', // 新增业务字典
        sysDictEdit: '/sysDicts', // 修改业务字典,传guid
        sysDictDel: '/sysDicts',  // 删除业务字典，传对应guid
        sysDictqeury: '/sysDicts',  // 查询对应业务字典，传对应guid
        sysDictsTree: '/sysDicts/tree', // 查询业务字典树 传guid

        // 业务字典项
        sysDictItems: '/sysDictItems', // 新增业务字典项, 修改业务字典使用put,
        sysDictItemsList: '/sysDictItems/list', // 查询所有业务字典项
        listDict: '/sysDictItems/listDict', // 根据guid查询业务字典项
        sysDicttems: '/sysDictItems', // 删除业务字典项,

        // 应用管理
        acappAdd: '/acApp', //  新增应用接口
        appList: '/acApp/list', // 查询应用列表
        openApp: '/acApp/openApp', // 开启应用 传对应guid
        stopApp: '/acApp/stopApp', // 关闭应用 传对应guid
        appDed: '/acApp', // 查询/修改/删除 应用详情 传对应guid
        queryAll: '/acApp/queryAll', // 查询所有应用
        batchQuery: '/acApp/batchQuery' , // 查询对应应用信息
        appListAll: '/acApp/queryAll', // 不分页查找所有应用

        // 功能管理
        funcList: '/acFunc/list', // 查询功能列表
        funcAdd: '/acFunc', // 新增功能接口
        funcDel: '/acFunc/' , // 删除功能接口(deleat), 修改功能接口(put), 查看功能详情(get)
        openFun: '/acFunc/oepnFunc', // 启用功能
        closeFun: '/acFunc/closeunc', // 启用功能
        funcListAll: '/acFunc/queryAll', // 不分页查找所有功能

        // 行为管理
        acFuncAttr: '/acFuncAttr', // 新增功能接口
        acFuncList: '/acFuncAttr/list', // 查询行为接口
        acFuncDel: '/acFuncAttr/' , // 删除行为接口(deleat)
        acFuncPut: '/acFuncAttr/' , // 修改行为接口(d,eleat)
        acFunLists: '/acFuncAttr/detailList', //  查询行为详情

        // 操作员管理
        acOperatorsList: '/acOperators/list', // 查询操作员列表
        acOperatorsAdd: '/acOperators', // 增删改操作员列表
        acOperatorsDel: '/acOperators', // 增删改操作员列表
        queryAllOperator: '/acOperators/queryAllOperator', // 查询所有操作员不分页
        changeStatus: '/acOperators/changeStatus', // 改变操作员状态


        // 序号资源
        seqResource: '/sysSeqno/list', // 查询序号资源数据
        seqResourcedel: '/sysSeqno', // 删除序号资源数据
        seqResourceadd: '/sysSeqno', // 增加序号资源数据
        seqResourceUpdate: '/sysSeqno', // 修改资源
        restSeqResource: '/sysSeqno/resetSeq/', // 重置序号资源

        // 日志管理
        logList: '/logOperate/list', // 查询所有日志
        logDetail: '/logOperate', // 查询日志详情
        logData: '/logData', // 查询日志操作记录
        logChange: '/logData/list',
        logChanges: '/logChange', //  查看对象差异值

        // 菜单管理
        acMenuList: '/acMenus/queryPageAllList', // 查询所有
        acMenuListByAppcode: '/acMenus/queryAcMenuLists/', // 根据应用ID 查询菜单
        acMenuAddChild: '/acMenus/addSubAcmenu/', // 增加子菜单
        acMenuQueryByFather: '/acMenus/querySubAcMenuLists/', // 根据上一级查找下一级菜单
        acMenuDeletByid: '/acMenus/deleteAcMenu/', // 根据ID删除菜单
        acMenuUpdate: '/acMenus/updateAcMenu/', // 修改菜单
        acMenuMove: '/acMenus/queryMoveMenuLists', // 菜单移动

        // 组织机构
        omgTree: '/omOrg/tree', // 查询组织机构树
        omg: '/omOrg', // 删除组织机构、查询组织机构信息
        stopStatus: '/omOrg/stopStatus', // 停用状态
        cancelStatus: '/omOrg/cancelStatus', // 关闭状态
        runningStatus: '/omOrg/runningStatus', // 运行状态
        addChild: '/omOrg/addChild', //  添加子节点
        addRoot: '/omOrg/addRoot', //  添加父节点
        orgQueryAll: '/omOrg/queryAll', // 查询所有机构

        // 机构员工管理
        emporgAdd: '/omEmployee', // 新增,修改员工,删除员工
        onJob: '/omEmployee/onJob', // 入职
        outJob: '/omEmployee/outJob', // 离职
        queryorgList: '/omEmployee/queryEmpByOrg', // 根据组织机构查询员工
        queryByOrgPosition: '/omEmployee/queryByOrgPosition',  // 查询岗位下分配的员工
        listsByOrg: '/omEmployee/listsByOrg', // 根据机构guid查询所有员工
        changeOnJob: '/omEmployee/changeOnJob', // 修改员工入职


        // 岗位管理
        postChild: '/omPosition/addChild', // 新增子岗位
        postRoot: '/omPosition/addRoot', // 新增父岗位
        postList: '/omPosition/list', // 查询所有岗位
        postorgEmp: '/omPosition/listsByOrgId', // 查询同属机构所有岗位
        posttreeList: '/omPosition/treeByOrgId', // 查询组织机构下岗位
        allpostList: '/omPosition/allPositionList', // 查询所有岗位
        postDel: '/omPosition', // 删除岗位、修改岗位
        running: '/omPosition/runningStatus', // 启用岗位
        cancel: '/omPosition/cancelStatus', // 注销岗位
        setDate: '/omPosition/setDate', // 设置岗位有效时间
        empAdd: '/omEmpPosition', // 给岗位添加员工
        postDelemp: '/omEmpPosition/delete', // 给岗位删除员工
        addByList: '/omPositionApp/addByList', // 给岗位添加应用
        appDelpost: '/omPositionApp/delete', // 给岗位删除应用
        listByPosition: '/omPositionApp/listByPosition',  // 根据岗位查询所有应用
        appNoth: '/omPositionApp/appNotInPosition', // 查询不在岗位下所有应用

        // 工作组接口
        groupChild: '/omGroups/child', // 新增子工作组
        groupRoot: '/omGroups/root', // 新增跟工作组
        empGroup: '/omGroups/empGroup', // 工作组添加员工
        empNotin: '/omGroups/empNotin', // 加载omGroups不在此工作组的人员列表(同属同一机构)
        omGroups: '/omGroups', // 修改、删除工作组
        groupApp: '/omGroups/app', // 给工作组添加应用
        groupPosition: '/omGroups/position', // 给工作组添加岗位

        //角色组接口
        roleAdd:''//新增角色成员
    },


    // 枚举值
    Enumeration: {
        // 字典项枚举值
        fromType: [
            {text: '字典项', key: '0'},
            {text: '来自单表', key: '1'},
            {text: '多表或视图', key: '2'}
        ],

        // 系统类型
        systemType: [
            {text: '应用级', key: 'a'},
            {text: '系统级', key: 's'}
        ],

        // 工作组类型
        groupType: [
            {text: '普通工作组', key: 'normal'},
            {text: '项目型', key: 'project'},
            {text: '事务型', key: 'affair'},
        ],
        // 工作组状态
        groupStatus: [
            {text: '正常', key: 'running'},
            {text: '注销', key: 'cancel'}
        ],

        // 是否
        dictYon: [
            {text: '是', key: 'Y'},
            {text: '否', key: 'N'}
        ],
        // 机构类型
        orgType: [
            {text: '总公司', key: '10'},
            {text: '总部部门', key: '11'},
            {text: '分公司', key: '20'},
            {text: '分公司部门', key: '21'},
            {text: '营业网点', key: '90'}
        ],
        // 机构等级
        orgDegree: [
            {text: '总行', key: 'BS'},
            {text: '分行', key: 'YF'},
            {text: '海外', key: 'HW'},
            {text: '区域分行', key: 'QY'},
            {text: '网点', key: 'CN'}
        ],
        // 机构状态
        orgStatus: [
            {text: '正常', key: 'running'},
            {text: '注销', key: 'cancel'},
            {text: '停用', key: 'stop'},
        ],
        // 所属地域
        area: [
            {text: '北京地区', key: '010'},
            {text: '上海地区', key: '021'},
        ],

        // 员工状态
        empType: [
            {key: 'onjob' , value: '在职'},
            {key: 'offjob' , value: '离职'},
            {key: 'offer' , value: '在招'},
        ],

        // 性别
        gender: [
            {key: 'M' , value: '男'},
            {key: 'F' , value: '女'},
            {key: 'U' , value: '未知'},
        ],

        // 证件类型
        paperType : [
            { value: '身份证', key: '01' },
            { value: '军官证', key: '03' },
            { value: '户口本', key: '02' },
            { value: '学生证', key: '04' },
            { value: '护照', key: '05' },
            { value: '其他', key: '06' }
        ],


        // 岗位类别
        postType: [
            { value: '机构岗位', key: '01' },
            { value: '工作组岗位', key: '02' },
        ],

        // 岗位状态
        postStatus: [
            { value: '正常', key: 'running' },
            { value: '注销', key: 'cancel' },
        ]

    }
}


