/**
 * @description 前端及GIS框架优化模块. 需要合并的js文件名需要以 *index.js 结尾,例如 mainindex.hs ,index.js等。
 * @version 1.1.0
 * @author wangsl
 * */
var path = require("path");
var fs = require("fs");
var configData = require("./package.json");

var fileUtils = require("./build/fileUtils");
//


//copy files.

var target = path.join(process.cwd(), "/dist");
var assetsFiles = path.join(process.cwd(), "/assets");
var configFiles = path.join(process.cwd(), "/config");
//

// var current = process.cwd();
//
fileUtils.createDirectory("/dist");
// fileUtils.createDirectory("/dist/node_modules");
//
// var files = fileUtils.getCopyFiles(configData);
// //
// files.forEach(function (directory, index) {
//     //
//     var sources = path.join(current, directory);
//     var targets = path.join(target, directory);
//     fileUtils.copyFileOrDirectory(sources, targets);
// });
//
fileUtils.copyFileOrDirectory(assetsFiles, target + "/assets");
fileUtils.copyFileOrDirectory(configFiles, target + "/config");

var buildConfig = {
    //
    appDir: "./pages",
    baseUrl: ".",
    dir: "./dist/pages",
    optimize: "uglify2",
    optimizeCss: "standard.keepLines.keepWhitespace",
    throwWhen: {optimize: false},

    locale: "en-us",
    // has.js is equivalent, but doesn"t seem to work
    // during RequireJS Optimizer build process
    has: {
        "config-selectorEngine": "acme",
        "dojo-trace-api": 0,
        "dojo-log-api": 0,
        "dojo-publish-privates": 0,
        "dojo-sync-loader": 0,
        "dojo-xhr-factory": 0,
        "dojo-test-sniff": 0,
        "dom": 1,
        "extend-esri": 0,
        "dojo-has-api": 1,
        "dojo-undef-api": 0
    },
    inlineText: true,
    map: {
        "*": {
            "css": "../node_modules/require-css/css.min"
        }
    },
    paths: {
        "moment/templates": "empty:",
        "dgrid": "empty:",
        "xstyle": "empty:",
        "esri/moment": "empty:",
        "esri/layers/GraphicsLayer": "empty:",
        "dgrid1/demos": "empty:",
        // becasue css selector engine is dynamically loaded
        "dojo/query": "empty:",
        // because this dynamically loads a renderer
        "dojox/gfx": "empty:",
        // only needed to get build working
        "dojo/i18n": "../node_modules/arcgis_js_api/i18n/i18n",
        "dojo/text": "../node_modules/arcgis_js_api/text/text",
        "dojo/domReady": "../node_modules/arcgis_js_api/domReady/domReady",
        popupLayer: "../node_modules/dse-layerui/layer/layer",
        //自定义GIS框架库
        dsegis: "../node_modules/gisframework-arcgis",
        config: "../config",
        "esri": "../node_modules/arcgis_js_api/esri",
        "dojo": "../node_modules/arcgis_js_api/dojo",
        "dijit": "../node_modules/arcgis_js_api/dijit",
        "moment": "../node_modules/arcgis_js_api/moment",
        "dojox": "../node_modules/arcgis_js_api/dojox",

        text: "../node_modules/arcgis_js_api/text/text",

        util: "../node_modules/arcgis_js_api/util",
        dgrid1: "../node_modules/arcgis_js_api/dgrid1",
        dstore: "../node_modules/arcgis_js_api/dstore",
        putSelector: "../node_modules/arcgis_js_api/put-selector",

        /**
         * @description 前端框架.
         * */

        // "css": "../node_modules/dse-amd/css/css.min",
        "autocomplete": "../node_modules/dse-plugins/autocomplete/js/jquery.autocomplete.min", // jquery 自动提示插件
        "bootstrap": "../node_modules/dse-styles/bootstrap/js/bootstrap.min", // bootstrap
        "browserdetect": "../node_modules/dse-hack/browserdetect", //浏览器版本检测

        "date": "../node_modules/dse-plugins/datetime/date", //日期计算
        "date97": "../node_modules/dse-plugins/datetime/my97datepicker/WdatePicker", //97date
        "drag": "../node_modules/dse-plugins/drag/draggabilly/draggabilly.pkgd.min", //drag 拖拽插件

        //easyui
        "easyui": "../node_modules/dse-easyui/locale/easyui-lang-zh_CN",
        "easyui_min": "../node_modules/dse-easyui/jquery.easyui.min",
        "easyui_valid": "../node_modules/dse-easyui/plugins/jquery.validtor.rules",

        //dseCharts
        "echarts3": "../node_modules/dse-charts/echarts/src/echarts.min", //echarts3.0
        "echarts2": "../node_modules/dse-charts/echarts/src/echarts2.0/echarts2", //echarts2.0

        //dseUpload
        "fileToUpload": "../node_modules/dse-upload/fileToUpload/js/fileToUpload", //jquery 上传插件
        "fileStyle": "../node_modules/dse-upload/fileToUpload/fileUpload1/js/fileStyle", //公用上传业务
        "fileToUpload2": "../node_modules/dse-upload/fileToUpload/js/fileToUpload2", //jquery 上传插件
        "fileStyle2": "../node_modules/dse-upload/fileToUpload/fileUpload2/js/fileStyle", //公用上传业务


        //dseCanvas
        "html2canvas": "../node_modules/dse-canvas/html2canvas/html2canvasSvg.min", //svg 转 canvas
        //dseIcheck
        "icheck": "../node_modules/dse-icheck/icheck.min", //checkbox美化插件
        //jquery.
        "jquery": "../node_modules/jquery/dist/jquery.min", // jquery 1.9.1
        //dseEditor
        "kindeditor": "../node_modules/dse-editor/kindeditor/kindeditor-all-min", //在线编辑器
        //dseLayerUi
        "popup": "../node_modules/dse-layerui/layer", //layer 弹窗
        // "layer": "../node_modules/dse-layerui/layer/layer", //layer 弹窗
        "laypage": "../node_modules/dse-layerui/laypage/laypage", //laypage 分页插件
        "laytpl": "../node_modules/dse-layerui/laytpl/laytpl", //laytpl 模板引擎
        "lodash": "../node_modules/dse-lodash/lodash.min", //lodash 工具库
        //dseSecurity
        "md5": "../node_modules/dse-security/security/md5.min", //md5 加密
        "sha1": "../node_modules/dse-security/security/sha1.min",//sha1 加密
        //dsePlugins
        "nicescroll": "../node_modules/dse-plugins/scroll/nicescroll/jquery.nicescroll.min", //滚动条美化
        "range": "../node_modules/dse-plugins/range/jquery-range/js/jquery.range.min", //range 范围选择插件
        "stickup": "../node_modules/dse-plugins/stickup/stickUp.min", //页面滚动元素固定
        "superslide": "../node_modules/dse-plugins/tab/superslide/jquery.superslide.min", //superslide 特效插件
        "tab3": "../node_modules/dse-plugins/tab/tab3/js/jquery.tab3", //简单的tab切换插件
        "tooltip": "../node_modules/dse-plugins/tooltips/jquery.tooltip", //jquery tooltips 提示插件
        "vform": "../node_modules/dse-plugins/valid/vform/js/jquery.vform", //表单验证
        "keypress": "../node_modules/dse-plugins/keypress/js/keymaster.min", //js 键盘事件
        "jquery_form": "../node_modules/dse-plugins/valid/jqform/jquery.form.min",
        "jqprint": "../node_modules/dse-plugins/print/jquery.jqprint.min", //jquery 打印插件
        //dseMedia
        "video": "../node_modules/dse-media/video/js/video", //jquery 视频播放器
        "videojs_ie8": "../node_modules/dse-media/video/js/videojs-ie8.min", //video ie8 兼容
        "viewer": "../node_modules/dse-media/viewer/js/viewer.min", //jquery 图片查看器
        "jspdf": "../node_modules/dse-media/jspdf/js/jquery.media.min", //jquery 在线预览pdf
        //dseVue
        "vue": "../node_modules/dse-vue/vue.min", // MVVM 框架 vuejs
        "ELEMENT": "../node_modules/dse-vue/element-ui/lib/index", //ElementUI, ELEMENT 必须大写，否则调用不到
        "vue_router": "../node_modules/dse-vue/vue-router.min", //vue-router

        //babel ..
        /**加载es6模块.*/
        es6: '../node_modules/dse-amd/babel/es6',
        babel: '../node_modules/dse-amd/babel/babel.min',
        //dseTree
        "ztree": "../node_modules/dse-tree/ztree/js/jquery.ztree.all.min", //ztree
        "d3charts": "../node_modules/dse-charts/d3charts/d3/d3.min",//引入d3绘图库
        /**注册重构后的前端框架.*/
        dseFramework: "../node_modules/dse-framework",
        // dseFramework: DSE.baseUrl + "/dseframework",//"node_modules/dse-framework",
        //兼容旧版本.
        stylePage: "./app/common/js/stylePage", //单表操作通用脚本
        custom: "./app/gisdemos/arcgis",
        //项目通用参数通用文件配置.
        "oper_config": "./app/common/js/oper-config", //前端一些参数配置文件
        "eform": "../node_modules/dse-framework/utils/polyfills/dseForm",
        //"assets/util/easyui.dseForm", //表单业务通用脚本
        "base": "../node_modules/dse-framework/core/base",
        //用于加载公共 css 和 js
        // "common": DSE.baseUrl+ "assets/util/common", //基础 js 脚本，所有页面都要加载
        "common": "../node_modules/dse-framework/utils/polyfills/common", //基础 js 脚本，所有页面都要加载
        "vue_component": "./app/components/vueComponent", //Vue + elementUI 组件通用配置
        "datagrid_pager": "./app/common/js/datagridPager", //datagrid 分页

        // 自定义代码, 放到自定义框架中.
        "vue_form": "../node_modules/dse-framework/widgets-vue/form/js/index", //vue 实现的 form 表单组件

        "vue_table": "../node_modules/dse-framework/widgets-vue/table/js/index", //vue table

    }
    // fileExclusionRegExp: /test|tests|min|src/gi

};


