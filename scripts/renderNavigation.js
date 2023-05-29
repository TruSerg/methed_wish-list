import { API_URL, JWT_TOKEN_KEY } from "./const.js";
import { createBurgerMenu } from "./createBurgerMenu.js";
import { createElement } from "./helper.js";
import { auth, router } from "./index.js";
import { renderModal } from "./renderModal.js";

const nav = document.querySelector(".nav");

createBurgerMenu(nav, "nav_active", ".nav__btn");

export const renderNavigation = () => {
  nav.textContent = "";

  if (auth.login) {
    const buttonEditProfile = createElement("button", {
      className: "nav__btn btn",
      textContent: "Редактировать профиль",
    });

    buttonEditProfile.addEventListener("click", () => {
      router.setRoute(`/editprofile/${auth.login}`);
    });

    const buttonAddWish = createElement("button", {
      className: "nav__btn btn",
      textContent: "Добавить желание",
    });

    buttonAddWish.addEventListener("click", () => {
      router.setRoute("/editwish/newwish");
    });

    const buttonLogout = createElement("button", {
      className: "nav__btn btn",
      textContent: "Выйти",
    });

    buttonLogout.addEventListener("click", () => {
      localStorage.removeItem(JWT_TOKEN_KEY);

      auth.login = "";

      router.setRoute("/");
    });

    nav.append(buttonEditProfile, buttonAddWish, buttonLogout);

    return;
  }

  const buttonSignUp = createElement("button", {
    className: "nav__btn btn",
    textContent: "Зарегистрироваться",
  });

  buttonSignUp.addEventListener("click", () => {
    renderModal({
      title: "Регистрация",
      description: "Введите ваши данные для регистрации на сервисе WishList",
      btnSubmit: "Зарегистрироваться",
      submitHandler: async (e) => {
        const formData = new FormData(e.target);

        const credentials = {
          login: formData.get("login"),
          password: formData.get("password"),
        };

        try {
          const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (res.ok) {
            const data = await res.json();

            localStorage.setItem(JWT_TOKEN_KEY, data.token);

            auth.login = data.login;

            router.setRoute(`/user/${data.login}`);

            return true;
          } else {
            const { message = "Неизвестная ошибка" } = await res.json();

            console.log(message);

            throw new Error(message);
          }
        } catch (e) {
          alert(e.message);
        }
      },
    });
  });

  const buttonLogin = createElement("button", {
    className: "nav__btn btn",
    textContent: "Войти",
  });

  buttonLogin.addEventListener("click", () => {
    renderModal({
      title: "Авторизация",
      description: "Введите ваши данные для входа в личный кабинет",
      btnSubmit: "Авторизоваться",
      submitHandler: async (e) => {
        const formData = new FormData(e.target);

        const credentials = {
          login: formData.get("login"),
          password: formData.get("password"),
        };

        try {
          const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (res.ok) {
            const data = await res.json();

            localStorage.setItem(JWT_TOKEN_KEY, data.token);

            auth.login = data.login;

            router.setRoute(`/user/${data.login}`);

            return true;
          } else {
            const { message = "Неизвестная ошибка" } = await res.json();

            console.log(message);

            throw new Error(message);
          }
        } catch (e) {
          alert(e.message);
        }
      },
    });
  });

  nav.append(buttonSignUp, buttonLogin);
};
