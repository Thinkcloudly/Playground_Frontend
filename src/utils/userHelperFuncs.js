import { Auth } from "aws-amplify";
import Cookies from "js-cookie";
import { get } from "lodash";

export const isUserLoggedIn = async () => {
  const userAccessToken = Cookies.get("userAccessToken");
  const currentUserData = await  Auth.currentAuthenticatedUser();
  // const currentSession = await Auth.currentSession();
  if (
    userAccessToken &&
    userAccessToken ===
      get(currentUserData, ["signInUserSession", "accessToken", "jwtToken"])
  ) {
    return true;
  } else {
    return false;
  }
};
