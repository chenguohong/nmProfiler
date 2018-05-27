'use strict';
const co = require('co');
const path = require('path');
const rootPath = path.join(__dirname, './src_logic');
const _common = require(path.join(rootPath, 'common/common'));

module.exports = co.wrap(function* (options) {
    //合并用户参数
    options = options || process.title;

    //获取基础配置, pre 表示预先加载的文件，params 表示对应的参数
    const common = _common({ pre: ['config', 'logger', 'utils', 'cache'], param: { config: options } });
    //对 common 文件中需要进行初始化操作的文件进行对应的操作
    yield common.utils.commonInitP(common);

    //获取公共方法
    const _require = common.require;
    const config = common.config;

    const embrace = _require('embrace');
    //启动 embrace
    embrace.start(config, common);
    return;
});