import { useState, useEffect } from 'react';
import { CreateFriendModal } from '../Components/CreateFriendModal';  
import axios from 'axios';
import { toast } from 'react-toastify';

export function Friends({ friends, loadfriend, currentUser }) {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showCreateFriendModal, setShowCreateFriendModal] = useState(false);
  const [showCreateSplitModal, setShowCreateSplitModal] = useState(false);
  const [balanceDetails, setBalanceDetails] = useState(null);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch balance details when a friend is selected
  useEffect(() => {
    if (selectedFriend) {
      fetchBalanceDetails(selectedFriend.id);
    }
  }, [selectedFriend]);

  const fetchBalanceDetails = async (friendId) => {
    try {
      setLoadingBalance(true);
      const response = await axios.get(`https://splititb.harshitacodes.workers.dev/balances/${friendId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setBalanceDetails(response.data.data);
      } else {
        toast.error(response.data.message || 'Failed to fetch balance details');
      }
    } catch (error) {
      console.error('Error fetching balance details:', error);
      toast.error('Failed to fetch balance details');
    } finally {
      setLoadingBalance(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] w-full  gap-4">
      {/* Left side - User and friend details */}
      <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md border border-gray-200 mb-32">
        <div className="p-6 border-b border-gray-200">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Your Info</h2>
            <p className="text-gray-600">Welcome back, {currentUser?.name}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {selectedFriend ? (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold">{selectedFriend.name}</h3>
                <p className="text-gray-500">{selectedFriend.email}</p>
              </div>

              {loadingBalance ? (
                <div className="flex items-center justify-center py-8">
                  <p>Loading balance details...</p>
                </div>
              ) : balanceDetails ? (
                <>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <p className="font-medium">You owe {selectedFriend.name}</p>
                      <p className="text-2xl text-red-500">
                        {balanceDetails.currentBalance.type === 'you_owe' 
                          ? formatCurrency(balanceDetails.currentBalance.amount)
                          : '₹0.00'}
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <p className="font-medium">{selectedFriend.name} owes you</p>
                      <p className="text-2xl text-green-600">
                        {balanceDetails.currentBalance.type === 'owes_you' 
                          ? formatCurrency(balanceDetails.currentBalance.amount)
                          : '₹0.00'}
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowCreateSplitModal(true)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition mt-6"
                  >
                    Create Split with {selectedFriend.name}
                  </button>
                </>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <p className="text-gray-500">No balance information available</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8 space-y-4">
              <img 
                src="https://blush.design/api/download?shareUri=zw6Ch_oON23UOCNi&c=Elements_0%7E7f72b4_Skin_0%7E2fbaa6&w=800&h=800&fm=png" 
                alt="No friends selected"
                className="w-64 h-64" 
              />
              <p className="text-gray-500 text-lg">Select a friend to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Right side - Friends list */}
      <div className="w-80 flex flex-col bg-white rounded-lg shadow-md border border-gray-200 mb-32">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Friends ({friends?.length || 0})</h2>
            <button 
              onClick={() => setShowCreateFriendModal(true)}
              className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition"
            >
              + Add Friend
            </button>
          </div>
        </div>

        {/* Scrollable friends list container */}
        <div className="flex-1 overflow-y-auto p-4">
          {loadfriend ? (
            <div className="h-full flex items-center justify-center">
              <p>Loading friends...</p>
            </div>
          ) : friends && friends.length > 0 ? (
            <div className="space-y-3">
              {friends.map((friend) => (
                <div 
                  key={friend.id}
                  onClick={() => setSelectedFriend(friend)}
                  className={`border border-gray-200 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                    selectedFriend?.id === friend.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <p className="font-semibold">{friend.name}</p>
                  <p className="text-sm text-gray-500 truncate">{friend.email}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p>No friends found</p>
            </div>
          )}
        </div>
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