import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        navigate("/dashboard");
      } catch {}
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const user = await Auth.signIn(email, password);

      if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        await Auth.completeNewPassword(user, password);
      }

      const currentUser = await Auth.currentAuthenticatedUser();
      const userEmail = currentUser.attributes?.email || "Unknown";

      await Auth.currentSession(); // (optional) get session if needed

      setMessage(`✅ Logged in as: ${userEmail}`);
      navigate("/dashboard");
    } catch (err) {
      setMessage(`❌ Login failed: ${err.message}`);
    }
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
            <h2 className="text-2xl font-bold mb-6">Welcome Back!</h2>

            {message && (
              <div
                className={`mb-4 text-sm text-center font-medium ${
                  message.startsWith("✅")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {message}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-indigo-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
              >
                Sign In
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/register" className="text-indigo-600 hover:underline">
                Sign up
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
                Never Run Out of Pet Food Again
              </h3>
              <p className="text-gray-600 mb-4">
                Join Smart Pet for convenient pet food delivery on your schedule.
                Your pets will thank you!
              </p>
              <ul className="space-y-2 text-left max-w-sm mx-auto">
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Premium quality pet food
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Flexible delivery schedule
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Free shipping on subscriptions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
