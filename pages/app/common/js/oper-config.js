/**
 * 此方法用于在项目中添加全局变量
 * */

//相关配置参数
DSE.uploadConfig = {
    fileToUpload_actionUrl: 'uporDownLoadCtrl/upload.do', //上传请求
    fileToUpload_progressUrl: 'uporDownLoadCtrl/getUploadProgress.do?randomId=', //进度条轮询请求, randomId 为后台接收字段名
    fileToUpload_deleteUrl: 'uporDownLoadCtrl/deleteFileByPkid.do?pkid=', //文件删除请求, pkid 为后台接收字段名
    fileToUpload_FilesListUrl: 'uporDownLoadCtrl/getListFileByBid.do?bid=', //获取已上传文件列表，bid 为后台接收字段名
    fileToUpload_downloadUrl: 'uporDownLoadCtrl/download.do?id=', //上传成功后下载请求，id 为后台接收字段名
    fileToUpload_rename: {
        url: 'uporDownLoadCtrl/renameUpFileById.do', //上传文件重命名请求
        id: 'pkid', //pkid 为后台接收字段名
        name: 'rename' //rename 为后台接收字段名
    }
};

//存储业务类主键,全局参数
DSE.pageConfig = {};

//点击 document 时触发子函数方法
DSE.clickDocument = {};

//html 相关
DSE.html = {};

//存储表单相关函数变量
DSE.form = {};

//存储用户数据
DSE.user = {};
