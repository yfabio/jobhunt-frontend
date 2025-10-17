import { Route, Routes } from "react-router";

import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import UserPage from "./pages/UserPage";

const App = () => {
  return (
    <>
      <Header />
      <main className="">
        <Routes>
          <Route
            path="/*"
            Component={HomePage}
          />
          <Route
            path="/signin"
            Component={SigninPage}
          />
          <Route
            path="/signup"
            Component={SignupPage}
          />
          <Route
            path="/user"
            Component={UserPage}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
