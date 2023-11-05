const http = require("http");
const { URL } = require("url");
const getBooks = require("./modules/books");
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  console.log(url.searchParams.keys());
  const nameFromURL = url.searchParams.get("user");
  const lastNameFromURL = url.searchParams.get("lastname");
  const bookId = url.searchParams.get("book");
  /*POST запрос при авторизации (create)*/
  if (request.url === `/?user=${nameFromURL}&lastname=${lastNameFromURL}`) {
    if (nameFromURL !== "") {
      response.statusCode = 200;
      response.statusMessage = "OK";
      response.setHeader("Content-Type", "application/json");
      response.write(
        `Hello, ${url.searchParams.get("user")} ${url.searchParams.get(
          "lastname"
        )}`
      );
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
  } /*GET запрос на получение всех книг (read)*/ else if (
    request.url === "/books"
  ) {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "application/json");
    response.write(getBooks());
    response.end();
    return;
  } else if (
  /*в зависимости от типа запроса книга будет возвращена (метод DELETE) (delete) или взята (метод POST) (update)*/
    request.url === `/?book=${bookId}`
  ) {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "application/json");
    response.write("Book was taken");
    response.end();
    return;
  }
  response.statusCode = 200;
  response.statusMessage = "OK";
  response.setHeader("Content-Type", "text/plain");
  response.write("Welcome to our library");
  response.end();
  return;
});
server.listen(4000, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:4000");
});
