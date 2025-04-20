// import axios from "axios";
// import { useState,useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export function History() {
//     const navigate = useNavigate();
//     const [updates, setUpdates] = useState([]);
//     const token = localStorage.getItem("token");
//     const[loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (!token) {
//             navigate("/signin");
//             return;
//         }
        
//         const fetchAllUpdates = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get('http://127.0.0.1:8787/allupdates', {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });

//                 setUpdates(response.data.data);
//                 console.log(response.data.data);
                
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
        
//         fetchAllUpdates();

//     }, [token, navigate]);

//     const BalanceCard = React.memo(({ name, email, amount, type, formattedAmount, updatedOn }) => {
//         return (
//             <motion.li 
//                 className='px-6 py-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow'
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//             >
//                 <div className='flex items-center justify-between'>
//                     <div className='flex items-center space-x-4'>
//                         <div className='flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center'>
//                             <span className='text-blue-600 font-medium'>
//                                 {name.charAt(0).toUpperCase()}
//                             </span>
//                         </div>
//                         <div>
//                             <h3 className='text-sm font-medium text-gray-900'>{name}</h3>
//                             <p className="text-sm text-gray-500">{email}</p>
//                         </div>
//                     </div>
//                     <div className={`text-sm font-medium ${type === 'you_owe' ? 'text-red-600' : 'text-green-600'}`}>
//                         <div className="flex items-center">
//                             {type === 'you_owe' ? (
//                                 <ArrowDownward className="mr-1" fontSize="small" />
//                             ) : (
//                                 <ArrowUpward className="mr-1" fontSize="small" />
//                             )}
//                             {type === 'you_owe' ? 'You owe' : 'Owes you'} {formattedAmount}
//                         </div>
//                         <p className='text-xs text-gray-400 mt-1'>Updated: {new Date(updatedOn).toLocaleDateString()}</p>
//                     </div>
//                 </div>
//             </motion.li>
//         );
//     });

//     return (
//         <div className="min-h-[calc(100vh-7rem)] p-4 bg-gray-50">
//             <div className="flex justify-center">
//             <div className="pt-2 mr-3">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
//                 </svg>
//             </div>

//                 <div>
//                 <div className="w-[35rem] flex text-gray-900 border border-gray-500 rounded-3xl p-1 pl-3 text-sm pr-2">
//                     <input  id="default-search" className="w-full text-white border-none outline-none" placeholder="Search" required />
//                     <button className=" text-gray-400 font-bold py-2 px-4 rounded inline-flex items-center">
//                         <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//                         </svg>
//                     </button>
//                 </div>
//                 </div>
                
//                 <div>
//                     {/* calender */}

//                 </div>
//             </div>

//                 <div>

//                 </div>
   
//         </div>
//     );
// }



// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   ArrowDownward,
//   ArrowUpward,
//   Group,
//   PersonAdd,
//   AddCircleOutline,
// } from "@mui/icons-material";

// export function History() {
//   const navigate = useNavigate();
//   const [updates, setUpdates] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const[query, setQuery] = useState('');
//   const[filter,setFilter] = useState(false);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/signin");
//       return;
//     }

//     const fetchAllUpdates = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://127.0.0.1:8787/allupdates", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setUpdates(response.data.data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllUpdates();
//   }, [token, navigate]);

//   const renderCard = (update, index) => {
//     const date = new Date(update.date).toLocaleDateString();

//     return (
//       <motion.div
//         key={index}
//         className="bg-white p-4 rounded-xl shadow-sm mb-3 border hover:shadow-md transition-shadow"
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.05, delay: index * 0.09 }}
//       >
//         <div className="flex items-start justify-between">
//           <div>
//             <h3 className="text-md font-semibold text-gray-800">
//               {getTitle(update)}
//             </h3>
//             <p className="text-sm text-gray-500">{getSubText(update)}</p>
//           </div>
//           <div className="text-xs text-gray-400">{date}</div>
//         </div>
//       </motion.div>
//     );
//   };

//   const getTitle = (update) => {
//     switch (update.type) {
//       case "created_split":
//         return `You created a split: ${update.description}`;
//       case "participated_split":
//         return `You were added to a split: ${update.description}`;
//       case "sent_friend_request":
//         return `You sent a friend request to ${update.to.name}`;
//       case "received_friend_request":
//         return `${update.from.name} sent you a friend request`;
//       case "created_group":
//         return `You created a group: ${update.name}`;
//       case "joined_group":
//         return `You joined a group: ${update.name}`;
//       default:
//         return "Unknown update";
//     }
//   };

