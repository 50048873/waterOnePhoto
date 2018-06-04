##前端框架说明
* 版本号 : 2.0.0
* 发布日期: 2018-04-20

### 新特性说明.
* 在这个版本中，在原来的框架中集成了webpack构建工具，进行前端代码的构建，目前在项目中有两种方式启动前端框架，默认为webpack构建工具，
在这个项目中，```JS代码可以采用 ES6或者Typescript``` 语言进行编写, CSS可以采用Less或者SASS进行编写.

* 跨域配置
```
打开 ./build/extconfig.js,在其中修改跨域配置.
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

```
1. webpack
默认采用webpack对前端框架进行构建.
```
安装依赖： npm install

启动项目: npm run dev 
打包项目: npm run build 

GIS打包: npm run gisbuild , 因为arcgis js api 目前对webpack集成不是太好，因此gis模块暂时不使用 webpack进行打包.
```


2. 兼容方式

 可以选择基于nginx作为前端服务器,主要执行如下操作.
```
安装依赖：  npm install server

启动项目: npm run startNginx
停止项目: npm run stopNginx
```

3. 开发注重事项.

*  因为项目在执行打包的时候，会对页面主文件进行合并，为了方便文件合并的顺利进行，在原来版（requirejs）本中约定如下:
<br>（1） 主文件必须以 index.js或者 testindex.js 结尾<br>
（2）所有amd模块定义必须遵循 amd 规范进行定义 定义模块使用: ```define```，引用模块使用 ```require```
<br>（3） 示例代码<br>
```javascript
    //定义模块.
    // 模块名称为 a .
    define(["jquery"],function($){
    //
       var mo={
           showInfo:function(msg){
               console.log(msg);
           }
       };
       //
       return mo;
    });

 // 引用模块.
 
 require(["a"],function(a){
     //
     a.showInfo("hao");
     
 });

// 在原来已经开发的页面中,由于主页面的定义方式是通过 define关键字定义的. 因此在打包时不会合并文件，
// 如果需要合并文件，则需要按照上述规则修改主文件调用方式.

```

* 在基于webpack的构建工具中不需要遵循上述规则 (2),(3)条.

4. 在框架中集成了webpack构建工具, 为了和旧版本进行区分,代码目录结构划分如下<br》

 src/ 源代码文件夹 <br>
 dist/项目打包后的代码目录<br>


5. 旧版本(requireJS)版本代码如下.

 assets/ 第三方库存放目录<br>
 config/ 配置文件路径<br>
 pages/  项目文件存放路径.<br>
 dist/ 项目打包后路径.


6. 公共资源文件.

node_modules/  依赖的第三方库文件夹. 不用修改。





