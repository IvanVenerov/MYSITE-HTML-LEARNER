document.addEventListener("DOMContentLoaded", function () {
  populateUserTable();
});

function populateUserTable() {
  const userTableBody = document.querySelector("#userTable tbody");
  userTableBody.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    const username = localStorage.key(i);
    const password = localStorage.getItem(username);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${username}</td>
      <td>${password}</td>
      <td>
        <img class="edit-icon" src="/images/edit-icon.png" alt="Edit" onclick="showEditDialog('${username}', '${password}')"/>
        <img class="delete-icon" src="/images/delete-icon.png" alt="Delete" onclick="showDeleteConfirmation('${username}')"/>
      </td>
    `;

    userTableBody.appendChild(row);
  }
}

function showEditDialog(username, password) {
  const newUsername = prompt("Введите новое имя пользователя:", username);
  if (newUsername !== null) {
    const newPassword = prompt("Введите новый пароль для пользователя:", password);
    if (newPassword !== null) {
      localStorage.removeItem(username);
      localStorage.setItem(newUsername, newPassword);
      populateUserTable();
    }
  }
}

function showDeleteConfirmation(username) {
  const confirmation = confirm("Вы уверены, что хотите удалить этого пользователя?");
  if (confirmation) {
    localStorage.removeItem(username);
    populateUserTable();
  }
}
function changeLanguage(lang) {
  // Сохраняем выбранный язык в localStorage
  localStorage.setItem('language', lang);

  // Получаем все элементы с атрибутом data-lang
  const elements = document.querySelectorAll('[data-lang]');

  elements.forEach((element) => {
    // Получаем значение атрибута для нужного языка
    const text = element.getAttribute(`data-lang-${lang}`);
    if (text) {
      // Заменяем текст элемента на соответствующий язык
      element.textContent = text;
    }
  });

  // Устанавливаем язык для ссылки на главную страницу
  const mainLink = document.querySelector('#mainLink');
  if (mainLink) {
    mainLink.setAttribute('href', `main.html?lang=${lang}`);
  }
}

// Проверяем, сохранен ли язык в localStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const storedLanguage = localStorage.getItem('language');
  if (storedLanguage) {
    changeLanguage(storedLanguage);
  }
});

