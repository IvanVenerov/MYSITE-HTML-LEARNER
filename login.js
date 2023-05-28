const registerButton = document.getElementById("registerButton");
const loginButton = document.getElementById("loginButton");
const adminButton = document.getElementById("adminButton");
const registerPopup = document.getElementById("registerPopup");
const loginPopup = document.getElementById("loginPopup");
const adminPopup = document.getElementById("adminPopup");
const closeButtons = document.querySelectorAll(".close");

registerButton.addEventListener("click", function () {
  registerPopup.classList.add("open");
  clearInputFields("registerUsername", "registerPassword");
});

loginButton.addEventListener("click", function () {
  loginPopup.classList.add("open");
  clearInputFields("loginUsername", "loginPassword");
});

adminButton.addEventListener("click", function () {
  adminPopup.classList.add("open");
  clearInputFields("adminUsername", "adminPassword");
});

closeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const popup = button.parentElement.parentElement;
    popup.classList.remove("open");
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    registerPopup.classList.remove("open");
    loginPopup.classList.remove("open");
    adminPopup.classList.remove("open");
  }
});

const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const usernameInput = document.getElementById("registerUsername");
  const passwordInput = document.getElementById("registerPassword");
  const message = document.getElementById("registerMessage");

  const usernamePattern = /^[a-zA-Z0-9_]{8,20}$/;
  const passwordPattern = /^[a-zA-Z0-9_]{8,20}$/;

  if (!usernamePattern.test(usernameInput.value)) {
    message.style.color = "red";
    message.textContent =
      "Пожалуйста, введите логин на английском языке, минимум 8 символов, максимум - 20";
    return;
  }

  if (!passwordPattern.test(passwordInput.value)) {
    message.style.color = "red";
    message.textContent =
      "Пожалуйста, введите пароль на английском языке, минимум 8 символов, максимум - 20";
    return;
  }

  if (localStorage.getItem(usernameInput.value)) {
    message.style.color = "red";
    message.textContent = "Пользователь с таким логином уже существует";
  } else {
    localStorage.setItem(usernameInput.value, passwordInput.value);
    message.style.color = "green";
    message.textContent = "Регистрация успешна";
  }

  usernameInput.value = "";
  passwordInput.value = "";
});

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const usernameInput = document.getElementById("loginUsername");
  const passwordInput = document.getElementById("loginPassword");
  const message = document.getElementById("loginMessage");

  const usernamePattern = /^[a-zA-Z0-9_]{8,20}$/;
  const passwordPattern = /^[a-zA-Z0-9_]{8,20}$/;

  if (!usernamePattern.test(usernameInput.value)) {
    message.style.color = "red";
    message.textContent =
      "Пожалуйста, введите логин на английском языке, минимум 8 символов, максимум - 20";
    return;
  }

  if (!passwordPattern.test(passwordInput.value)) {
    message.style.color = "red";
    message.textContent =
      "Пожалуйста, введите пароль на английском языке, минимум 8 символов, максимум - 20";
    return;
  }

  if (
    usernameInput.value === "admin_ivan" &&
    passwordInput.value === "Lorem13btc"
  ) {
    message.style.color = "green";
    message.textContent = "Вход успешен";

    usernameInput.value = "";
    passwordInput.value = "";

    setTimeout(function () {
      window.location.href = "adminpanel.html";
    }, 3000);
  } else if (localStorage.getItem(usernameInput.value) === passwordInput.value) {
    message.style.color = "green";
    message.textContent = "Вход успешен";

    usernameInput.value = "";
    passwordInput.value = "";

    setTimeout(function () {
      window.location.href = "main.html";
    }, 3000);
  } else {
    message.style.color = "red";
    message.textContent = "Неверный логин или пароль";
  }
});

const adminForm = document.getElementById("adminForm");
adminForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const usernameInput = document.getElementById("adminUsername");
  const passwordInput = document.getElementById("adminPassword");
  const message = document.getElementById("adminMessage");

  const usernamePattern = /^[a-zA-Z0-9_]{8,20}$/;
  const passwordPattern = /^[a-zA-Z0-9_]{8,20}$/;

  if (!usernamePattern.test(usernameInput.value)) {
    message.style.color = "red";
    message.textContent =
      "Пожалуйста, введите логин на английском языке, минимум 8 символов, максимум - 20";
    return;
  }

  if (!passwordPattern.test(passwordInput.value)) {
    message.style.color = "red";
    message.textContent =
      "Пожалуйста, введите пароль на английском языке, минимум 8 символов, максимум - 20";
    return;
  }

  if (
    usernameInput.value === "admin_ivan" &&
    passwordInput.value === "Lorem13btc"
  ) {
    message.style.color = "green";
    message.textContent = "Вход успешен";

    usernameInput.value = "";
    passwordInput.value = "";

    setTimeout(function () {
      window.location.href = "adminpanel.html";
    }, 3000);
  } else {
    message.style.color = "red";
    message.textContent = "Неверный логин или пароль";
  }
});

function togglePasswordVisibility(inputId) {
  const passwordInput = document.getElementById(inputId);
  const showPasswordButton = document.querySelector(
    `#${inputId} + .show-password-button`
  );

  event.preventDefault();

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showPasswordButton.textContent = "Hide password";
  } else {
    passwordInput.type = "password";
    showPasswordButton.textContent = "Show password";
  }
}

function clearInputFields(...inputIds) {
  inputIds.forEach(function (inputId) {
    const input = document.getElementById(inputId);
    input.value = "";
  });
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
}

// Проверяем, сохранен ли язык в localStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const storedLanguage = localStorage.getItem('language');
  if (storedLanguage) {
    changeLanguage(storedLanguage);
  }
});



