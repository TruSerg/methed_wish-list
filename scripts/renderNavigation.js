import { createBurgerMenu } from "./createBurgerMenu.js";
import { createElement } from "./helper.js";

const nav = document.querySelector(".nav");

createBurgerMenu(nav, "nav_active");

export const renderNavigation = () => {
  nav.textContent = "";

  const buttonSignUp = createElement("button", {
    className: "nav__btn btn",
    textContent: "Зарегистрироваться",
  });

  buttonSignUp.addEventListener("click", () => {
    console.log("click");
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
