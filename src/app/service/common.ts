export let appConfig = {
    ABFUrl: 'http://localhost:3000', // 根路径地址
    RootUrl: 'http://localhost:30001', // 其他地址
    testUrl: 'http://106.15.103.14:18080',

    // 所有接口名
    API: {
        treeData: 'treeData',
        listData: 'listData',
        orgTreeData: 'orgTreeData',
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

        // 功能管理
        funcList: '/acFunc/list', // 查询功能列表
        funcAdd: '/acFunc', // 新增功能接口
        funcDel: '/acFunc/' , // 删除功能接口(deleat), 修改功能接口(put), 查看功能详情(get)
        openFun: '/acFunc/oepnFunc', // 启用功能
        closeFun: '/acFunc/closeunc', // 启用功能

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

        // 序号资源
        seqResource: '/sysSeqno/list', // 查询序号资源数据
        seqResourcedel: '/sysSeqno', // 删除序号资源数据
        seqResourceadd: '/sysSeqno', // 增加序号资源数据

        // 日志管理
        logList: '/logOperate/list', // 查询所有日志
        logDetail: '/logOperate', // 查询日志详情
        logData: '/logData', // 查询日志操作记录
        logChange: '/logChange',

        // 菜单管理
        acMenuList: '/acMenus/queryPageAllList', // 查询所有
        acMenuListByAppcode: '/queryAcMenuLists/', // 根据应用ID 查询菜单
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
            {text: '总行', key: '0'},
            {text: '分行', key: '1'},
            {text: '海外', key: '2'},
            {text: '区域分行', key: '3'},
            {text: '网点', key: '4'}
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
        ]
    }
}


