import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthContext";
import { JobsProvider } from "../context/JobsContext";
import { ProfileProvider } from "../context/ProfileContext";
import { ToastContainer } from "react-toastify";

const AppLayout = () => {
  return (
    <>
      <AuthProvider>
        <JobsProvider>
          <main className="container mx-auto px-8">
            <Header />
            <ProfileProvider>
              <Outlet />
            </ProfileProvider>
          </main>
          <ToastContainer autoClose={1000} />
          <Footer />
        </JobsProvider>
      </AuthProvider>
    </>
  );
};

export default AppLayout;
