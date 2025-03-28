const koa = require('koa');
const router = require('koa-router');
const http = require('http');
const static = require('koa-static');
const { WebSocketServer } = require('ws');
const path = require('path');

const app = new koa();

app.use(static(path.join(__dirname, '.')));
// router.get('/websocket', async(ctx, next) => {
//   // 建立 websocket 链接

// })
// app.use(router.routes());

const server = http.createServer(app.callback());
server.listen(3000, () => {
  console.log('websocket server start on 3000')
});

const wss = new WebSocketServer({ server });
const clientNames = ['A', 'B', 'C', 'D'];
wss.on('connection', (ws) => {
  ws.clientName = clientNames.shift();

  ws.on('message', (message) => {
    wss.clients.forEach(client => {
      console.log(client.clientName);
      client.send((ws.clientName === client.clientName ? "我" : ws.clientName) + ':' + message)
    })
  });

  ws.on('error', console.error);
})