//   const getSubText = (update) => {
//     switch (update.type) {
//       case "participated_split":
//         return `Created by ${update.owner?.name || "Unknown"}`;
//       case "sent_friend_request":
//         return `${update.to.email}`;
//       case "received_friend_request":
//         return `${update.from.email}`;
//       case "created_split":
//       case "created_group":
//       case "joined_group":
//         return "";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-7rem)] px-4 py-6 bg-gray-50">
//       <div>
//       <div className="flex justify-center mb-6">
//            <div className="pt-2 mr-3 " onClick={()=>{setFilter(true)}}>
//                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
//                  </svg>
//           </div>
//         <div className="w-[35rem] flex text-gray-900 border border-gray-500 rounded-3xl p-1 pl-3 text-sm pr-2">
//           <input
//             id="default-search"
//             className="w-full text-black placeholder-gray-400 border-none outline-none bg-transparent"
//             placeholder="Search"
//             required
//           />
//           <button className="text-gray-400 font-bold py-2 px-4 rounded inline-flex items-center">
//             <svg
//               className="w-4 h-4"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading updates...</p>
//       ) : updates.length === 0 ? (
//         <p className="text-center text-gray-400">No recent activity yet.</p>
//       ) : (
//         <div className="max-w-3xl mx-auto overflow-scroll">
//           {updates.map((update, index) => renderCard(update, index))}
//         </div>
//       )}
//     </div>

//   );
// }


// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowDownward,
//   ArrowUpward,
//   Group,
//   PersonAdd,
//   AddCircleOutline,
//   Close,
//   FilterAlt,
//   CalendarMonth,
//   Search
// } from "@mui/icons-material";

// export function History() {
//   const navigate = useNavigate();
//   const [updates, setUpdates] = useState([]);
//   const [filteredUpdates, setFilteredUpdates] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [query, setQuery] = useState('');
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     types: [],
//     dateRange: { start: null, end: null }
//   });
//   const token = localStorage.getItem("token");

//   const updateTypes = [
//     { value: "created_split", label: "Created Splits" },
//     { value: "participated_split", label: "Participated Splits" },
//     { value: "sent_friend_request", label: "Sent Requests" },
//     { value: "received_friend_request", label: "Received Requests" },
//     { value: "created_group", label: "Created Groups" },
//     { value: "joined_group", label: "Joined Groups" }
//   ];

//   useEffect(() => {
//     if (!token) {
//       navigate("/signin");
//       return;
//     }

//     const fetchAllUpdates = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://127.0.0.1:8787/allupdates", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setUpdates(response.data.data);
//         setFilteredUpdates(response.data.data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllUpdates();
//   }, [token, navigate]);

//   useEffect(() => {
//     applyFilters();
//   }, [query, filters, updates]);

//   const applyFilters = () => {
//     let results = [...updates];

//     // Apply search filter
//     if (query) {
//       results = results.filter(update => 
//         getTitle(update).toLowerCase().includes(query.toLowerCase()) ||
//         getSubText(update).toLowerCase().includes(query.toLowerCase())
//       );
//     }

//     // Apply type filters
//     if (filters.types.length > 0) {
//       results = results.filter(update => filters.types.includes(update.type));
//     }

//     // Apply date range filter
//     if (filters.dateRange.start || filters.dateRange.end) {
//       results = results.filter(update => {
//         const updateDate = new Date(update.date);
//         const start = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
//         const end = filters.dateRange.end ? new Date(filters.dateRange.end) : null;
        
//         if (start && updateDate < start) return false;
//         if (end && updateDate > end) return false;
//         return true;
//       });
//     }

//     setFilteredUpdates(results);
//   };

//   const handleTypeToggle = (type) => {
//     setFilters(prev => ({
//       ...prev,
//       types: prev.types.includes(type)
//         ? prev.types.filter(t => t !== type)
//         : [...prev.types, type]
//     }));
//   };

//   const handleDateChange = (e, field) => {
//     setFilters(prev => ({
//       ...prev,
//       dateRange: {
//         ...prev.dateRange,
//         [field]: e.target.value
//       }
//     }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       types: [],
//       dateRange: { start: null, end: null }
//     });
//     setQuery('');
//   };

