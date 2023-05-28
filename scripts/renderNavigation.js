import { API_URL, JWT_TOKEN_KEY } from "./const.js";
import { createBurgerMenu } from "./createBurgerMenu.js";
import { createElement } from "./helper.js";
import { auth, router } from "./index.js";
import { renderModal } from "./renderModal.js";

const nav = document.querySelector(".nav");

createBurgerMenu(nav, "nav_active", ".nav__btn");

export const renderNavigation = () => {
  nav.textContent = "";

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
    console.log("click");
  });

  nav.append(buttonSignUp, buttonLogin);
};
