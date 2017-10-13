/**
 * 1、用户通过浏览器发送一个http的请求到指定的主机
 * 2、服务器接收到该请求，对该请求进行分析和处理
 * 3、服务器处理完成以后，返回对应的数据到用户机器
 * 4、浏览器接收服务器返回的数据，并根据接收到的进行分析和处理
 * 
 * 客户端 服务端
 * 由客户端发送一个http请求到指定的服务器 -> 服务端接收并处理请求 -> 返回数据到客户端
 */

/* const http = require("http");

//  通过http模块下的createServer创建并返回一个web服务器对象
const server = http.createServer();

server.on("error", function(err) {
    console.log(err)
});

server.on("listening", function() {
    console.log("listening....");
});

server.on("request", function(req, res) {
    console.log("有服务端请求了");

    // console.log(req);
    // res.write("hello");

    res.setHeader("iscool", "anota");
    res.writeHead(200, "u are success", {
        // "content-type": "text/html;charset=utf-8"
        "content-type": "text/plain"
    });

    res.write("<h1>hello world</h1>");

    res.end();

});

server.listen(8080, "localhost");

console.log("=====================");
console.log(server.address()); */
// console.log(server.address());

// ====================我是分割线======================

/* var http = require("http");
var url = require("url");
var server = http.createServer();

// var urlStr = url.parse("http://baidu.com:8080/a/index.html?b=1#p=1");
// console.log(urlStr);

server.on("request", function(req, res) {
    // req.url:访问路径
    // ？后面部分 query string
    // console.log(req.url)

    var oUrl = url.parse(req.url);
    // console.log(oUrl);

    switch (oUrl.pathname) {
        case "/":
            res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
            res.end("<h1>这是首页</h1>");
            break;
        case "/user":
            res.writeHead(200, {
                "content-type": "text/html;charset=utf-8"
            });
            res.end("<h1>个人中心</h1>");
            break;
        default:
            res.writeHead(404, {
                "content-type": "text/html;charset=utf-8"
            });
            res.end("<h1>你的页面被anota吃掉了</h1>");
            break;

    }
});
server.listen("8080", "localhost"); */

// ====================我是分割线======================

const http = require("http");
const url = require("url");
const fs = require("fs");
var querystring = require("querystring");

var server = http.createServer();

var htmlDir = __dirname + "/html/";

server.on("request", function(req, res) {
    var oUrl = url.parse(req.url);

    switch (oUrl.pathname) {
        case "/":
            setData(htmlDir + "index.html", req, res);
            break;
        case "/user":
            setData(htmlDir + "user.html", req, res);
            break;
        case "/login":
            setData(htmlDir + "login.html", req, res);
            break;
        case "/login/check":
            // console.log(req.method);
            // console.log(oUrl);
            // console.log(querystring.parse(oUrl.query));

            if (req.method.toUpperCase() == "POST") {
                var qString = "";
                req.on("data", function(chunk) {
                    qString += chunk;
                });
                req.on("end", function() {
                    const query = querystring.parse(qString);
                    console.log("============query============");
                    console.log(query);
                })
            }
            break;
        default:
            setData(htmlDir + "err.html", req, res);
            break;

    }
});

server.listen("8080", "localhost");

function setData(file, req, res) {
    fs.readFile(file, function(err, data) {
        if (err) {
            res.writeHead(404, {
                "contnet-type": "text/html;charset=utf-8"
            });
            var html = fs.readFileSync("err");
            res.end(html)
        } else {
            res.writeHead(200, {
                "content-type": "text/html;charset=utf-8"
            });
            res.end(data);
        }
    })
}