//   const renderCard = (update, index) => {
//     const date = new Date(update.date).toLocaleDateString();

//     return (
//       <motion.div
//         key={index}
//         className="bg-white p-4 rounded-xl shadow-sm mb-3 border hover:shadow-md transition-shadow"
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.05, delay: index * 0.09 }}
//       >
//         <div className="flex items-start justify-between">
//           <div>
//             <h3 className="text-md font-semibold text-gray-800">
//               {getTitle(update)}
//             </h3>
//             <p className="text-sm text-gray-500">{getSubText(update)}</p>
//           </div>
//           <div className="text-xs text-gray-400">{date}</div>
//         </div>
//       </motion.div>
//     );
//   };

//   const getTitle = (update) => {
//     switch (update.type) {
//       case "created_split":
//         return `You created a split: ${update.description}`;
//       case "participated_split":
//         return `You were added to a split: ${update.description}`;
//       case "sent_friend_request":
//         return `You sent a friend request to ${update.to.name}`;
//       case "received_friend_request":
//         return `${update.from.name} sent you a friend request`;
//       case "created_group":
//         return `You created a group: ${update.name}`;
//       case "joined_group":
//         return `You joined a group: ${update.name}`;
//       default:
//         return "Unknown update";
//     }
//   };

//   const getSubText = (update) => {
//     switch (update.type) {
//       case "participated_split":
//         return `Created by ${update.owner?.name || "Unknown"}`;
//       case "sent_friend_request":
//         return `${update.to.email}`;
//       case "received_friend_request":
//         return `${update.from.email}`;
//       case "created_split":
//       case "created_group":
//       case "joined_group":
//         return "";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-7rem)] px-4 py-6 bg-gray-50 relative">
//       <div className="flex justify-center mb-6">
//         <div 
//           className="pt-2 mr-3 cursor-pointer" 
//           onClick={() => setFilterOpen(!filterOpen)}
//         >
//           <FilterAlt className="text-gray-600" />
//         </div>
//         <div className="w-[35rem] flex text-gray-900 border border-gray-500 rounded-3xl p-1 pl-3 text-sm pr-2">
//           <input
//             id="default-search"
//             className="w-full text-black placeholder-gray-400 border-none outline-none bg-transparent"
//             placeholder="Search"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             required
//           />
//           <button className="text-gray-400 font-bold py-2 px-4 rounded inline-flex items-center">
//             <Search className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading updates...</p>
//       ) : filteredUpdates.length === 0 ? (
//         <p className="text-center text-gray-400">No matching activity found.</p>
//       ) : (
//         <div className="max-w-3xl mx-auto overflow-scroll">
//           {filteredUpdates.map((update, index) => renderCard(update, index))}
//         </div>
//       )}

//       <AnimatePresence>
//         {filterOpen && (
//           <motion.div
//             className="absolute top-0 left-0 h-full w-80 bg-white shadow-lg z-10 p-4"
//             initial={{ x: -320 }}
//             animate={{ x: 0 }}
//             exit={{ x: -320 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">Filters</h2>
//               <button 
//                 onClick={() => setFilterOpen(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <Close />
//               </button>
//             </div>

//             <div className="mb-6">
//               <h3 className="text-md font-medium mb-2">Activity Types</h3>
//               <div className="space-y-2">
//                 {updateTypes.map(type => (
//                   <div key={type.value} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id={type.value}
//                       checked={filters.types.includes(type.value)}
//                       onChange={() => handleTypeToggle(type.value)}
//                       className="mr-2"
//                     />
//                     <label htmlFor={type.value}>{type.label}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="mb-6">
//               <h3 className="text-md font-medium mb-2">Date Range</h3>
//               <div className="space-y-2">
//                 <div>
//                   <label className="block text-sm mb-1">From:</label>
//                   <input
//                     type="date"
//                     value={filters.dateRange.start || ''}
//                     onChange={(e) => handleDateChange(e, 'start')}
//                     className="w-full p-2 border rounded"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm mb-1">To:</label>
//                   <input
//                     type="date"
//                     value={filters.dateRange.end || ''}
//                     onChange={(e) => handleDateChange(e, 'end')}
//                     className="w-full p-2 border rounded"
//                   />
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={resetFilters}
//               className="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800"
//             >
//               Reset Filters
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowDownward,
//   ArrowUpward,
//   Group,
//   PersonAdd,
//   AddCircleOutline,
//   Close,
//   FilterAlt,
//   CalendarMonth,
//   Search
// } from "@mui/icons-material";

