// fs模块

var fs = require("fs");

/**
 * path：打开的文件路径
 * flags ： 打开文件的方式 读/写
 * mode：设置文件的模式 读/写/执行 4/2/1
 * callback : 回调
 *      err：文件打开失败之的错误保存在err里面，如果成功err为null
 *      fd：被打开文件的标识，和定时器类似
 */

// fs.open(path,flags,[mode],callback);

// fs.writeFileSync("1.txt", "hellowrlod");
// 创建并写入文件

// fs.open("1.txt", "r", function(err, fd) {
//     console.log(err);
//     console.log(fd);

//     if (err) {
//         console.log("文件打开失败");
//     } else {
//         console.log("文件打开成功");
//         console.log(fd);
//     }
// });

console.log("openSync");

var fd = fs.openSync("1.txt", "r");
console.log(fd);
console.log("==============");

// fs.open("1.txt", "r", function(err, fd) {

//     if (err) {
//         console.log("文件打开失败");
//     } else {
//         // 读取文件
//         /**
//          * fd：open后的返回标识
//          * buffer：buffer对象
//          * offset：新的内容添加到buffer的起始位置
//          * length：添加到buffer的内容长度
//          * postion：读取文件的起始位置
//          * callback ： 回调
//          *      err
//          *      buffer的长度
//          *      buffer对象
//          */
//         // fs.read(fd,buffer,offset,length,position,callback)

//         var bf1 = new Buffer("123456789");
//         console.log(bf1);

//         fs.read(fd, bf1, 0, 4, 2, function(err, len, newBf) {
//             console.log(bf1);
//             console.log(len);
//             console.log(newBf);
//         })
//     }
// })

fs.open("1.txt", "r+", function(err, fd) {
    // 当进行文件写入的时候，打开文件模式应该为读写方式
    /**
     * 
     * fs.write(fd,buffer,offset,length[,position],callbac)
     * fd:打开的文件
     * buffer：要写入的数据
     * offset：buffer对象中写入的数据起始位置
     * length：要写入的buffer数据长度
     * position：fd的起始位置
     * callback：回调
     * 
     */

    if (err) {
        console.log("打开文件失败");
    } else {
        var bf = new Buffer("1234567");

        // fs.write(fd, bf, 1, 3, 5, function() {
        //     console.log(arguments);
        // })

        fs.write(fd, "anota", 5, "utf-8");

        fs.close(fd, function() {
            console.log("关闭文件");
        });
    }
})

// 向一个指定的文件中写入数据，如果该文件不存在，则新建，如果存在则新的内容会覆盖原有文件内容

// fs.writeFile("2.txt", "iscool", function() {
//     console.log(arguments);
// });

/* fs.appendFile("2.txt", "-anota", function() {
    console.log(arguments);
}); */
var fileName = "3.txt";
// fs.exists(fileName, function(isExists) {
//     console.log(isExists);

//     if (!isExists) {
//         fs.writeFile(fileName, "iscool", function(err) {
//             if (err) {
//                 console.log("出错了");
//             } else {
//                 console.log("文件创建并写入成功");
//             }
//         })
//     } else {
//         fs.appendFile(fileName, "-anota", function(err) {
//             if (err) {
//                 console.log("文件追失败");
//             } else {
//                 console.log("文件追加成功");
//             }
//         })
//     }
// })

// if (!fs.existsSync(fileName)) {
//     fs.writeFileSync(fileName, "iscool");
//     console.log("新文件创建并写入成功");
// } else {
//     fs.appendFileSync(fileName, "-anota");
//     console.log("新内容追加成功");
// }

// fs.readFile(fileName, function(err, data) {
//     console.log(arguments);
//     console.log("==================");

//     if (err) {
//         console.log("文件读取失败");
//     } else {
//         console.log(data.toString());
//     }
// });

fs.unlink(fileName, function(err) {
    if (err) {
        console.log("删除失败");
    } else {
        console.log("删除成功");
    }
});

// fs.rename("2.txt", "2.new.txt", function() {
//     console.log(arguments);
// });

// 读取文件简介
/* fs.stat("2.new.txt", function() {
    console.log("=======stat========")
    console.log(arguments);
}) */

// var fileName = "2.new.txt";
// fs.watch(fileName, function(ev, fn) {
//     console.log(ev);
//     if (fn) {
//         console.log(fn + "发生了改变");
//     } else {
//         console.log("......");
//     }
// })

// fs.mkdir(path,[mode],callback)

// fs.mkdir("./1", function() {
//     console.log(arguments);
// });

// fs.rmdir("./1", function() {
//     console.log(arguments);
// })

// fs.readdir("../2017-10-10", function(err, filelist) {
//     console.log(filelist);

//     filelist.forEach(function(f) {
//         fs.stat(f, function(err, info) {
//             // console.log(arguments);

//             switch (info.mode) {
//                 case 16822:
//                     console.log("文件夹：" + f);
//                     break;
//                 case 33188:
//                     console.log("文件：" + f);
//                     break
//                 default:
//                     console.log("其他类型：" + f);
//                     break
//             }
//         })
//     })
// })