const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();

// $ GET /package.json
app.use(serve('.'));

// $ GET /hello.txt
app.use(serve('weightedtree'));

// or use absolute paths
app.use(serve(__dirname + '/weightedtree'));

app.listen(3100);

console.log('listening on port 3100');