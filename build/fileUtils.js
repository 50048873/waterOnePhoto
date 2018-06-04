var fs = require("fs");
var path = require("path");

/**
 * @description copy file
 *
 * @param {String} source  文件源路径
 * @param {String} destination 复制目标路径.
 * */
function copyFile(source, destination) {
    if (fs.existsSync(source)) {
        var rOption = {
            flags: 'r',
            encoding: "utf-8",
            mode: "0666"
        };

        var wOption = {
            flags: 'a',
            encoding: "utf-8",
            mode: "0666"
        };
        var stream = fs.createReadStream(source, rOption);
        var writable = fs.createWriteStream(destination);
        stream.pipe(writable, wOption);
    }
}

/**
 * @description copy directory .
 *
 * @param {String} source 文件夹源路径
 * @param {String} destination 文件夹目标路径.
 * */
function copyFileOrDirectory(source, destination) {
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination);
    }

    var files = fs.readdirSync(source);
    for (var i in files) {
        var file = files[i];
        var sourceFile = source + "\\" + file;

        var targetFile = destination + "\\" + file;

        var sta = fs.statSync(sourceFile);
        if (sta.isDirectory()) {
            copyFileOrDirectory(sourceFile, targetFile);
        } else {
            copyFile(sourceFile, targetFile);
        }
    }
}

/**
 * @description 删除目标文件夹或文件
 *
 * @author wangsl
 * @version 1.1.0
 * */
function deleteSampleFiles(directory) {
    // 如果当前url不存在，则退出
    if (!fs.existsSync(directory)) return;
    // 当前文件为文件夹时
    if (fs.statSync(directory).isDirectory()) {
        var files = fs.readdirSync(directory);
        var len = files.length, removeNumber = 0;
        if (len > 0) {
            files.forEach(function (file) {
                removeNumber++;
                var stats = fs.statSync(directory + '/' + file);
                var url = directory + '/' + file;
                if (fs.statSync(url).isDirectory()) {
                    deleteSampleFiles(url);
                } else {
                    fs.unlinkSync(url);
                }
            });
            if (removeNumber === len) {
                // 删除当前文件夹下的所有文件后，删除当前空文件夹（注：所有的都采用同步删除）
                fs.rmdirSync(directory);
                // console.log('删除DEMO' + directory + '成功');
            }
        } else {
            fs.rmdirSync(directory)
        }
    } else {
        // 当前文件为文件时
        fs.unlinkSync(directory);
        // console.log('删除DEMO' + directory + '成功');
    }
}


//
module.exports.copyFileOrDirectory = copyFileOrDirectory;

module.exports.deleteDirectory = deleteSampleFiles;

/**
 * @description 创建目标文件夹.
 * */
module.exports.createDirectory = function (target) {
    //
    var newTarget = path.join(process.cwd(), target);
    if (!fs.existsSync(newTarget)) {
        //
        console.log("create directory of " + target);
        fs.mkdir(newTarget);
    }
};

/**
 *
 * @param {Object} configData 配置文件.
 * @param {Object} configData.devDependencies
 * @param {Object} configData.dependencies
 * */
module.exports.getCopyFiles = function (configData) {
    //
    var copyDirectories = [];
    //
    var source = "/node_modules/";
    for (var keyField in configData.devDependencies) {
        //
        if (!/(loader$)|(^babel)|(-plugin$)|(compiler$)|(^cross)|(^webpack)|(^ip)|(sass$)|(^typescript)|(^less)|(^ajv)|(^memory)/.test(keyField)) {
            //
            console.log(keyField);
            copyDirectories.push(source + keyField);
        }
    }

    for (var keyField in configData.dependencies) {
        //
        if (!/(^@types)|(loader$)|(^babel)|(-plugin$)|(compiler$)|(^cross)|(^webpack)|(^ip)|(sass$)|(^typescript)|(^less)|(^ajv)|(^memory)/.test(keyField)) {
            //
            console.log(keyField);
            copyDirectories.push(source + keyField);
        }
    }
    //
    return copyDirectories;
};