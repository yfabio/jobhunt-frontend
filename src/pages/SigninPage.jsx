import { Link, useNavigate } from "react-router";

import SiginInput from "./inputs/SiginInput";
import { useAuthCtx } from "../context/AuthContext";
import useValidate from "../hooks/useValidate";

const SigninPage = () => {
  const [state, dispatch, formData] = useValidate(SiginInput);

  const { login } = useAuthCtx();

  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({ type: "CHANGE", name: e.target.name, value: e.target.value });
  };

  const handleTouch = (e) => {
    dispatch({ type: "TOUCH", name: e.target.name, touched: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    navigate("/", { replace: true });
    login();
  };

  return (
    <section className="container mx-auto">
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col text-lg">
            <label
              htmlFor="email"
              className="block mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={state.email.value}
              onChange={handleChange}
              onBlur={handleTouch}
              className={`w-full border rounded py-2 outline-none transition-colors duration-200 focus:outline-indigo-600 
                ${
                  state.email.touched && !state.email.isValid
                    ? "border-red-500 bg-red-100 placeholder:text-red-600"
                    : ""
                }`}
            />
            {state.email.touched && !state.email.isValid && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>
          <div className="flex flex-col text-lg">
            <label
              htmlFor="password"
              className="block mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={state.password.value}
              onChange={handleChange}
              onBlur={handleTouch}
              className={`w-full border rounded py-2 outline-none transition-colors duration-200 focus:outline-indigo-600 
                ${
                  state.password.touched && !state.password.isValid
                    ? "border-red-500 bg-red-100 placeholder:text-red-600"
                    : ""
                }`}
            />
            {state.password.touched && !state.password.isValid && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
          </div>
          <div className="mt-2">
            <button
              disabled={!state.isFormValid}
              className="py-2 px-6 rounded-lg bg-indigo-600 text-white font-bold border disabled:opacity-35 disabled:cursor-not-allowed disabled:bg-gray-400
            hover:bg-indigo-700">
              Login
            </button>
            <Link
              to={"/signup"}
              className="block text-center text-md text-indigo-600 font-thin hover:underline">
              Don't have account yet?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SigninPage;
