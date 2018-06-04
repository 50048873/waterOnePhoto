/**
 * @description 打包工具默认压缩合并以 index.js|index.ts,main.js |main.ts 结尾的文件, 如果需要合并其他名称的文件，请在这个项目中配置.
 *
 * @author wangsl
 * @version 1.1.1
 * */

module.exports.entryPoints = {
    //
    "typescript/main": './src/typescript/main.ts',
    "typescript/en": "./src/typescript/en.ts",
    "typescript/map": "./src/typescript/map.ts",
    "typescript/test": "./src/typescript/test.ts"
};

module.exports.mainPages = [
    // {
    //     template: "./src/views/testindex.html",
    //     filename: "gisindex.html",
    //     title: "tests,hi",
    //     chunks: ["typescript/main"]
    // },
    // {
    //     template: "./src/views/testindex.html",
    //     filename: "qshindex.html",
    //     title: "testshuohuohouo.i",
    //     chunks: ["typescript/en"]
    // },
    // {
    //     template: "./src/views/testindex.html",
    //     filename: "es6index.html",
    //     title: "buovuoo.i",
    //     chunks: ["es6/main"]
    // }
];

//跨域服务器配置.
module.exports.crossServers = {
    //
    // "/arcgis_js_api/": "http://10.100.9.213:8096",
    "/common-biz/": "http://10.100.9.52:8086"
};
//设置端口 默认为8080
module.exports.PORT = "8080";
//设置IP地址. 默认为 localhost
module.exports.ADDRESS = "localhost";
