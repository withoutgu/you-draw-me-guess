//引入http模块并创建连接
var server = require("http").createServer();
//引入socket.io模块,并实例化一个socket服务器
var io = require("socket.io")(server);

var text;

io.on("connection",function(socket){
    //接收笔迹的坐标
    socket.on("draw",function(data){
        //发送坐标
        io.sockets.emit("paint",data)
    })
    //监听停笔
    socket.on("stop",function(data){
        io.sockets.emit("paint",data)
    })
    //监听清空
    socket.on("clear",function(data){
        io.sockets.emit("clear","clear")
    })
    //监听答案
    socket.on('ask',function(data){
        io.sockets.emit('ask',data)
        console.log('答案是:'+data)
    })
    //监听是否答对了
    socket.on('status',function(data){
        io.sockets.emit('status',data)
    })
})

server.listen('2425');
console.log('服务器开启')