import { Route, Routes } from "react-router";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
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
        </Routes>
      </main>
      <Pagination />
      <Footer />
    </>
  );
};

export default App;
