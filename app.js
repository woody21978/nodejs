document.querySelector(".registration-form").onsubmit = function(event) {
  event.preventDefault();
  const username = event.target.querySelector('input[name="username"]').value;
  const email = event.target.querySelector('input[name="email"]').value;
  const data = {
    username: username,
    email: email
  }
  // console.log("submit", username, email);
  let json = JSON.stringify(data);
  console.log(json);

  

  // TODO: сделайте POST запрос на ваш сервер для сохранения пользователя
  // пример маршрута POST /user
};

window.onload = function() {
  // TODO: GET запрос (GET /users)
  // полученные данные выведите в DOM (.user-list)
};
