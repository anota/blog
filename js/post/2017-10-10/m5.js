/* 
    在一个模块中通过var定义的变量，其作用域范围是当前模块，外部不能直接访问
    如果我们想一个模块能够访问另外一个模块中定义的变量，可以：
        1、把变量作为global对象的一个属性，不推荐这样的做法
        2、使用模块对象 module
 */

var a = 100;
global.a = 100;

/**
 * module:保存提供和当前模块有关的一些信息
 * 
 * 在这个module对象，有一个子对象：exports
 * 我们可以通过这个对象把一个模块中的局部变量对象进行提供访问
 */

module.exports.a = a;

/**
 * 在模块作用域，还有一个内置的模块对象，exports，它其实就是module.exports
 */

console.log("module.exports === exports");
console.log(module.exports === exports);
exports.b = 200;
module.exports = [1, 2, 3]; //不推荐 exports和module.exports的指向关系已经断开

// 所以以下设置没用
exports.c = 300;
exports = [1, 3];

// __filename:返回当前模块文件解析后的绝对路径，该属性并非全局的，而是在模块的作用下的
// __dirname:返回当前模块文件所在目录解析后的绝对路径，该属性同在模块作用域下

console.log(__filename);
console.log(__dirname);