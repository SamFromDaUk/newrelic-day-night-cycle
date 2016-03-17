import koa from 'koa';
import koaRouter from 'koa-router';
import routes from './routes';

let app = koa();
let router = koaRouter();

routes(router);

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