// export function History() {
//   const navigate = useNavigate();
//   const [updates, setUpdates] = useState([]);
//   const [filteredUpdates, setFilteredUpdates] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [query, setQuery] = useState('');
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     types: [],
//     dateRange: { start: null, end: null }
//   });
//   const token = localStorage.getItem("token");

//   const updateTypes = [
//     { value: "created_split", label: "Created Splits" },
//     { value: "participated_split", label: "Participated Splits" },
//     { value: "sent_friend_request", label: "Sent Requests" },
//     { value: "received_friend_request", label: "Received Requests" },
//     { value: "created_group", label: "Created Groups" },
//     { value: "joined_group", label: "Joined Groups" }
//   ];

//   useEffect(() => {
//     if (!token) {
//       navigate("/signin");
//       return;
//     }

//     const fetchAllUpdates = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://127.0.0.1:8787/allupdates", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setUpdates(response.data.data);
//         setFilteredUpdates(response.data.data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllUpdates();
//   }, [token, navigate]);

//   useEffect(() => {
//     applyFilters();
//   }, [query, filters, updates]);

//   const applyFilters = () => {
//     let results = [...updates];

//     // Apply search filter
//     if (query) {
//       results = results.filter(update => 
//         getTitle(update).toLowerCase().includes(query.toLowerCase()) ||
//         getSubText(update).toLowerCase().includes(query.toLowerCase())
//       );
//     }

//     // Apply type filters
//     if (filters.types.length > 0) {
//       results = results.filter(update => filters.types.includes(update.type));
//     }

//     // Apply date range filter
//     if (filters.dateRange.start || filters.dateRange.end) {
//       results = results.filter(update => {
//         const updateDate = new Date(update.date);
//         const start = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
//         const end = filters.dateRange.end ? new Date(filters.dateRange.end) : null;
        
//         if (start && updateDate < start) return false;
//         if (end && updateDate > end) return false;
//         return true;
//       });
//     }

//     setFilteredUpdates(results);
//   };

//   const handleTypeToggle = (type) => {
//     setFilters(prev => ({
//       ...prev,
//       types: prev.types.includes(type)
//         ? prev.types.filter(t => t !== type)
//         : [...prev.types, type]
//     }));
//   };

//   const handleDateChange = (e, field) => {
//     setFilters(prev => ({
//       ...prev,
//       dateRange: {
//         ...prev.dateRange,
//         [field]: e.target.value
//       }
//     }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       types: [],
//       dateRange: { start: null, end: null }
//     });
//     setQuery('');
//   };

//   const renderCard = (update, index) => {
//     const date = new Date(update.date).toLocaleDateString();

//     return (
//       <motion.div
//         key={index}
//         className="bg-white p-4 rounded-xl shadow-sm mb-3 border hover:shadow-md transition-shadow"
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.05, delay: index * 0.09 }}
//       >
//         <div className="flex items-start justify-between">
//           <div>
//             <h3 className="text-md font-semibold text-gray-800">
//               {getTitle(update)}
//             </h3>
//             <p className="text-sm text-gray-500">{getSubText(update)}</p>
//           </div>
//           <div className="text-xs text-gray-400">{date}</div>
//         </div>
//       </motion.div>
//     );
//   };

//   const getTitle = (update) => {
//     switch (update.type) {
//       case "created_split":
//         return `You created a split: ${update.description}`;
//       case "participated_split":
//         return `You were added to a split: ${update.description}`;
//       case "sent_friend_request":
//         return `You sent a friend request to ${update.to.name}`;
//       case "received_friend_request":
//         return `${update.from.name} sent you a friend request`;
//       case "created_group":
//         return `You created a group: ${update.name}`;
//       case "joined_group":
//         return `You joined a group: ${update.name}`;
//       default:
//         return "Unknown update";
//     }
//   };

