// COMEEE TOOO MEEE IFFFF ANYY THINGNGNGNGNGNG GOOOESS WRROONNNNNGGGGGGGGG thisss
// import React, { useState } from 'react';
// import { CreateSplitBox } from './CreateSplitBox';

// export function DashCom() {
//   const [user, setUser] = useState({ name: 'Guest' }); // Default user data
//   const [isCreateSplitOpen, setIsCreateSplitOpen] = useState(false);

//   const handleCreateSplitClick = () => {
//     setIsCreateSplitOpen(true);
//   };

//   const handleCloseCreateSplit = () => {
//     setIsCreateSplitOpen(false);
//   };

//   return (
//     <div>
//     <div className="p-6 space-y-6 flex justify-between">
//       <div className="h-72 border w-full p-6 flex justify-between rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 shadow-md">
//         <div className="pt-10">
//           <p className="text-4xl font-bold text-black mb-5">
//             Hi {user?.name || 'Guest'}!
//           </p>
//           <p className="text-gray-600">Welcome back! Ready to manage your splits?</p>
//         </div>
//         <div>
//           <img src="/assets/hellochar.png" className="h-60" alt="Hello" />
//         </div>
//       </div>

//       <div className="flex justify-center">
//         <button
//           className="h-16 w-44 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transform transition"
//           onClick={handleCreateSplitClick}
//         >
//           CREATE SPLIT
//         </button>
//       </div>

//       {/* Create Split Dialog */}
//       <CreateSplitBox
//         isOpen={isCreateSplitOpen}
//         onClose={handleCloseCreateSplit}
//       />
//     </div>
//     <div>
      
//     </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { CreateSplitBox } from "./CreateSplitBox";

export function DashCom({ user , isloading1}) {
  const [isCreateSplitOpen, setIsCreateSplitOpen] = useState(false);

  const handleCreateSplitClick = () => {
    setIsCreateSplitOpen(true);
  };

  const handleCloseCreateSplit = () => {
    setIsCreateSplitOpen(false);
  };

  return (
    <div>
      <div className="p-6 space-y-6 flex justify-between">
        <div className="h-72 border w-full p-6 flex justify-between rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 shadow-md">
          <div className="pt-10">
            <p className="text-4xl font-bold text-black mb-5">
              Hi {isloading1?"...":user}
            </p>
            <p className="text-gray-600">Welcome back! Ready to manage your splits?</p>
          </div>
          <div>
            <img src="/assets/hellochar.png" className="h-60" alt="Hello" />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="h-16 w-44 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transform transition"
            onClick={handleCreateSplitClick}
          >
            CREATE SPLIT
          </button>
        </div>

        {/* Create Split Dialog */}
        <CreateSplitBox isOpen={isCreateSplitOpen} onClose={handleCloseCreateSplit} />
      </div>
    </div>
  );
}







// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { CreateSplitBox } from './CreateSplitBox';

// export function DashCom() {
//   const [user, setUser] = useState({ name: 'Guest' }); // Default user data
//   const [isCreateSplitOpen, setIsCreateSplitOpen] = useState(false);
//   const [balances, setBalances] = useState([]); // Store balances

//   // Fetch balances from the API
//   useEffect(() => {
//     const fetchBalances = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8787/getbalances', {
//           withCredentials: true, // Needed if using cookies for authentication
//         });
//         setBalances(response.data);
//       } catch (error) {
//         console.error('Error fetching balances:', error);
//       }
//     };

//     fetchBalances();
//   }, []);

//   const handleCreateSplitClick = () => {
//     setIsCreateSplitOpen(true);
//   };

//   const handleCloseCreateSplit = () => {
//     setIsCreateSplitOpen(false);
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header Section */}
//       <div className="h-72 border w-full p-6 flex justify-between rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 shadow-md">
//         <div className="pt-10">
//           <p className="text-4xl font-bold text-black mb-5">
//             Hi {user?.name || 'Guest'}!
//           </p>
//           <p className="text-gray-600">Welcome back! Ready to manage your splits?</p>
//         </div>
//         <div>
//           <img src="/assets/hellochar.png" className="h-60" alt="Hello" />
//         </div>
//       </div>

//       {/* Create Split Button */}
//       <div className="flex justify-center">
//         <button
//           className="h-16 w-44 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transform transition"
//           onClick={handleCreateSplitClick}
//         >
//           CREATE SPLIT
//         </button>
//       </div>

//       {/* Display Balances */}
//       <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
//         <h2 className="text-xl font-semibold mb-4">Your Balances</h2>
//         {balances.length === 0 ? (
//           <p className="text-gray-500">No balances found.</p>
//         ) : (
//           <ul className="space-y-3">
//             {balances.map((balance) => (
//               <li
//                 key={balance.id}
//                 className={`p-4 rounded-lg shadow-md ${
//                   balance.type === 'owed' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
//                 }`}
//               >
//                 {balance.type === 'owed' ? (
//                   <>
//                     You owe <strong>{balance.name}</strong> ₹{balance.amount}
//                   </>
//                 ) : (
//                   <>
//                     <strong>{balance.name}</strong> owes you ₹{balance.amount}
//                   </>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Create Split Dialog */}
//       <CreateSplitBox isOpen={isCreateSplitOpen} onClose={handleCloseCreateSplit} />
//     </div>
//   );
// }

