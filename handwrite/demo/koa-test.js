const koa = require('koa');
const app = new koa();

app.use(async(ctx, next) => {
  try{
    await next();
  } catch(e) {
    console.log('ahhahahaha', e)
  }
})


app.use(async(ctx, next) => {
  console.log(1);
  ctx.status = 500;
  
  ctx.body = {
    success: false,
    message: 'errorerrorerrorerror',
  }

  throw new Error('error')
  await next();
  console.log(2);
})


app.listen(3000, () => {
  console.log('server start on port 3000')
})