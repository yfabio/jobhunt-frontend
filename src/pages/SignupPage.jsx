import { Link } from "react-router";

import SignupInput from "../model/SignupInput";

import { useAuthCtx } from "../context/AuthContext";

import useValidate from "../hooks/useValidate";

const SignupPage = () => {
  const [state, dispatch, formData] = useValidate(SignupInput);

  const { register } = useAuthCtx();

  const handleChange = (e) => {
    dispatch({ type: "CHANGE", name: e.target.name, value: e.target.value });
  };

  const handleTouch = (e) => {
    dispatch({ type: "TOUCH", name: e.target.name, touched: true });
  };

  const clear = () => dispatch({ type: "CLEAR" });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
    clear();
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
          <div className="flex gap-4 mt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="member"
                checked={state.role.value === "member"}
                onChange={handleChange}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="text-gray-700 font-medium">Member</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="business"
                checked={state.role.value === "business"}
                onChange={handleChange}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="text-gray-700 font-medium">Business</span>
            </label>
          </div>
          <div className="mt-2">
            <button
              disabled={!state.isFormValid}
              className="py-2 px-6 rounded-lg bg-indigo-600 text-white font-bold border disabled:opacity-35 disabled:cursor-not-allowed disabled:bg-gray-400
            hover:bg-indigo-700">
              Register
            </button>
            <Link
              to={"/signin"}
              className="block text-center text-md text-indigo-600 font-thin hover:underline">
              Already have account yet!
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignupPage;
