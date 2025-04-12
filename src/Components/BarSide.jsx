import BookIcon from "@mui/icons-material/MenuBook";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Tooltip from '@mui/material/Tooltip';

const sidebarItems = [
  { label: "Articles", icon: <BookIcon />, to: "/articles" },
  { label: "Settings", icon: <SettingsIcon />, to: "/setting" },
];

function SidebarItem({ label, icon, to }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Link
        to={to}
        className={`flex flex-col items-center justify-center w-14 h-20 mx-auto 
                    ${isActive ? "bg-white rounded-full" : "bg-transparent"}`}
      >
        <span className="text-3xl text-white">{icon}</span>
        <span className="text-sm text-gray-200 mt-1">{label}</span>
      </Link>
    </motion.li>
  );
}

export function BarSide({ user }) {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogo = () => {
    navigate("/dashboard");
  }

  const getInitial = (name) => (name ? name[0].toUpperCase() : "?");

  return (
    <aside
      id="separator-sidebar"
      className="fixed left-0 z-60 w-28 h-screen transition-transform translate-x-0 top-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto customBg">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="ml-3"
          onClick={handleLogo}
        >
          <CurrencyExchangeIcon
            sx={{
              fontSize: 60,
              color: "white",
              transform: "rotate(20deg)",
            }}
          />

        </motion.div>

        {/* Sidebar Navigation */}
        <div className="mt-16">
        <ul className="space-y-6 ">
          {sidebarItems.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </ul>
        </div>

        {/* Logout */}
        

        

        {/* User Avatar with animation */}
        <Tooltip title="Profile">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="border rounded-full h-16 w-16 mx-auto mt-44 flex items-center justify-center bg-profileclr cursor-pointer border-profileclr"
          onClick={handleProfile}
        >
          
          <span className="text-3xl text-white">{getInitial(user)}</span>
          
        </motion.div>
        </Tooltip>
        <div className="mt-6">
  <ul className="p-3 mt-auto space-y-6 border-t border-gray-200">
    <motion.li
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center justify-center w-14 h-20 mx-auto"
    >
      <Link
        to="/signin"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }}
        className="flex flex-col items-center text-center"
      >
        <LogoutIcon className="text-white text-3xl" />
        <span className="text-sm text-gray-200 mt-1">Logout</span>
      </Link>
    </motion.li>
  </ul>
</div>
      </div>
    </aside>
  );
}

