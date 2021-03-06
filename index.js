var exec = require('child_process').exec;
var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var configJson = JSON.parse(fs.readFileSync(__dirname + '/data/config.json'));
// 服务启动后回调
server.listen(3000, function() {
    console.log("server listen at port 3000. pid is " + process.pid);
});

// 设置一些静态文件映射
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/fonts', express.static(__dirname + '/public/fonts'));
app.use('/image', express.static(__dirname + '/public/image'));
app.use('/viewer', express.static(__dirname + '/public/viewer'));

// 设置路径跳转
// 主页
app.get('/', function(req, res) {
    res.sendfile('./viewer/index.html');
});
// 自动化部署
app.get('/deploy', function(req, res) {
    res.sendfile('./viewer/deploy.html');
});
// 压力测试
app.get('/stress', function(req, res) {
    res.sendfile('./viewer/stress.html');
});
// 模糊测试
app.get('/fuzzy', function(req, res) {
    res.sendfile('./viewer/fuzzy.html');
});
// socket.io 相关链接操作
io.on('connection', function(socket) {

    socket.emit('config', configJson);

    socket.on('getConfig', function(data){
        console.log("getConfig");
    });

    socket.on('chat message', function(data) {
        socket.emit('chat message', data);
    });
    socket.on('test', function(data) {
        console.log(data);
        var last = exec(data);
        socket.emit('chat message', 'wwww');
        last.stdout.on('data', function(d) {
            console.log('stdout:' + d);
            socket.emit('chat message', d);
        });
        last.stderr.on('data', function(d) {
            console.log('stderr:' + d);
            socket.emit('chat message', d);
        });
        last.on('exit', function(code) {
            console.log('exit code:' + code);
            socket.emit('chat message', "exit.");
        });
    });
});