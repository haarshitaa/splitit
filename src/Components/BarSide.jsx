import BookIcon from "@mui/icons-material/MenuBook";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";

const sidebarItems = [
  { label: "Articles", icon: <BookIcon />, to: "/articles" },
  { label: "Settings", icon: <SettingsIcon />, to: "/setting" },
];

function SidebarItem({ label, icon, to }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        className={`flex flex-col items-center justify-center w-14 h-20 mx-auto 
                    ${isActive ? "bg-white rounded-full" : "bg-transparent"}`}
      >
        <span className="text-3xl text-gray-900 dark:text-white">{icon}</span>
        <span className="text-sm text-gray-700 dark:text-gray-300 mt-1">
          {label}
        </span>
      </Link>
    </li>
  );
}

export function BarSide({ user }) {
  console.log("from bar", user);
  const getInitial = (name) => (name ? name[0].toUpperCase() : "?");

  return (
    <aside
      id="separator-sidebar"
      className="fixed left-0 z-60 w-28 h-screen transition-transform translate-x-0 top-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-customBg">
        {/* Logo */}
        <div>
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="w-34 h-auto mx-auto mb-14"
          />
        </div>

        {/* Sidebar Navigation */}
        <ul className="space-y-6">
          {sidebarItems.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </ul>

        {/* Logout */}
        <ul className="pt-4 mt-auto space-y-6 border-t border-gray-200">
          <li className="flex flex-col items-center justify-center w-14 h-20 mx-auto">
            <Link
              to="/signin"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
              }}
            >
              <span className="text-3xl text-gray-900 dark:text-white">
                <LogoutIcon />
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Logout
              </span>
            </Link>
          </li>
        </ul>

        {/* User Avatar */}
        <div className="flex flex-col items-center mt-10">
          <div className="border rounded-full h-16 w-16 mx-auto mt-28 flex items-center justify-center bg-gray-300">
            <span className="text-3xl text-white">{getInitial(user)}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
