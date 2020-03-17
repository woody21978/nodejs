// шаблон сервера
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const fs = require("fs");


// для того, чтобы можно было обрабатывать req.body
app.use(bodyParser.text());
app.use(bodyParser.json());

// разрешаем CORS запросы на стороне сервера
app.use(cors());

app.get('/users', function (req, res) {
  /*
    На данном маршруте нужно вывести содержимое файла users.dat
  */
  fs.readFile("users.data", "utf8",
    function (error, data) {
      console.log("Асинхронное чтение файла");
      if (error) throw error; // если возникла ошибка
      console.log(data);  // выводим считанные данные
    });
  res.send('Маршрут для вывод содержимого файла пользователей');
});

app.post('/user-register', function (req, res) {
  /*
    На данном маршруте нужно добавить пользователя (по POST запросу):
    1. считываем users.data
    2. добавляем в массив пользователей нового
    3. сохраняем в файл
  */
  console.log('Пришли данные с клиента', req.body);
  res.send('Маршрут для регистрации пользователя');
  const data = fs.readFileSync('users.data');
  if (data === "") {
    fs.writeFile("users.data", JSON.stringify(req.body), function (error) {
  
      if (error) throw error; // если возникла ошибка
      console.log("Асинхронная запись файла завершена. Содержимое файла:");
      let data = fs.readFileSync("users.data", "utf8");
      console.log(data);  // выводим считанные данные
    });
  }
  else {
    let newData = data + ", /n" + JSON.stringify(req.body);
    fs.writeFileSync('users.data', newData);
  }
});

app.listen(80, (err) => {
  if (err) return console.log('something bad happened', err);
  console.log('server is listening 80')
});