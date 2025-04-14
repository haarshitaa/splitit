import React, { useEffect, useState } from "react";
import { Avatar, AvatarGroup, Snackbar, Alert, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

export function BarTop({ friends, onMenuClick }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setOpen(true);
      setTimeout(() => {
        navigate("/signin");
      }, 2000); // Delay to allow Snackbar to show
    }
  }, [navigate, token]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part[0].toUpperCase())
      .join("");
  };

  const handleFriends = () => navigate("/friends");

  return (
    <>
      <div className="w-full fixed z-60 bg-gradient-to-r from-customBg to-customBgLight h-16 top-0">
        <div className="ml-96 flex items-center justify-between h-full px-4">
          {/* Mobile Menu Icon */}
          <div className="lg:hidden">
            <MenuIcon
              onClick={onMenuClick}
              className="text-white text-3xl cursor-pointer"
            />
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex ml-24 gap-8 mt-4">
            {["dashboard", "history", "groups"].map((route) => (
              <motion.div
                key={route}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="mx-10"
              >
                <Link to={`/${route}`}>
                  <p className="font-mono font-normal text-2xl text-white cursor-pointer">
                    {route.toUpperCase()}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Friends AvatarGroup */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer mr-6"
            onClick={handleFriends}
          >
            <Tooltip title="Friends">
              <AvatarGroup max={4}>
                {Array.isArray(friends) && friends.length > 0 ? (
                  friends.map((friend) => (
                    <Avatar
                      key={friend.id}
                      className="bg-profileclr border-profileclr"
                      sx={{
                        backgroundColor: "var(--profileclr)",
                        borderColor: "var(--border-profileclr)",
                        borderWidth: 2,
                        borderStyle: "solid",
                      }}
                    >
                      {getInitials(friend.name)}
                    </Avatar>
                  ))
                ) : (
                  <Avatar
                    className="bg-profileclr border-profileclr"
                    sx={{
                      backgroundColor: "var(--profileclr)",
                      borderColor: "var(--border-profileclr)",
                      borderWidth: 2,
                      borderStyle: "solid",
                    }}
                  >
                    ?
                  </Avatar>
                )}
              </AvatarGroup>
            </Tooltip>
          </motion.div>
        </div>
      </div>

      {/* Snackbar for no token */}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          No token found! Redirecting to sign in.
        </Alert>
      </Snackbar>
    </>
  );
}

