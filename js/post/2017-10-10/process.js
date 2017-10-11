// process : 他是一个全局对象

// console.log(process);
// console.log(global.process);

console.log(process.argv);
// console.log(process.env);

console.log(process.pid);
console.log(process.title);


setInterval(function() {

}, 2000);

setTimeout(function() {
    // process.exit();
}, 5000);

function Log(data) {
    process.stdout.write(data);
}

process.stdout.write("hello wrold");

Log("你老母亲");

// 默认情况下，输入流是关闭的，要监听处理输入流数据，首先要开启输入流；
process.stdin.resume();

// 监听用户输入数据
// process.stdin.on("data", function(chunk) {
//     console.log("你输入了：" + chunk);
// })

var a;
var b;
process.stdout.write("请输入a:");
process.stdin.on("data", function(chunk) {
    if (!a) {
        a = Number(chunk);
        process.stdout.write("请输入b:");
    } else {
        b = Number(chunk);
        process.stdout.write("a+b = " + (a + b));
        process.exit();
    }
})