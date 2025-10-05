import { useState } from "react";

import { Link, useNavigate } from "react-router";
import { useAuthCtx } from "../context/AuthContext";

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuthCtx();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded py-2 focus:outline-indigo-600"
            />
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
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded py-2 focus:outline-indigo-600"
            />
          </div>
          <div className="mt-2">
            <button
              className="py-2 px-6 rounded-lg bg-indigo-600 text-white font-bold border
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