//   const getSubText = (update) => {
//     switch (update.type) {
//       case "participated_split":
//         return `Created by ${update.owner?.name || "Unknown"}`;
//       case "sent_friend_request":
//         return `${update.to.email}`;
//       case "received_friend_request":
//         return `${update.from.email}`;
//       case "created_split":
//       case "created_group":
//       case "joined_group":
//         return "";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-7rem)] px-4 py-6 bg-gray-50 relative">
//       {/* Main content container that will shift when filter is open */}
//       <motion.div
//         className="max-w-6xl mx-auto"
//         animate={{
//           marginLeft: filterOpen ? "20rem" : "0",
//           transition: { type: "spring", stiffness: 300, damping: 30 }
//         }}
//       >
//         <div className="flex justify-center mb-6">
//           <div 
//             className="pt-2 mr-3 cursor-pointer" 
//             onClick={() => setFilterOpen(!filterOpen)}
//           >
//             <FilterAlt className="text-gray-600" />
//           </div>
//           <div className="w-[35rem] flex text-gray-900 border border-gray-500 rounded-3xl p-1 pl-3 text-sm pr-2">
//             <input
//               id="default-search"
//               className="w-full text-black placeholder-gray-400 border-none outline-none bg-transparent"
//               placeholder="Search"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               required
//             />
//             <button className="text-gray-400 font-bold py-2 px-4 rounded inline-flex items-center">
//               <Search className="w-4 h-4" />
//             </button>
//           </div>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading updates...</p>
//         ) : filteredUpdates.length === 0 ? (
//           <p className="text-center text-gray-400">No matching activity found.</p>
//         ) : (
//           <div className="max-w-3xl mx-auto overflow-scroll">
//             {filteredUpdates.map((update, index) => renderCard(update, index))}
//           </div>
//         )}
//       </motion.div>

//       {/* Filter panel */}
//       <AnimatePresence>
//         {filterOpen && (
//           <motion.div
//             className="absolute top-0 left-0 h-full w-80 bg-white shadow-lg z-10 p-4"
//             initial={{ x: -320 }}
//             animate={{ x: 0 }}
//             exit={{ x: -320 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">Filters</h2>
//               <button 
//                 onClick={() => setFilterOpen(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <Close />
//               </button>
//             </div>

//             <div className="mb-6">
//               <h3 className="text-md font-medium mb-2">Activity Types</h3>
//               <div className="space-y-2">
//                 {updateTypes.map(type => (
//                   <div key={type.value} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id={type.value}
//                       checked={filters.types.includes(type.value)}
//                       onChange={() => handleTypeToggle(type.value)}
//                       className="mr-2"
//                     />
//                     <label htmlFor={type.value}>{type.label}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="mb-6">
//               <h3 className="text-md font-medium mb-2">Date Range</h3>
//               <div className="space-y-2">
//                 <div>
//                   <label className="block text-sm mb-1">From:</label>
//                   <input
//                     type="date"
//                     value={filters.dateRange.start || ''}
//                     onChange={(e) => handleDateChange(e, 'start')}
//                     className="w-full p-2 border rounded"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm mb-1">To:</label>
//                   <input
//                     type="date"
//                     value={filters.dateRange.end || ''}
//                     onChange={(e) => handleDateChange(e, 'end')}
//                     className="w-full p-2 border rounded"
//                   />
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={resetFilters}
//               className="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800"
//             >
//               Reset Filters
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }



import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Close,
  FilterAlt,
  Search
} from "@mui/icons-material";

