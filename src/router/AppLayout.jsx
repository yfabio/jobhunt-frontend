import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthContext";
import { JobsProvider } from "../context/JobsContext";

const AppLayout = () => {
  return (
    <>
      <AuthProvider>
        <JobsProvider>
          <Header />
          <main className="container mx-auto p-4">
            <Outlet />
          </main>
          <Footer />
        </JobsProvider>
      </AuthProvider>
    </>
  );
};

export default AppLayout;
