import { useEffect, useState } from 'react';
import {FriendsBox} from '../Components/FriendsBox'
import axios from 'axios';
import { CreateFriendModal } from '../Components/CreateFriendModal';

// export function Friends({ friends, loadfriend }) {
//     return (
//       <div className="relative h-screen w-full p-4">
//         <div>
//           {loadfriend ? (
//             <p>Loading friends...</p>
//           ) : (
//             <div className="space-y-4">
//               {friends && friends.length > 0 ? (   // Ensure friends array exists before mapping
//                 friends.map((friend) => (
//                   <div key={friend.id} className="border p-4 rounded-lg shadow-md bg-white">
//                     <p className="text-lg font-semibold">Name: {friend.name}</p>
//                     <p className="text-sm text-gray-500">Email: {friend.email}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p>No friends found</p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
  

  export function Friends({ friends, loadfriend, currentUser }) {
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [showCreateFriendModal, setShowCreateFriendModal] = useState(false);
    const [showCreateSplitModal, setShowCreateSplitModal] = useState(false);
  
    return (
      <div className="flex h-screen w-full p-4 gap-4">
        {/* Left side - User and friend details */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6 flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Your Info</h2>
            <p className="text-gray-600">Welcome back, {currentUser?.name}</p>
          </div>
  
          {selectedFriend ? (
            <div className="flex-1">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-xl font-semibold">{selectedFriend.name}</h3>
                <p className="text-gray-500">{selectedFriend.email}</p>
              </div>
  
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium">You owe {selectedFriend.name}</p>
                  <p className="text-2xl text-red-500">₹500.00</p>
                </div>
  
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-medium">{selectedFriend.name} owes you</p>
                  <p className="text-2xl text-green-600">₹250.00</p>
                </div>
              </div>
  
              <button 
                onClick={() => setShowCreateSplitModal(true)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Create Split with {selectedFriend.name}
              </button>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Select a friend to view details</p>
            </div>
          )}
        </div>
  
        {/* Right side - Friends list */}
        <div className="w-80 bg-white rounded-lg shadow-md p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Friends</h2>
            <button 
              onClick={() => setShowCreateFriendModal(true)}
              className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition"
            >
              + Add Friend
            </button>
          </div>
  
          {loadfriend ? (
            <div className="flex-1 flex items-center justify-center">
              <p>Loading friends...</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              {friends && friends.length > 0 ? (
                friends.map((friend) => (
                  <div 
                    key={friend.id} 
                    onClick={() => setSelectedFriend(friend)}
                    className={`border p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-50 transition ${
                      selectedFriend?.id === friend.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                  >
                    <p className="font-semibold">{friend.name}</p>
                    <p className="text-sm text-gray-500 truncate">{friend.email}</p>
                  </div>
                ))
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p>No friends found</p>
                </div>
              )}
            </div>
          )}
        </div>
  
        {/* Modals */}
        {showCreateFriendModal && (
          <CreateFriendModal onClose={() => setShowCreateFriendModal(false)} />
        )}
  
        {showCreateSplitModal && selectedFriend && (
          <CreateSplitModal 
            friend={selectedFriend}
            onClose={() => setShowCreateSplitModal(false)} 
          />
        )}
      </div>
    );
  }