export function History() {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState([]);
  const [filteredUpdates, setFilteredUpdates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    types: [],
    dateRange: { start: null, end: null }
  });
  const token = localStorage.getItem("token");

  const updateTypes = [
    { value: "created_split", label: "Created Splits" },
    { value: "participated_split", label: "Participated Splits" },
    { value: "sent_friend_request", label: "Sent Requests" },
    { value: "received_friend_request", label: "Received Requests" },
    { value: "created_group", label: "Created Groups" },
    { value: "joined_group", label: "Joined Groups" }
  ];

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchAllUpdates = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:8787/allupdates", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUpdates(response.data.data);
        setFilteredUpdates(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUpdates();
  }, [token, navigate]);

  useEffect(() => {
    applyFilters();
  }, [query, filters, updates]);

  const applyFilters = () => {
    let results = [...updates];

    if (query) {
      results = results.filter(update => 
        getTitle(update).toLowerCase().includes(query.toLowerCase()) ||
        getSubText(update).toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filters.types.length > 0) {
      results = results.filter(update => filters.types.includes(update.type));
    }

    if (filters.dateRange.start || filters.dateRange.end) {
      results = results.filter(update => {
        const updateDate = new Date(update.date);
        const start = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
        const end = filters.dateRange.end ? new Date(filters.dateRange.end) : null;
        
        if (start && updateDate < start) return false;
        if (end && updateDate > end) return false;
        return true;
      });
    }

    setFilteredUpdates(results);
  };

  const handleTypeToggle = (type) => {
    setFilters(prev => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
    }));
  };

  const handleDateChange = (e, field) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: e.target.value
      }
    }));
  };

  const resetFilters = () => {
    setFilters({
      types: [],
      dateRange: { start: null, end: null }
    });
    setQuery('');
  };

  const renderCard = (update, index) => {
    const date = new Date(update.date).toLocaleDateString();

    return (
      <motion.div
        key={index}
        className="bg-white p-4 rounded-xl shadow-sm mb-3 border hover:shadow-md transition-shadow"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.05, delay: index * 0.09 }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-md font-semibold text-gray-800">
              {getTitle(update)}
            </h3>
            <p className="text-sm text-gray-500">{getSubText(update)}</p>
          </div>
          <div className="text-xs text-gray-400">{date}</div>
        </div>
      </motion.div>
    );
  };

  const getTitle = (update) => {
    switch (update.type) {
      case "created_split":
        return `You created a split: ${update.description}`;
      case "participated_split":
        return `You were added to a split: ${update.description}`;
      case "sent_friend_request":
        return `You sent a friend request to ${update.to.name}`;
      case "received_friend_request":
        return `${update.from.name} sent you a friend request`;
      case "created_group":
        return `You created a group: ${update.name}`;
      case "joined_group":
        return `You joined a group: ${update.name}`;
      default:
        return "Unknown update";
    }
  };

  const getSubText = (update) => {
    switch (update.type) {
      case "participated_split":
        return `Created by ${update.owner?.name || "Unknown"}`;
      case "sent_friend_request":
        return `${update.to.email}`;
      case "received_friend_request":
        return `${update.from.email}`;
      case "created_split":
      case "created_group":
      case "joined_group":
        return "";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-[calc(100vh-7rem)] px-4 py-6 bg-gray-50 relative overflow-hidden">
      {/* Main content container */}
      <motion.div
        className="h-full"
        animate={{
          marginLeft: filterOpen ? "20rem" : "0",
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }}
      >
        <div className="flex justify-center mb-6">
          <div 
            className="pt-2 mr-3 cursor-pointer" 
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <FilterAlt className="text-gray-600" />
          </div>
          <div className="w-[35rem] flex text-gray-900 border border-gray-500 rounded-3xl p-1 pl-3 text-sm pr-2">
            <input
              id="default-search"
              className="w-full text-black placeholder-gray-400 border-none outline-none bg-transparent"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <button className="text-gray-400 font-bold py-2 px-4 rounded inline-flex items-center">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable content area without visible scrollbar */}
        <div className="h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide">
          {loading ? (
            <p className="text-center text-gray-500">Loading updates...</p>
          ) : filteredUpdates.length === 0 ? (
            <p className="text-center text-gray-400">No matching activity found.</p>
          ) : (
            <div className="max-w-3xl mx-auto pb-6">
              {filteredUpdates.map((update, index) => renderCard(update, index))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Filter panel */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            className="absolute top-0 left-0 h-full w-80 bg-white shadow-lg z-10 p-4"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button 
                onClick={() => setFilterOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Close />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Activity Types</h3>
              <div className="space-y-2">
                {updateTypes.map(type => (
                  <div key={type.value} className="flex items-center">
                    <input
                      type="checkbox"
                      id={type.value}
                      checked={filters.types.includes(type.value)}
                      onChange={() => handleTypeToggle(type.value)}
                      className="mr-2"
                    />
                    <label htmlFor={type.value}>{type.label}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Date Range</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm mb-1">From:</label>
                  <input
                    type="date"
                    value={filters.dateRange.start || ''}
                    onChange={(e) => handleDateChange(e, 'start')}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">To:</label>
                  <input
                    type="date"
                    value={filters.dateRange.end || ''}
                    onChange={(e) => handleDateChange(e, 'end')}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}