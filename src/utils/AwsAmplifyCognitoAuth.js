import { Auth } from "aws-amplify";
import Cookies from "js-cookie";
import { get } from "lodash";
import { REFRESH_TOKEN_INTERVAL_TIME } from "../configs/constants";

export default class AwsAmplifyCongnitoAuth {
  constructor() {
    this.auth = Auth;
    this.timerId = null;
  }

  signInToCognito = async (username, password) => {
      const response = await Auth.signIn(username, password);
      Cookies.set("userAccessToken", get(response, ['signInUserSession', 'accessToken', 'jwtToken']), { expires: 1 });
      await this.getUserNameFromAmplify();
      clearInterval(this.timerId);
      this.timerId = setInterval(this.refreshExistingToken, REFRESH_TOKEN_INTERVAL_TIME)
  }
      


   isUserLoggedIn = async () => {
    const isTokenValid = await this.validateToken();
    if (isTokenValid) {
      return true;
    } else {
      return false;
    }
  }

  validateToken = async () => {
    try {
      const currentSession = await Auth.currentSession();
      const userAccessToken = Cookies.get("userAccessToken");
      if (
        userAccessToken &&
        userAccessToken ===
          get(currentSession, ["accessToken", "jwtToken"])
      ) {
        return true;
      }
      return false;
    } catch (e) {
      console.error('Error while validating token', e);
      return false;
    }
  }

  refreshExistingToken = async () => {
    const currentUserData = await  Auth.currentAuthenticatedUser();
    const currentSession = await Auth.currentSession();
    await currentUserData.refreshSession(currentSession.refreshToken, this.refreshTokenCallback); 
  }

   refreshTokenCallback = async (p1, cognitoData) => {
    const accessToken = get(cognitoData, "accessToken.jwtToken");
    // Updating access token in cookies
    Cookies.set("userAccessToken", accessToken, { expires: 1 });
    await this.getUserNameFromAmplify();
  }

  getUserNameFromAmplify = async () => {
    try {
      const currentUserData = await Auth.currentAuthenticatedUser();
      const email = get(currentUserData, ["attributes", "email"]);
      const emailUserName = email.split('@')[0];
      // removing special characters from emailUserName
      const userName = emailUserName.replace(/[^a-zA-Z0-9]/g, '');
      Cookies.set("userName", userName);
      return userName;
    } catch (error) {
      console.log(error);
    }
  }
}