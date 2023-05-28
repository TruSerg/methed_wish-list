import { auth } from "./index.js";

export const createWishList = async (pageLogin) => {
  const login = auth.login;

  if (!pageLogin) {
    pageLogin = login;
  }

  const user = await getUser(pageLogin);

  console.log(user);
};
