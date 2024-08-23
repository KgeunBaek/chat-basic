
const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

const server = http.createServer(function(request, response) {
    fs.readFile('HTMLPage.html', function(error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    })
}).listen(52455, function() {
    console.log('Server Running at http://127.0.0.1:52455');
});

//소켓 서버 만들기
const io = socketio.listen(server);
io.sockets.on('connection', function(socket) { //사용자랑 연결
    socket.on('message', function(data) {      //message이벤트 받고
        io.sockets.emit('message',data);       //message 모두한테 뿌리고
    })
});