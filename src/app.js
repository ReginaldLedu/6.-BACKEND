const http = require("http");
const { URL } = require("url");
const getUsers = require("./modules/users");
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  console.log(url.searchParams.keys());

  const nameFromURL = url.searchParams.get("hello");

  if (request.url === `/?hello=${nameFromURL}`) {
    if (nameFromURL !== "") {
      response.statusCode = 200;
      response.statusMessage = "OK";
      response.setHeader("Content-Type", "application/json");
      response.write(`Hello, ${url.searchParams.get("hello")}`);
      response.end();
      return;
    } else {
      response.statusCode = 400;
      response.statusMessage = "Bad request";
      response.setHeader("Content-Type", "application/json");
      response.write("Enter a name");
      response.end();
      return;
    }
  } else if (request.url === "/users") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "application/json");
    response.write(getUsers());
    response.end();
    return;
  } else if (
    url.searchParams.keys().length !== 0 &&
    !url.searchParams.has("hello")
  ) {
    response.statusCode = 500;
    response.statusMessage = "Error";
    response.setHeader("Content-Type", "text/plain");
    response.write(" ");
    response.end();
    return;
  }
  response.statusCode = 200;
  response.statusMessage = "OK";
  response.setHeader("Content-Type", "text/plain");
  response.write("Hello, world!");
  response.end();
  return;
});
server.listen(3000, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3000");
});
