import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AwsAmplifyCongnitoAuth from "../../utils/AwsAmplifyCognitoAuth";

const UserLogggedIn = (Component) => {
  const UpdatedComponent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
      getUserLoggedInStatus();
    }, []);

    const getUserLoggedInStatus = async () => {
      const amplifyAuth = new AwsAmplifyCongnitoAuth();
      const userLoggedIn = await amplifyAuth.isUserLoggedIn();
      setIsLoggedIn(userLoggedIn);
    };

    return <>{isLoggedIn ? <Component /> : <Navigate to="/signIn" />}</>;
  };
  return <UpdatedComponent />;
};

export default UserLogggedIn;
