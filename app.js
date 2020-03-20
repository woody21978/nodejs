document.querySelector(".registration-form").onsubmit = function (event) {
  event.preventDefault();
  const username = event.target.querySelector('input[name="username"]').value;
  const email = event.target.querySelector('input[name="email"]').value;
  console.log("submit", username, email);
  const data = {
    username: username,
    email: email
  }

  fetch('http://localhost/user-register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

  // TODO: сделайте POST запрос на ваш сервер для сохранения пользователя
  // пример маршрута POST /user
};

window.onload = function () {
  // TODO: GET запрос (GET /users)
  // полученные данные выведите в DOM (.user-list)
  // ${formattedJson}
  let users = document.querySelector('.user-list'),
    user = document.createElement('div'),
    name = document.createElement('strong'),
    email = document.createElement('div');
  user.classList.add('user');
  name.innerHTML;
  fetch('http://localhost:80/users')
    .then(function (res) {
      if (res.status === 200 && res.ok) {
        res.json().then(result => {
          console.log(true);
        });
      }
    })
    .catch(function (res) {
      console.log(res);
    });
  user.appendChild(name);
  user.appendChild(email);
  users.appendChild(user);
};
