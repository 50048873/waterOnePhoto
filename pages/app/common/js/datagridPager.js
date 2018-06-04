/**
 * datagrid通用查询方法
 * 此文件的方法已经会整合至dseframework/table/DsePager.js。中，保留此文件主要是为了兼容以前版本。
 *
 * 在新版本中建议使用dseframework/table/DsePager.js
 * 此文件目前撤回2017-04-19 月份发布的版本，目前已经在深圳水工和广西防汛值班系统中使用。
 * */
/**
 * @description 普通 table 滚动分页
 * @param {Array|String} data 需要分页的数据, 当data类型为String时，需要填入有效的URL地址
 * @param {Object} params 查询数据参数，根据数据接口类型设置.
 * @param {String} obj  表单 id选择器,如：#table
 *
 * @public
 * @author wangsl
 * @version 1.0.1
 * */
DSE.form.tablePager = function (data, params, obj) {
    if (!data) {
        return false;
    }
    obj = obj || '.g-tb-cont';
    var _flag = true;
    $(obj).scroll(function () {
        var $t = $(this);
        if ($t.scrollTop() >= ($t.find('table').height() - $t.height() - 10)) {
            if (DSE.form.pageNo && DSE.form.pageSize && DSE.form.dataTotal) {
                _flag = false;
                if (data) {
                    var _data;
                    if (typeof data == 'object') {
                        if (DSE.form.pageNo <= Math.ceil(data.length / DSE.form.pageSize)) {
                            DSE.form.pageNo += 1;
                            if (DSE.form.pageSize * (DSE.form.pageNo - 1) <= data.length) {
                                _data = data.slice(DSE.form.pageSize * (DSE.form.pageNo - 1), DSE.form.pageSize * DSE.form.pageNo);
                            } else {
                                _data = data.slice(DSE.form.pageSize * (DSE.form.pageNo - 1), data.length - 1);
                            }
                            if (DSE.form.createTableTr) {
                                $t.find('tbody').append(DSE.form.createTableTr(_data));
                                _flag = true;
                            }
                        }
                    } else if (typeof data == 'string') {
                        if (params) {
                            if (Math.ceil(DSE.form.dataTotal / DSE.form.pageSize) > DSE.form.pageNo) {
                                DSE.form.pageNo += 1;
                                params["page"] = DSE.form.pageNo;
                                params["rows"] = DSE.form.pageSize;
                                _data = $ajax({url: data, data: params})["rows"] || [];
                                if (data.length > 0) {
                                    if (DSE.form.createTableTr) {
                                        $t.find('tbody').append(DSE.form.createTableTr(_data));
                                        _flag = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
};

/**
 * @description easyui datagrid 本地分页
 * @param {String} obj easyui datagrid表单ID选择器,如: #datagrid
 * @param {Array} data 需要分页的数据
 *
 * @public
 * @author wangsl
 * @version 1.0.1
 * */
DSE.form.datagridPager = function (obj, data) {
    if (!data) {
        return false;
    }
    obj = obj || DSE.form.datagrid;
    var $t = $(obj),
        pager = $t.datagrid("getPager"),
        info = $t.data().datagrid,
        view1 = info.dc.view1,
        _pageSize = info.options.pageSize,
        _pageNo = info.options.pageNumber,
        _dataTotal = data.length;
    pager.pagination({
        total: _dataTotal,
        onSelectPage: function (_pageNo, _pageSize) {
            var start = (_pageNo - 1) * _pageSize,
                end = start + _pageSize;
            $t.datagrid("loadData", data.slice(start, end));
            pager.pagination('refresh', {
                total: _dataTotal,
                pageNumber: _pageNo
            });
            view1.find('.datagrid-cell-rownumber').text(function () {
                return parseInt($(this).text()) + (_pageNo - 1) * _pageSize;
            });
        }
    });
};

/**
 * @description easyui datagrid 滚动分页
 * @param {Number} pageSize 每页显示数据的条数.
 * @param {Array|String} data 需要分页的数据, 当data类型为String时，需要填入有效的URL地址
 * @param {Object} params 查询数据参数，根据数据接口类型设置.
 * @param {String} obj easyui datagrid 表单 id选择器,如：#datagrid
 *
 * @public
 * @author wangsl
 * @version 1.0.1
 * */
DSE.form.datagridScrollPage = function (pageSize, data, params, obj) {
    if (!data) {
        return false;
    }
    obj = obj || DSE.form.datagrid;
    var info = $(obj).data().datagrid,
        body2 = info.dc.body2,
        view2 = info.dc.view2,
        _pageSize = info.options.pageSize,
        _pageNo = info.options.pageNumber,
        _dataTotal = !params ? data.length : info.data.tatal;
    var _flag = true;
    body2.scroll(function () {
        var $t = $(this);
        if ($t.scrollTop() >= ($t.find('tbody').height() - $t.height() - 10) && _flag) {
            if (_pageNo && pageSize && _dataTotal) {
                _flag = false;
                if (data) {
                    var _data;
                    if (typeof data == 'object') {
                        if (_pageNo <= Math.ceil(data.length / pageSize)) {
                            _pageNo += 1;
                            if (pageSize * (_pageNo - 1) <= data.length) {
                                _data = data.slice(pageSize * (_pageNo - 1), pageSize * _pageNo);
                            } else {
                                _data = data.slice(pageSize * (_pageNo - 1), data.length - 1);
                            }
                            $.each(_data, function (i) {
                                $(obj).datagrid('appendRow', _data[i]);
                            });
                            $(obj).datagrid('reload');
                            _flag = true;
                        }
                    } else if (typeof data == 'string') {
                        if (params) {
                            if (Math.ceil(_dataTotal / pageSize) > _pageNo) {
                                _pageNo += 1;
                                params["page"] = _pageNo;
                                params["rows"] = pageSize;
                                _data = $ajax({url: data, data: params})["rows"] || [];
                                if (data.length > 0) {
                                    $.each(_data["rows"], function (i) {
                                        $(obj).datagrid('appendRow', _data["rows"][i]);
                                    });
                                }
                                _flag = true;
                            }
                        }
                    }
                }
            }
        }
    });
};
