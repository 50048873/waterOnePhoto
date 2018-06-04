/**
 * datagrid通用查询方法
 * 此文件的方法已经会整合至dseframework/tasks/CommonTask.js中，保留此文件主要是为了兼容以前版本。
 *
 * 在新版本中建议使用dseframework/tasks/CommonTask.js
 * 此文件目前撤回2017-04-19 月份发布的版本，目前已经在深圳水工和广西防汛值班系统中使用。
 *
 * @since version 1.0.1
 * @author wangsl
 * @date 2017-09-07
 * */

/**
 * @description  添加通用表单额外参数
 * @param {String} dataGridId easyui datagrid id选择器，如：#datagrid
 * @param {String} keyId datagrid 行匹配关键字段, 如：ID
 *
 * @public
 * @author wangsl
 * @version 1.0.1
 * */
DSE.form.singleTableEvents = function (dataGridId, keyId) {
    return {
        width: '100%',
        singleSelect: true, //是否只能单选,默认否
        rownumbers: true, //显示序列号,默认不显示
        striped: true,
        pagination: true,
        onLoadSuccess: function (data) {
            // 没有数据时自动提示无数据
            // 不使用 DSE.form.MyDataGrid 而用 $(_datagrid) 是因为有少数情况会出现加载执行错误的问题
            DSE.form.doBatchDatagrid(dataGridId, DSE.app.batch, true);
            DSE.form.datagridLoadSuccess($(dataGridId));
        },
        onLoadError: function () {
            log('datagrid 渲染错误！');
        },
        onSelect: function () {
            DSE.form.dataRowID = DSE.form.getSelectId($(dataGridId), keyId);
        },
        onSelectAll: function () {
            DSE.form.dataRowID = DSE.form.getSelectId($(dataGridId), keyId);
        },
        onUnselect: function () {
            DSE.form.dataRowID = DSE.form.getSelectId($(dataGridId), keyId);
        },
        onUnselectAll: function () {
            DSE.form.dataRowID = DSE.form.getSelectId($(dataGridId), keyId);
        }
    };
};
/**
 * @description 批量操作切换序号和 checkbox 的显示隐藏
 * @param {String} dataGridId datagrid表单选择器,如 #datagrid
 * @param {Boolean} flag 是否显示 表单行的复选框.
 * @param {Boolean} isSuc datagrid表单数据是否加载成功.
 *
 * @public
 * @author wangsl
 * @version 1.0.1
 * */
DSE.form.doBatchDatagrid = function (dataGridId, flag, isSuc) {
    var info = $(dataGridId).data().datagrid,
        view = info.dc.view,
        view1 = info.dc.view1,
        view2 = info.dc.view2;
    if (!flag) {
        view1.show();
        view2.removeClass('showck');
        $(dataGridId).datagrid('hideColumn', 'ck');
    } else {
        view1.hide();
        view2.addClass('showck');
        $(dataGridId).datagrid('showColumn', 'ck');
    }
    $(dataGridId).datagrid('options').singleSelect = !flag;
    if (!isSuc) {
        $(dataGridId).datagrid('reload').datagrid('clearSelections');
    }
};
/**
 * @description 打开编辑或详情页面
 * @param {String} id 显示弹出框的行ID
 * @param {String} title 弹出框页面标题
 * @param {String} type 弹出框类型, 取值为: add,detail,edit
 * @param {String} url 弹出页面内容URL地址.
 *
 * @public
 * @author wangsl
 * @version 1.0.0
 * */
DSE.form.showEditOrDetail = function (id, title, type, url) {
    if (DSE.app) {
        DSE.pageConfig.rowId = id;
        DSE.pageConfig.operType = type;

        DSE.app.rowId = id;
        DSE.app.operType = type;
        DSE.app.title = title;
        DSE.app.url = url;
    }
};
/**
 * @description 执行查询
 * @author wangsl
 * @version 1.0.0
 * */
DSE.form.doSearch = function () {
    // 获取参数,easyui.dseForm.js里面的方法
    var _param = DSE.form.getAutoObject(DSE.form.sform),
        _data = null;
    if (DSE.app && DSE.app.addSearchParam) {
        //修改参数配置
        _param = DSE.app.addSearchParam(_param);
    }
    if (DSE.app && DSE.app.addSearchData) {
        //设置本地数据
        _data = DSE.app.addSearchData(_data);
    }
    //生成 datagrid
    DSE.form.initDatagrid(_param, _data);
    if (DSE.form.MyDataGrid) {
        DSE.form.MyDataGrid.datagrid('clearSelections');
    }
};
//
/**
 * @description 重新加载所有数据
 * @author wangsl
 * @version 1.0.0
 * */
DSE.form.reload = function () {
    DSE.form.doSearch();
};
/**
 * @description 重置
 *
 * @public
 * @author wangsl
 * @version 1.0.1
 * */
DSE.form.doReset = function () {
    //表单重置
    DSE.form.initSearch();
    // $('input[type="text"]').not('.textbox-text').val(''); //
    DSE.form.reload();
};
//
/**
 * @description 刷新表格
 *
 * @public
 * @author wangsl
 * @version 1.0.0
 * */
DSE.form.refreshDatagrid = function () {
    DSE.form.reload();
};
/**
 * @description 删除
 * @param {String} title  删除时提示框标题
 * @param {String} url 删除接口地址.
 * @param {Object} options 可选参数
 * @param {String} options.deleteId 需要删除的id
 * @param {Boolean} options.status 数据是否可以删除
 * @param {String} options.constraint 限制不能删除的行号 如: 2,4,6
 *
 *@public
 *@author wangsl
 *@version 1.0.0
 * */
DSE.form.deleteDatagridRow = function (title, url, options) {
    options = options || {};
    options.deleteId = options.deleteId || 'ids';
    options.status = options.status || 'status';
    options.ids = options.ids || DSE.form.dataRowID;
    var $params = {};
    $params[options.deleteId] = options.ids;
    if (options.params && options.params.length > 0) {
        $.each(options.params, function (i) {
            $params[options.params[i]["key"]] = options.params[i]["value"];
        });
    }
    options.constraint = options.constraint || '2,3,4,6';
    //询问框
    var _selections = DSE.form.MyDataGrid.datagrid('getSelections'),
        _status;
    if (nullToSpace(options.ids) == '') {
        $tips.msg('请选择要删除的数据列');
        return false;
    } else {
        if (options.status) {
            var _c = options.constraint.split(',');
            for (var i in _selections) {
                if (_selections[i][options.status]) {
                    _status = String(_selections[i][options.status]);
                    $.each(_c, function (k) {
                        if (_status == String(_c[k])) {
                            $tips.msg('上报后数据不能删除');
                            return false;
                        }
                    });
                }
            }
        }
        var str = options.ids.split(',');
        if (str.length >= 1) {
            $tips.confirm("确认删除 [ " + title + " ] 吗?", function (index) {
                $.ajax({
                    url: DSE.serverPath + url,
                    data: $params,
                    type: 'post',
                    success: function (data) {
                        if (options.sucType == '2' ? data : data["data"]) {
                            $tips.suc('操作成功', function () {
                                //刷新
                                DSE.form.refreshDatagrid();
                            });
                        } else {
                            //操作失败
                            $tips.err('操作失败');
                        }
                    }
                });
            });
        }
    }
};