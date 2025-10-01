import { Route, Routes } from "react-router";

import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <Routes>
          <Route
            path="/"
            Component={HomePage}
          />
          <Route
            path="login"
            Component={LoginPage}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
