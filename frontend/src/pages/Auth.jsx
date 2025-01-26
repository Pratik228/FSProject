import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../utils/api";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const { handleError, handleSuccess, setUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    resetToken: "",
    newPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isForgotPassword) {
        await authAPI.resetPassword({
          email: formData.email,
          resetToken: formData.resetToken,
          newPassword: formData.newPassword,
        });
        handleSuccess("Password reset successful!");
        setIsForgotPassword(false);
        setFormData({
          name: "",
          email: "",
          password: "",
          resetToken: "",
          newPassword: "",
        });
      } else if (isLogin) {
        const response = await authAPI.login(formData);
        setUser(response.data.user);
        handleSuccess("Login successful!");
        navigate("/home");
      } else {
        await authAPI.register(formData);
        handleSuccess("Registration successful! Please login");
        setIsLogin(true);
        setFormData({
          name: "",
          email: "",
          password: "",
          resetToken: "",
          newPassword: "",
        });
      }
    } catch (error) {
      handleError(error);
    }
  };

  if (isForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center">Reset Password</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Reset Token</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter reset token"
                  className="input input-bordered w-full"
                  value={formData.resetToken}
                  onChange={(e) =>
                    setFormData({ ...formData, resetToken: e.target.value })
                  }
                  required
                />
                <label className="label">
                  <span className="label-text-alt text-info">
                    Contact admin for reset token
                  </span>
                </label>
              </div>
              <div>
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  placeholder="New Password"
                  className="input input-bordered w-full"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  required
                  minLength={6}
                />
              </div>
              <button className="btn btn-primary w-full">Reset Password</button>
            </form>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setIsForgotPassword(false);
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  resetToken: "",
                  newPassword: "",
                });
              }}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">
            {isLogin ? "Login" : "Register"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
            )}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                minLength={6}
              />
            </div>
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                  onClick={() => setIsForgotPassword(true)}
                >
                  Forgot Password?
                </button>
              </div>
            )}
            <button className="btn btn-primary w-full">
              {isLogin ? "Login" : "Register"}
            </button>
            <button className="btn btn-outline w-full">
              Continue with Google
            </button>
          </form>
          <p className="text-center mt-4">
            {isLogin ? "No account? " : "Have an account? "}
            <button
              className="link"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  resetToken: "",
                  newPassword: "",
                });
              }}
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
