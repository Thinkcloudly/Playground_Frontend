import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../../utils/userHelperFuncs";

const UserLogggedIn = (Component) => {
  const UpdatedComponent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
      getUserLoggedInStatus();
    }, []);

    const getUserLoggedInStatus = async () => {
      const userLoggedIn = await isUserLoggedIn();
      setIsLoggedIn(userLoggedIn);
    };

    return <>{isLoggedIn ? <Component /> : <Navigate to="/signIn" />}</>;
  };
  return <UpdatedComponent />;
};

export default UserLogggedIn;
