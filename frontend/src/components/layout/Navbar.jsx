import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { authAPI } from "../../utils/api";

const Navbar = () => {
  const { user, setUser, handleSuccess, handleError } = useAuth();
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();

  const getRandomAvatar = () => {
    return `https://api.dicebear.com/9.x/fun-emoji/svg`;
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      handleSuccess("Logged out successfully");
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-lg px-4">
      <div className="flex-1">
        <Link to="/home" className="text-xl font-bold">
          TaskApp
        </Link>
      </div>
      <div className="flex-none gap-2">
        {user ? (
          <>
            <span className="mr-4">{`Hello, ${user.name}`}</span>
            <Link to="/dashboard" className="btn btn-ghost">
              Task Dashboard
            </Link>
            <Link to="/feed" className="btn btn-ghost">
              Feed
            </Link>
            <button className="btn btn-ghost" onClick={toggleTheme}>
              <span className="material-icons">
                {document.documentElement.getAttribute("data-theme") ===
                "dracula"
                  ? "wb_sunny"
                  : "nights_stay"}
              </span>
            </button>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={getRandomAvatar()}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <button onClick={handleLogout} className="text-error">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Link to="/" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
