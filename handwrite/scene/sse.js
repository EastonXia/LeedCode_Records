const express = require('express');

const app = express();

app.use(express.json()); // 用于解析 JSON 请求体

app.get('/stream', (req, res) => {
  console.log('client is connented');
  res.writeHead(200, { 
    'Content-type': 'text/event-stream',
    'Connention': 'keep-alive',
    'Cache-controll': 'no-cache',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': '*'
  }) 

  function sendSSEMessage(message) {
    res.write(`data: ${message}\n\n`)
  }

  const timer = setInterval(() => {
    const randomNumber = Math.random() * 100;
    sendSSEMessage(randomNumber)
  }, 1000)


  req.on('close', () => {
    clearInterval(timer);
    console.log('sse server disconnented')
  })
})

app.listen(3000, () => {
  console.log('sse server is listening') 
})