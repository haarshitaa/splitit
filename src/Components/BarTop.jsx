import React, { useEffect, useState } from 'react';
import { Avatar, AvatarGroup } from '@mui/material';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';  
import { toast } from 'react-toastify';  
import { Friends } from '../Pages/Friends';
import { motion } from "framer-motion";
import Tooltip from '@mui/material/Tooltip';

export function BarTop({ friends}) {  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      toast.error('No token found! Redirecting to signin.');
      navigate('/signin');
    }
  }, [navigate, token]);

  const getInitials = (name) => {
    if (!name) return ''; 
    return name
      .split(' ')
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  };

  const handleFriends = () => {
    navigate('/friends');
  };

  return (

    <div className="w-full fixed z-60 bg-gradient-to-r from-customBg to-customBgLight h-16 top-0">
      <div className="ml-96 flex items-center justify-between h-full px-4 ">
        <div className="ml-24 flex gap-8  mt-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mx-10"
        >
          <Link to="/dashboard">
              <p className="font-mono font-normal text-2xl text-white cursor-pointer">
                DASHBOARD
              </p>
            </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mx-10"
        >
            <Link to="/history">
              <p className="font-mono font-normal text-2xl text-white cursor-pointer">
                HISTORY
              </p>
            </Link>
            </motion.div>
            <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mx-10"
        >
          <Link to="/groups">
              <p className="font-mono font-normal text-2xl text-white cursor-pointer">
                GROUPS
              </p>
            </Link>
            </motion.div>
        </div>

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
              backgroundColor: 'var(--profileclr)', // Fallback
              borderColor: 'var(--border-profileclr)', // Fallback
              borderWidth: 2,
              borderStyle: 'solid'
            }}
          >
            {getInitials(friend.name)}
          </Avatar>
        ))
      ) : (
        <Avatar 
          className="bg-profileclr border-profileclr"
          sx={{
            backgroundColor: 'var(--profileclr)',
            borderColor: 'var(--border-profileclr)',
            borderWidth: 2,
            borderStyle: 'solid'
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
  );
}


{/* <span className="text-3xl text-white">{getInitial(user)}</span> */}
