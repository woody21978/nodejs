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

app.get('/users', (req, res) => {
  //Проверка на существование файла
  if (!fs.existsSync('users.data')) {
    fs.writeFile('users.data', "", function(err) {
      if (err) {
        return console.log(err);
      }
    });
  };

  const data = fs.readFileSync('users.data', 'utf-8');
  res.send("[" + data + "]");
});

app.post('/user-reg', (req, res) => {
 
   const data = fs.readFileSync('users.data', 'utf-8');
   let newData;
   if (data === '') {
     newData = req.body;
   } else {
     newData = data + ', \n' + req.body;
   }
   fs.writeFile('users.data', newData, function(err) {
     if (err) {
       return console.log(err);
     }
     else{
     res.send(newData);
     console.log('Данные сохранены');
     }
   });
 });

// app.post('/user-register', function (req, res) {
//   /*
//     На данном маршруте нужно добавить пользователя (по POST запросу):
//     1. считываем users.data
//     2. добавляем в массив пользователей нового
//     3. сохраняем в файл
//   */
//   console.log('Пришли данные с клиента', req.body);
//   res.send('Маршрут для регистрации пользователя');
//   let check_file = fs.readFileSync('users.data');
//   if (check_file == "") {
//     fs.writeFile("users.data", JSON.stringify(req.body), function (error) {
//       if (error) throw error; // если возникла ошибка
//     });
//   } else {
//     let newData = check_file + ", \n" + JSON.stringify(req.body);
//     fs.writeFileSync('users.data', newData);
//   }
// });

app.listen(80, (err) => {
  if (err) return console.log('something bad happened', err);
  console.log('server is listening 80')
});