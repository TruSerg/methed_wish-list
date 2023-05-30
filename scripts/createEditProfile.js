import { API_URL } from "./const.js";
import { createElement } from "./helper.js";
import { getUser } from "./serviceAPI.js";

export const createEditProfile = async (login) => {
  const user = await getUser(login);

  const sectionEditProfile = createElement("section", {
    className: "edit edit_profile",
  });

  const container = createElement("div", {
    className: "container",
  });

  section.append(container);

  const formProfile = createElement("form", {
    className: "edit__form",
  });

  formProfile.addEventListener("submit", (e) => {
    e.preventDefault();

    // !todo
  });

  const editAvatar = createElement("fieldset", {
    className: "edit__avatar",
  });

  const editAvatarImage = createElement("img", {
    src: `${API_URL}/${user.avatar}`,
    alt: `Аватар ${user.login}`,
    className: "edit__avatar-image",
  });

  const editAvatarLoad = createElement("div", {
    className: "edit__avatar-load",
  });

  const editAvatarLabel = createElement("label", {
    className: "edit__label-avatar",
    htmlFor: "avatar-load",
    innerHTML: `
	 	<svg
         width="30"
         height="30"
         viewBox="0 0 30 30"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
   	>
         	<path
               d="M0.75 29.25H6.6875L24.1992 11.7384L18.2617 5.80086L0.75 23.3125V29.25ZM3.91667 24.6267L18.2617 10.2817L19.7183 11.7384L5.37333 26.0834H3.91667V24.6267ZM25.0858 1.20919C24.9394 1.06241 24.7654 0.94596 24.5738 0.866506C24.3823 0.787052 24.177 0.746155 23.9696 0.746155C23.7622 0.746155 23.5569 0.787052 23.3653 0.866506C23.1738 0.94596 22.9998 1.06241 22.8533 1.20919L19.9558 4.10669L25.8933 10.0442L28.7908 7.14669C28.9376 7.00021 29.0541 6.82622 29.1335 6.63468C29.213 6.44314 29.2539 6.23781 29.2539 6.03044C29.2539 5.82307 29.213 5.61774 29.1335 5.				4262C29.0541 5.23466 28.9376 5.06067 28.7908 4.91419L25.0858 1.20919Z"
               fill="white"
            />
      </svg>
      Обновить фотографию	 
	 `,
  });

  const editAvatarInput = createElement("input", {
    type: "file",
    class: "edit__input-file edit__input-file_avatar",
    accept: "image/jpeg, image/png",
    id: "avatar-load",
    value: `${API_URL}/${user.avatar}`,
  });

  const btnDeleteAvatar = createElement("button", {
    className: "edit__avatar-delete",
    type: "button",
    innerHTML: `
		<svg
			width="23"
			height="29"
			viewBox="0 0 23 29"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M2.48842 25.6389C2.48842 27.35 3.90271 28.75 5.63128 28.75H18.2027C19.9313 28.75 21.3456 27.35 21.3456 25.6389V6.97222H2.48842V25.6389ZM5.63128 10.0833H18.2027V25.6389H5.63128V10.0833ZM17.417 2.30556L15.8456 0.75H7.98842L6.41699 2.30556H0.916992V5.41667H22.917V2.30556H17.417Z"
					fill="white"
				/>
		</svg>
		Удалить
	 `,
  });

  handleImageFileSelection(editAvatarInput, editAvatarImage);

  btnDeleteAvatar.addEventListener("click", () => {
    editAvatarInput.value = "";

    editAvatarImage.src = "img/avatar.png";
  });

  editAvatarLoad.append(editAvatarLabel, editAvatarInput, btnDeleteAvatar);

  editAvatar.append(editAvatarImage, editAvatarLoad);

  const editName = createElement("fieldset", {
    className: "edit__name",
  });

  const editNameLabel = createElement("label", {
    className: "edit__label",
    innerHTML: "<span class='edit__label-text'>Имя:</span>",
  });

  const editNameInput = createElement("input", {
    className: "edit__input",
    type: "text",
    name: "name",
    value: user.name || "",
  });

  editNameLabel.append(editNameInput);

  const editSurnameLabel = createElement("label", {
    className: "edit__label",
    innerHTML: "<span class='edit__label-text'>Фамилия:</span>",
  });

  const editSurnameInput = createElement("input", {
    className: "edit__input",
    type: "text",
    name: "surname",
    value: user.surname || "",
  });

  editSurnameLabel.append(editSurnameInput);

  editName.append(editNameLabel, editSurnameLabel);

  const editBirthday = createElement("fieldset", {
    className: "edit__birthday",
  });

  const editBirthdayLegend = createElement("legend", {
    className: "edit__label-text",
    textContent: "Дата рождения:",
  });

  return { sectionEditProfile, formProfile };
};
