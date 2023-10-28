const http = require("http");
const { URL } = require("url");
const getUsers = require("./modules/users");
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  console.log(url);
  console.log(url.searchParams);
  const nameFromURL = url.searchParams.get("hello");
  if (request.url === `/?hello=${nameFromURL}`) {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(`Hello, ${url.searchParams.get("hello")}`);
    response.end();
    return;
  } else if (request.url === "/hello") {
    response.status = 400;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write("Enter a name");
    response.end();
    return;
  } else if (request.url === "/users") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();
    return;
  }
  response.status = 200;
  response.statusMessage = "OK";
  response.header = "Content-Type: text/plain";
  response.write("Hello, world!");
  response.end();
  return;
});
server.listen(3000, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3000");
});

/*const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  if (request.url === "/users") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();
    return;
  }
  response.status = 200;
  response.statusMessage = "OK";
  response.header = "Content-Type: text/plain";
  response.write("Hello, world!");
  response.end();
});

server.listen(3000, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3000");
});*/
