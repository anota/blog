/* 
    Buffer类：用于操作二进制数据流
 */

//  new Buffer(size); size[Number] 创建一个Buffer对象，并为这个对象分配一个大小
//  当我们为一个Buffer对象分配空间大小以后，其长度是固定的，不能更改

var bf = new Buffer(5);
console.log(bf);
bf[1] = 2;
console.log(bf);

// new Buffer(array);
var bf2 = new Buffer([1, 2, 3]);
console.log(bf2);
bf2[10] = 10;
console.log(bf2);

// new Buffer(string,[encoding]);

var bf3 = new Buffer("iscool", "utf-8");
console.log(bf3);

for (var i = 0; i < bf3.length; i++) {
    // console.log(bf3[i].toString(16));
    // console.log(bf3[i].toString());
    console.log(String.fromCharCode(bf3[i]));
}

var str1 = "iscool";
var bf4 = new Buffer(str1);
console.log(str1.length);
console.log(bf4.length);
console.log("=================");

var str2 = "艾斯酷";
var bf5 = new Buffer(str2);
console.log(str2.length);
console.log(bf5.length); //一个中文三个字节

// buf.write(要写入的字符串，从Buffer对象中的几位开始写入，写入的字符创长度，写入的字符创编码)；

var str3 = "iscool";
console.log(new Buffer(str3));

var bf6 = new Buffer(5);
bf6.write(str3); //不会改变buffer长度
console.log(bf6);

bf6.write(str3, 1);

console.log(bf6);

bf6.write(str3, 1, 3);
console.log(bf6);

var bf7 = new Buffer("iscool");
console.log(bf7.toString());
console.log(bf7.toString("utf-8", 1, 3));

var bf8 = new Buffer("艾斯酷");
console.log(bf8);
console.log(bf8.toString("utf-8", 1)); //从buffer读取 二不是从字符串长度
console.log(bf8.toJSON());

// 类方法，静态方法

console.log(Buffer.isEncoding("utf-8"));
console.log(Buffer.isEncoding("gbk"));
console.log(Buffer.isEncoding("hex"));
console.log("=================");

var arr = [1, 2, 3];
var bf9 = new Buffer(10);

console.log(Buffer.isBuffer(arr));
console.log(Buffer.isBuffer(bf9));

var str4 = "iscool";

console.log(str4.length);
console.log(Buffer.byteLength(str4));
console.log("================");

var str5 = "艾斯酷";
console.log(str5.length);
// buffer不同编码不同字节长度
console.log(Buffer.byteLength(str5, "utf-8"));
console.log(Buffer.byteLength(str5, "gbk"));
console.log(Buffer.byteLength(str5, "hex"));

var list = [new Buffer(str4), new Buffer(str5)];
console.log(list);

var bf10 = Buffer.concat(list, 11);
console.log(bf10);

process.stdout.write("请输入内容：");

// process.stdin.resume();

// process.stdin.on("data", function(chunk) {
//     console.log(chunk.toString());
//     console.log(chunk);
//     console.log("输入的内容是：" + chunk); //自动转类型
// })

console.log('===============');

var bf11 = new Buffer("iscool");
console.log(bf11);

var bf12 = bf11.slice();
console.log(bf12);

var bf13 = bf11.slice(2, 4);
console.log(bf13);
bf13[0] = 2;
console.log(bf13);
console.log(bf11); //被bf13影响，因为buffer是强引用类型,对源数据某区域进行引用

console.log(":=================");
var bf14 = new Buffer(10);
bf11.copy(bf14);
console.log(bf14);

bf14[0] = 2;
console.log(bf14);
console.log(bf11);

bf11.copy(bf14, 1, 2, 4);
console.log(bf14);