/**
 * @description 获取优化模块. 默认匹配以 *main.js 结尾的文件为主文件.
 *
 * @author wangsl
 * @version 1.1.0
 * */
function addOptModuleToBuildConfig(directory, isFirstCall) {
    // 当前文件为文件夹时
    var fullDir = isFirstCall ? path.join(process.cwd(), directory) : directory;
    //
    if (fs.statSync(fullDir).isDirectory()) {
        // debugger;
        var files = fs.readdirSync(fullDir);
        var len = files.length;
        if (len > 0) {

            files.forEach(function (file) {
                //
                var url = fullDir + "\\" + file;
                if (fs.statSync(url).isDirectory()) {
                    addOptModuleToBuildConfig(url, false);
                } else {
                    addModuleToOpt(url);
                }
            });
        }
    } else {
        //设置优化模块
        addModuleToOpt(fullDir);
    }
}

/**
 * @description 添加需要优化的模块.
 * @param {String} directory
 * */
function addModuleToOpt(directory) {
    if (/index\.js$/.test(directory)) {
        //
        //
        var appIndex = directory.lastIndexOf("pages");
        //
        var moduleUrl = directory.substring(appIndex+6, directory.length - 3).replace(/(\\)/gi, "\/");
        console.log(moduleUrl);

        buildConfig.modules.push({
            //
            name: moduleUrl
        });
    }
}

//
buildConfig.modules = [];
//
addOptModuleToBuildConfig(buildConfig.appDir, true);

var content = "(" + JSON.stringify(buildConfig) + ");";
//
var savePath = path.join(process.cwd(), "/build.js");
fs.writeFile(savePath, content, function (error, content) {
    //
    if (error) {
        //
        console.log(error.message);
        return;
    }
    //
    // console.log(content);
});