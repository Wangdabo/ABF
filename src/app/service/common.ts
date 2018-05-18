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
        sysConfigAdd: '/sysConfigs/add', // 新增系统参数
        sysConfigsList: '/sysConfigs/list', // 查询系统参数
        sysConFigs: '/sysConfigs', // 修改系统参数
        sysConfigsDel: '/sysConfigs', // 删除系统参数

        // 业务字典
        sysDictList: '/sysDicts/list', // 查询所有业务字典
        sysDictLists: '/sysDicts/lists', // dictKey和dictName查询
        sysDictAdd: '/sysDicts/add', // 新增业务字典
        sysDictEdit: '/sysDicts', // 修改业务字典,传guid
        sysDictDel: '/sysDicts',  // 删除业务字典，传对应guid
        sysDictqeury: '/sysDicts',  // 查询对应业务字典，传对应guid

    }
}


