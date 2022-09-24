import "./App.css";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import routes from "./configs/routes";
import NavigationBar from "./components/Navbar";
import { withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          {routes.map((route, index) => (
            <Route
              exact
              path={route.path}
              element={route.component}
              key={index}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
