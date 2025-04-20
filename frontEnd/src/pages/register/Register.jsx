import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("❌ Passwords do not match.");
      return;
    }

    setLoading(true);

    const req = JSON.stringify({
      email: formData.email,
      password: formData.password,
      role: formData.role || "student",
      firstName: formData.firstName,
      lastName: formData.lastName,
    });

    let response;
    await api(
      "create-user",
      req,
      (data) => {
        response = data;
        navigate("/");
      },
      setErrorMsg,
      setLoading
    );
    console.log("data", response);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white max-w-4xl w-full rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-bold flex items-center">
            <i className="fas fa-paw mr-2"></i> Smart Pet
          </h3>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Left - Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6">Create Account</h2>

            {errorMsg && (
              <div className="text-red-500 text-sm mb-4 text-center font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <button
  type="submit"
  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition flex justify-center items-center"
  disabled={loading}
>
  {loading && (
    <svg
      className="animate-spin h-5 w-5 mr-2 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  )}
  {loading ? "Registering..." : "Register"}
</button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/" className="text-indigo-600 hover:underline">
                Back to Login
              </a>
            </p>
          </div>

          {/* Right - Info */}
          <div className="w-full md:w-1/2 bg-indigo-50 p-8 flex items-center">
            <div className="text-center w-full">
              <div className="inline-block bg-indigo-100 p-4 rounded-full mb-4">
                <i className="fas fa-dog text-4xl text-indigo-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Join the Smart Pet Family
              </h3>
              <p className="text-gray-600 mb-4">
                Start your pet’s journey to never missing a meal again. Enjoy flexible subscriptions and free shipping!
              </p>
              <ul className="space-y-2 text-left max-w-sm mx-auto">
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Easy account setup
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Manage pets and orders anytime
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Subscribe and save on every order
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
