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
        acOperatorsAdd: '/acOperators/add', // 增删改操作员列表
        acOperatorsDel: '/acOperators', // 增删改操作员列表

        // 序号资源
        seqResource: '/sysSeqno/list', // 查询序号资源数据
        seqResourcedel: '/sysSeqno', // 删除序号资源数据
        seqResourceadd: '/sysSeqno', // 增加序号资源数据

        // 日志管理
        logList: '/logOperate/list', // 查询所有日志
        logDetail: '/logOperate', // 查询日志详情
        logData: '/logData', // 查询日志操作记录
    },

    // 枚举值
    Enumeration: {
        // 字典项枚举值
        fromType: [
            { text: '字典项', key: '0' },
            { text: '来自单表', key: '1' },
            { text: '多表或视图', key: '2' }
        ],

        // 系统类型
        systemType: [
            { text: '应用级', key: 'a' },
            { text: '系统级',  key: 's' }
        ]
    }
}


