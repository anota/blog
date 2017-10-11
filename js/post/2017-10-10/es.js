/*
    在esmascript部分nodejs和js一致

    浏览器js中顶层对象为 window
    nodejs顶层对象为 global，nodejs没有window
*/

var a = 100;
console.log(a);

var d = new Date();
console.log(d.getFullYear());
console.log(d.getMonth() + 1);

var arr = [1, 2, 3];
arr.push(4);
console.log(arr);

console.log(global.a); //undefined;