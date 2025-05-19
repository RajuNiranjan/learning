import { Link } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Loader, EyeOpenIcon, EyeCloseIcon, GroupLogo } from "../assets";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signup } = useAuth();
  const { isSignUploading } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    if (name === "confirmPassword" || name === "password") {
      if (name === "password") {
        if (value !== formData.confirmPassword) {
          setError("Passwords do not match");
        } else if (
          value.length < 8 ||
          !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            value
          )
        ) {
          setError(
            "Use 8 or more characters with a mix of letters, numbers & symbols"
          );
        } else {
          setError(null);
        }
      } else {
        if (value !== formData.password) {
          setError("Passwords do not match");
        } else if (
          formData.password.length < 8 ||
          !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            formData.password
          )
        ) {
          setError(
            "Use 8 or more characters with a mix of letters, numbers & symbols"
          );
        } else {
          setError(null);
        }
      }
    }

    setFormData(updatedFormData);
  };

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <div className="space-y-6">
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Create an account
                </h1>
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Log in
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSignup} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChangeInput}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChangeInput}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChangeInput}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        <img
                          loading="lazy"
                          src={showPassword ? EyeOpenIcon : EyeCloseIcon}
                          alt={showPassword ? "Hide password" : "Show password"}
                          className="w-5 h-5"
                        />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChangeInput}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 mt-1">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSignUploading}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSignUploading ? (
                    <div className="flex items-center justify-center gap-2">
                      <span>Creating account...</span>
                      <img
                        loading="lazy"
                        src={Loader}
                        alt="Loading"
                        className="w-5 h-5 animate-spin"
                      />
                    </div>
                  ) : (
                    "Create account"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:flex md:w-1/2 bg-indigo-600 items-center justify-center p-12">
          <div className="text-center">
            <img
              loading="lazy"
              src={GroupLogo}
              alt="Group Logo"
              className="w-48 h-48 mx-auto mb-8"
            />
            <h2 className="text-2xl font-bold text-white mb-4">
              Welcome to Our Platform
            </h2>
            <p className="text-indigo-100">
              Join our community and start connecting with others today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
