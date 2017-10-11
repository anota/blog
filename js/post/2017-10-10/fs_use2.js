const fs = require("fs");
var filedir = "./iscool/source";

fs.watch(filedir, function(ev, file) {

    // 不需要判断file是否有内容
    console.log(ev + "/" + file);

    // 只要有一个文件发生了变化，我们就需要对文件夹所有文件进行读取，然后合并
    fs.readdir(filedir, function(err, dataList) {
        var arr = [];
        console.log(dataList);
        dataList.forEach(function(f) {
            if (f) {
                var info = fs.statSync(filedir + "/" + f);
                console.log(info);

                if (info.mode == 33206) {
                    arr.push(filedir + "/" + f);
                }
            }
        });

        console.log(arr);
        // 读取数组中的文件内容，并合并

        var content = "";
        arr.forEach(function(f) {
            var c = fs.readdirSync(f);
            console.log(c);
            content += c.toString() + "\n";
        });

        console.log(content);
        fs.writeFileSync("./iscool/js/index.js", content);
    })
})