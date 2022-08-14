import { Auth } from "aws-amplify";
import Cookies from "js-cookie";
import { get } from "lodash";

export const isUserLoggedIn = async () => {
  const userAccessToken = Cookies.get("userAccessToken");
  const currentUserData = await  Auth.currentAuthenticatedUser();
  const currentSession = await Auth.currentSession();
  console.log("F-7", currentUserData);
  console.log("F-8", currentSession);
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


export const getUserNameFromAmplify = async () => {
  try {
    const currentUserData = await Auth.currentAuthenticatedUser();
    const email = get(currentUserData, ["attributes", "email"]);
    const emailUserName = email.split('@')[0];
    // removing special characters from emailUserName
    const userName = emailUserName.replace(/[^a-zA-Z0-9]/g, '');
    return userName;
  } catch (error) {
    console.log(error);
  }
}