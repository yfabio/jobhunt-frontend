import { useState } from "react";

import { Link, useNavigate } from "react-router";
import { useAuthCtx } from "../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "employee",
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
          <div className="flex gap-4 mt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="employee"
                checked={formData.role === "employee"}
                onChange={handleChange}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="text-gray-700 font-medium">Employee</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="employer"
                checked={formData.role === "employer"}
                onChange={handleChange}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="text-gray-700 font-medium">Employer</span>
            </label>
          </div>
          <div className="mt-2">
            <button
              className="py-2 px-6 rounded-lg bg-indigo-600 text-white font-bold border
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

export default LoginPage;
