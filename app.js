
const path = require('path');
const bp = require('body-parser');
const fs = require('fs');

const port = 8000;
const host = '127.0.0.1';


// EXPRESS APP REQUEST SERVER
const express = require('express');
const { Socket } = require('dgram');
const app = express();

// NODE HTTP SERVER
const httpServer = require('http').createServer((req, res)=>
{
    var data = fs.readFileSync('./views/bot.html', 'utf-8');
    res.end(data);
});




// SOCKET IO
const io = require('socket.io')(httpServer);
var msgStyle = 'u1';

io.on('connect', (socket)=>
{

    // Booadcase post to all
    socket.on('newpost', msg=>
    {
        io.emit('updatepost', [msg,msgStyle]);
        msgStyle = (msgStyle=='u1'?'u2':'u1');
    });

});








// PARSER FOR REQUEST DATA
app.use(bp.json());
app.use(bp.urlencoded({extended:true}));


// USE PUBLIC DIR AS STATIC
app.use(express.static(path.join(__dirname, '/public')))





// Entry point
app.get('/', (req, res) =>
{
    res.sendFile(__dirname + '/views/bot.html');
});

// MESSAGE END POINT
app.post('/msg', (req, res)=>
{
    res.statusCode = 200;
    // console.log(req.body.msg);
    res.send(req.body.msg);
})





// HTTP SERVER
httpServer.listen(process.env.PORT || 3000, ()=>
{
    console.log("Server listening");
})

// EXPRESS SERVER
// app.listen(port, host, ()=>
// {
//     console.log("Server listening at port 8000");
// })

