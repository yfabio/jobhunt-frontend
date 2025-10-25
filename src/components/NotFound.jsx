import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex flex-col items-center justify-center mt-30 gap-2 p-4">
        <h1 className="text-4xl font-bold text-indigo-600">404</h1>
        <p className="text-6xl font-bold">Page not found</p>
        <p className="text-lg text-gray-500 mt-4">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="group flex items-center gap-2 ">
          <FaArrowLeft className="text-indigo-600 group-hover:cursor-pointer" />
          <button
            onClick={() => navigate("/")}
            className="border-o bg-none group-hover:cursor-pointer text-indigo-600">
            Back to home
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
