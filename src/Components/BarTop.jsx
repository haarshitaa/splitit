import React, { useEffect, useState } from 'react';
import { Avatar, AvatarGroup } from '@mui/material';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';  
import { toast } from 'react-toastify';  
import { Friends } from '../Pages/Friends';

export function BarTop({ friends}) {  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      toast.error('No token found! Redirecting to login.');
      navigate('/login');
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
    <div className="w-full fixed z-60 bg-customBg h-16 top-0">
      <div className="ml-96 flex items-center justify-between h-full px-4 border border-black">
        <div className="ml-24 flex gap-8 border border-black mt-4">
          <div className="mx-10">
          <Link to="/dashboard">
              <p className="font-mono font-normal text-2xl text-white cursor-pointer">
                DASHBOARD
              </p>
            </Link>
          </div>
          <div className="mx-10">
            <Link to="/history">
              <p className="font-mono font-normal text-2xl text-white cursor-pointer">
                HISTORY
              </p>
            </Link>
          </div>
          <div className="mx-10">
          <Link to="/groups">
              <p className="font-mono font-normal text-2xl text-white cursor-pointer">
                GROUPS
              </p>
            </Link>
          </div>
        </div>

        <div className="border border-black cursor-pointer" onClick={handleFriends}>
          {/* Displaying friends using AvatarGroup */}
          <AvatarGroup max={4}>
            {Array.isArray(friends) && friends.length > 0 ? (
              friends.map((friend) => (
                <Avatar key={friend.id}>{getInitials(friend.name)}</Avatar>
              ))
            ) : (
              <p className="text-white text-sm">No friends</p> 
            )}
          </AvatarGroup>
        </div>
      </div>
    </div>
  );
}

