import { createElement } from "./helper.js";
import { auth } from "./index.js";
import { getUser } from "./serviceAPI.js";

export const createWishList = async (pageLogin) => {
  const login = auth.login;

  if (!pageLogin) {
    pageLogin = login;
  }

  const user = await getUser(pageLogin);

  //   {
  //     "id": "f50f3aba-e5fd-48aa-a86d-2b50f5369878",
  //     "login": "petr",
  //     "wish": {},
  //     "avatar": "avatars/empty.png",
  //     "birthdate": ""
  // }

  const section = createElement("section", {
    className: "wishlist",
  });

  const container = createElement("div", {
    className: "container",
  });

  section.append(container);

  const profile = createElement("div", {
    className: "wishlist__profile profile",
  });

  const avatar = createElement("img", {
    className: "profile__avatar",
    src: "img/avatar.png",
    alt: "фото Иван Петров",
  });

  const content = createElement("div", {
    className: "profile__content",
  });

  const fullname =
    user.name || user.surname
      ? `${user.name || ""} ${user.surname || ""}`.trim()
      : user.login;

  const title = createElement("h2", {
    className: "profile__fullname",
    textContent: fullname,
  });

  content.append(title);

  if (user.birthday) {
    const birthday = new Date(user.birthday);
    const day = birthday.getDate();
    const month = birthday.toLocaleString("default", { month: "long" });
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    const birthdayElem = createElement("p", {
      className: "profile__birthday",
      textContent: "15 июля исполнится 55 лет",
    });

    content.append(birthdayElem);
  }

  const editBtn = createElement("button", {
    className: "profile__edit",
  });
};
