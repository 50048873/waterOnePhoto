
### 升级说明

前端框架升级至v1.1.1

* 实现前后端分离开发.


### 注意事项.
1.  在页面中调用后台接口时， 使用 DSE.serverPath获取接口根路径/
```javascript

var fullUrl=DSE.serverPath+"/**/**.do";

$.ajax({
url:fullUrl
})

```

###  升级示例

此处以这个模块为例：<br>
pages\app\basic\program\alarmHistoryManage\theme1\index.html
<br>

1. 将css文件放置到.html 文件中引用.<br>

2.重构页面代码.


### 改进建议..

* config中的 gis-config会覆盖项目中的gis-config.js，此处不妥.
* 