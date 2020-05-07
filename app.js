document.querySelector(".registration-form").onsubmit = function (event) {
  event.preventDefault();
  const username = event.target.querySelector('input[name="username"]').value;
  const email = event.target.querySelector('input[name="email"]').value;
  console.log("submit", username, email);
  const data = {
    username: username,
    email: email
  }

  fetch('http://localhost:80/user-reg', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    mode: 'no-cors',
    body: JSON.stringify(data)
  })
    .then(function(res) {
      getUsers();
    })
    .catch(function(res) {
      console.log(res);
    });

  // TODO: сделайте POST запрос на ваш сервер для сохранения пользователя
  // пример маршрута POST /user
};

function updateUI(usersList) {
  document.querySelector('.user-list').innerHTML = '';
  for (let i = 0; i < usersList.length; i++) {
    let div = document.createElement('div');
    div.classList.add('user');
    div.innerHTML = `<strong>${usersList[i].username}</strong>` + 
    `<div>${usersList[i].email}</div>`;
    document.querySelector('.user-list').appendChild(div);
  }
}

function getUsers() {
  fetch('http://localhost:80/users')
    .then(function(res) {
      if (res.status === 200 && res.ok) {
        res.json().then(result => {
          updateUI(result);
        });
      }
    })
    .catch(function(res) {
      console.log(res);
    });
}
window.onload = function() {
  getUsers();
};
