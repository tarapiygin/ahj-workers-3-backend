const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaCors = require('@koa/cors');
const Router = require('koa-router');
const faker = require('faker');
const uuid = require('uuid');

const router = new Router();
const app = new Koa();

app.use(koaCors());
app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
  text: true,
}));

router.get('/news', async (ctx) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      const random = Math.floor(Math.random() * 10);
      if (random < 6) ctx.response.status = 500;
      ctx.response.body = JSON.stringify({
        status: 'ok',
        newsList: [
          {
            id: uuid.v4(),
            date: Date.now(),
            image: {
              src: faker.internet.avatar(),
            },
            description: faker.lorem.paragraph(),
          },
          {
            id: uuid.v4(),
            date: Date.now(),
            image: {
              src: faker.internet.avatar(),
            },
            description: faker.lorem.paragraph(),
          },
          {
            id: uuid.v4(),
            date: Date.now(),
            image: {
              src: faker.internet.avatar(),
            },
            description: faker.lorem.paragraph(),
          },
        ],
      });
      resolve();
    }, 3000);
  });
});

app.use(router.routes()).use(router.allowedMethods());
const server = http.createServer(app.callback());
const port = process.env.PORT || 7070;
server.listen(port);
