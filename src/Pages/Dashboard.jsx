// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import PaymentsIcon from '@mui/icons-material/Payments';
// import AutoGraphIcon from '@mui/icons-material/AutoGraph';
// import SavingsIcon from '@mui/icons-material/Savings';



// export function Dashboard({ name, isloading1,friends ,userinfo}) {
//     const navigate = useNavigate();
//     const [balances, setBalances] = useState([]);
//     const [summary, setSummary] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [isCreateSplitOpen, setIsCreateSplitOpen] = useState(false);
//     const [value, setValue] = React.useState('recents');
//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         if (!token) {
//             navigate("/signin");
//             return;
//         }


//         const fetchBalances = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get('https://splititb.harshitacodes.workers.dev/balances', {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 // console.log("from dashboard",response.data);
//                 setBalances(response.data.data.balances);
//                 setSummary(response.data.data.summary);
//             } catch (error) {
//                 toast.error('Failed to fetch balances');
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBalances();
//     }, [token, navigate]);

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 0
//         }).format(amount);
//     };

//     const BalanceCard = ({ name, email, amount, type, formattedAmount, updatedOn }) => {
//         return (
//             <li className="px-6 py-4">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-4">
//                         <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
//                             <span className="text-blue-600 font-medium">
//                                 {name.charAt(0).toUpperCase()}
//                             </span>
//                         </div>
//                         <div>
//                             <h3 className="text-sm font-medium text-gray-900">{name}</h3>
//                             <p className="text-sm text-gray-500">{email}</p>
//                         </div>
//                     </div>
//                     <div className={`text-sm font-medium ${type === 'you_owe' ? 'text-red-600' : 'text-green-600'}`}>
//                         {type === 'you_owe' ? 'You owe ' : 'Owes you '}
//                         {formattedAmount}
//                         <p className="text-xs text-gray-400 mt-1">Updated: {new Date(updatedOn).toLocaleDateString()}</p>
//                     </div>
//                 </div>
//             </li>
//         );
//     };

//     const SummaryCard = ({ title, amount, type, loading, formattedAmount }) => {
//         const bgColor = {
//             positive: 'bg-green-50',
//             negative: 'bg-red-50',
//             neutral: 'bg-gray-50'
//         }[type];

//         const textColor = {
//             positive: 'text-green-600',
//             negative: 'text-red-600',
//             neutral: 'text-gray-600'
//         }[type];

//         return (
//             <div className={`${bgColor} overflow-hidden shadow rounded-lg p-6`}>
//                 <h3 className="text-sm font-medium text-gray-500">{title}</h3>
//                 {loading ? (
//                     <div className="animate-pulse h-8 w-3/4 bg-gray-200 rounded mt-2"></div>
//                 ) : (
//                     <p className={`mt-2 text-2xl font-semibold ${textColor}`}>
//                         {formattedAmount}
//                     </p>
//                 )}
//             </div>
//         );
//     };

//     const handleCreateSplitClick = () => {
//         setIsCreateSplitOpen(true);
//       };
    
//       const handleCloseCreateSplit = () => {
//         setIsCreateSplitOpen(false);
//       };
//       const handleChange = (event, newValue) => {
//         setValue(newValue);
//       };
//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Header */}
//             <header className="bg-white shadow-sm">
//                 <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
//                     <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//                     <div className="flex items-center space-x-4">
//                         <span className="text-gray-600">Hello, {isloading1 ? "..." : name}</span>
//                     </div>
//                 </div>
//             </header>

//             {/* Main Content */}
//             <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//                 {/* Summary Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                     <SummaryCard 
//                         title="You Owe" 
//                         amount={summary?.youOwe || 0} 
//                         type="negative" 
//                         loading={loading}
//                         formattedAmount={formatCurrency(summary?.youOwe || 0)}
//                     />
//                     <SummaryCard 
//                         title="You're Owed" 
//                         amount={summary?.owesYou || 0} 
//                         type="positive"
//                         loading={loading}
//                         formattedAmount={formatCurrency(summary?.owesYou || 0)}
//                     />
//                     <SummaryCard 
//                         title="Net Balance" 
//                         amount={summary?.netBalance?.amount || 0} 
//                         type={summary?.netBalance?.type === 'owes_you' ? 'positive' : 
//                               summary?.netBalance?.type === 'you_owe' ? 'negative' : 'neutral'}
//                         loading={loading}
//                         formattedAmount={formatCurrency(summary?.netBalance?.amount || 0)}
//                     />
//                 </div>

//                 {/* Tabs */}
//                 <div className="border-b border-gray-200 mb-6">
//                     <nav className="-mb-px flex space-x-8">
//                         <button
        
//                             className="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
//                         >
//                             Balances
//                         </button>
//                     </nav>
//                 </div>

//                 {/* Tab Content */}
      
//                     <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//                         <ul className="divide-y divide-gray-200">
//                             {loading ? (
//                                 Array.from({ length: 3 }).map((_, i) => (
//                                     <li key={i} className="p-4">
//                                         <div className="animate-pulse flex space-x-4">
//                                             <div className="rounded-full bg-gray-200 h-10 w-10"></div>
//                                             <div className="flex-1 space-y-4 py-1">
//                                                 <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                                                 <div className="space-y-2">
//                                                     <div className="h-4 bg-gray-200 rounded"></div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </li>
//                                 ))
//                             ) : balances.length > 0 ? (
//                                 balances.map((balance) => (
//                                     <BalanceCard 
//                                         key={`${balance.userId}-${balance.type}`}
//                                         name={balance.name}
//                                         amount={balance.amount}
//                                         type={balance.type}
//                                         email={balance.email}
//                                         formattedAmount={formatCurrency(Math.abs(balance.amount))}
//                                         updatedOn={balance.updatedOn}
//                                     />
//                                 ))
//                             ) : (
//                                 <div className="text-center py-12">
//                                     <p className="text-gray-500">No balances to display</p>
//                                 </div>
//                             )}
//                         </ul>
//                     </div>
  
//                 {/* Quick Actions */}
//                 <div className="mt-8 flex space-x-4">
//                     <button
//                         onClick={handleCreateSplitClick}
//                         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                         Create New Split
//                     </button>
//                     <CreateSplitBox isOpen={isCreateSplitOpen} onClose={handleCloseCreateSplit} friends={friends} userinfo={userinfo}/>
//                     <button
//                         onClick={() => navigate("/friends")}
//                         className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                         Manage Friends
//                     </button>
//                 </div>
//             </main>
//             <div className='flex justify-center bottom-30 left-10  right-10 fixed'>
//             {/* <BottomNavigation
//   sx={{
//     width: 700,
//     backgroundColor: '#477082',
//     borderRadius: '0.75rem',
//     '& .MuiBottomNavigationAction-root': {
//       color: 'white', // icon + label color when not selected
//     },
//     '& .Mui-selected': {
//       color: 'white', // icon + label color when selected
//     },
//   }}
//   value={value}
//   onChange={handleChange}
// >
// <BottomNavigationAction
//   label="Personal Expenses"
//   value="Personal Expenses"
//   icon={<PaymentsIcon />}
//   component={Link}
//   to="/expenses"
// />
//   <BottomNavigationAction
//     label="Expenses Insight"
//     value="Expenses Insight"
//     icon={<AutoGraphIcon />}
//     component={Link}
//     to="/insights"
//   />
//   <BottomNavigationAction
//     label="Savings"
//     value="Savings"
//     icon={<SavingsIcon />}
    
//   />
// </BottomNavigation> */}


// </div>

// </div>
//     );
// }




// import { useEffect, useState } from 'react';
// import { CreateSplitBox } from "../Components/CreateSplitBox";
// import * as React from 'react';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   ExpandMore, 
//   ExpandLess, 
//   Add, 
//   Payment, 
//   Person, 
//   ArrowUpward, 
//   ArrowDownward,
//   AccountCircle
// } from '@mui/icons-material';
// // import 'react-calendar/dist/Calendar.css';
// import { useSpring, animated } from '@react-spring/web';
// import Calendar from 'react-calendar';

// export function Dashboard({ name, isloading1, friends, userinfo }) {
//     const navigate = useNavigate();
//     const [isCreateSplitOpen, setIsCreateSplitOpen] = useState(false);
//     const [date, setDate] = useState(new Date());
//     const [isExpanded, setIsExpanded] = useState(false);
//     const [showGreeting, setShowGreeting] = useState(true);
//     const token = localStorage.getItem("token");
//     const [loading, setLoading] = useState(true);
//     const [balances, setBalances] = useState([]);
//     const [summary, setSummary] = useState(null);

//     useEffect(() => {
//         if (!token) {
//             navigate("/signin");
//             return;
//         }
        
//         const fetchBalances = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get('http://127.0.0.1:8787/balances', {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setBalances(response.data.data.balances);
//                 setSummary(response.data.data.summary);
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
        
//         fetchBalances();
        
//         // Hide greeting after 4 seconds
//         const timer = setTimeout(() => {
//             setShowGreeting(false);
//         }, 4000);
        
//         return () => clearTimeout(timer);
//     }, [token, navigate]);

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 0
//         }).format(amount);
//     };

//     // Animation for greeting disappearance
//     const greetingAnimation = useSpring({
//         height: showGreeting ? 144 : 0,
//         opacity: showGreeting ? 1 : 0,
//         marginBottom: showGreeting ? 24 : 0,
//         config: { tension: 200, friction: 30 }
//     });

//     const BalanceCard = ({ name, email, amount, type, formattedAmount, updatedOn }) => {
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
//     };

//     const Cardies = ({ title, amount, type, loading, formattedAmount }) => {
//         const bgColor = {
//             positive: 'bg-emerald-50',
//             negative: 'bg-rose-50',
//             neutral: 'bg-slate-50'
//         }[type];
    
//         const textColor = {
//             positive: 'text-emerald-700',
//             negative: 'text-rose-700',
//             neutral: 'text-slate-700'
//         }[type];
    
//         const borderColor = {
//             positive: 'border-emerald-200',
//             negative: 'border-rose-200',
//             neutral: 'border-slate-200'
//         }[type];
    
//         const icon = {
//             positive: <ArrowUpward className={`text-emerald-600`} />,
//             negative: <ArrowDownward className={`text-rose-600`} />,
//             neutral: <Person className={`text-slate-600`} />
//         }[type];
    
//         return (
//             <motion.div 
//                 className={`${bgColor} ${borderColor} border overflow-hidden shadow-sm rounded-xl p-5 hover:shadow-md transition-all`}
//                 whileHover={{ y: -3, scale: 1.02 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 10 }}
//             >
//                 <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</h3>
//                 {loading ? (
//                     <div className='animate-pulse h-8 w-3/4 bg-slate-200 rounded mt-3'></div>
//                 ) : (
//                     <div className="flex items-center mt-3">
//                         <div className={`p-2 rounded-lg ${bgColor}`}>
//                             {icon}
//                         </div>
//                         <p className={`ml-3 text-2xl font-semibold ${textColor}`}>
//                             {formattedAmount}
//                         </p>
//                     </div>
//                 )}
//             </motion.div>
//         );
//     };

//     const handleCreateSplitClick = () => {
//         setIsCreateSplitOpen(true);
//     }

//     const handleCloseCreateSplit = () => {
//         setIsCreateSplitOpen(false);
//     }

//     const toggleExpand = () => {
//         setIsExpanded(!isExpanded);
//     }

//     return (
//         <div className="min-h-[calc(100vh-7rem)] p-4 bg-gray-50">
//             {/* Animated Greeting Section */}
//             <animated.div 
//                 style={greetingAnimation}
//                 className="w-full overflow-hidden"
//             >
//                 <motion.div 
//                     className="w-full h-36 bg-bground shadow-lg rounded-3xl flex flex-col justify-center items-center text-white"
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <AccountCircle sx={{ fontSize: 48 }} />
//                     <h1 className="text-2xl font-semibold mt-2">
//                         Welcome back, {`${userinfo?.name || 'User'}`}!
//                     </h1>
//                     <p className="text-sm opacity-80">Let's manage your expenses</p>
//                 </motion.div>
//             </animated.div>

//             {/* Action Buttons */}
//             <div className="flex flex-col md:flex-row gap-4 mb-6">
//                 <motion.button
//                     onClick={handleCreateSplitClick}
//                     className="h-20 bg-white shadow-md rounded-2xl flex justify-center items-center gap-2 px-6 hover:bg-blue-50 transition-colors"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                 >
//                     <Add className="text-blue-600" />
//                     <span className="text-gray-700 font-medium">Create Split</span>
//                     <CreateSplitBox isOpen={isCreateSplitOpen} onClose={handleCloseCreateSplit} friends={friends} userinfo={userinfo} />
//                 </motion.button>

//                 <motion.button
//                     className="h-20 bg-white shadow-md rounded-2xl flex justify-center items-center gap-2 px-6 hover:bg-green-50 transition-colors"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                 >
//                     <Payment className="text-green-600" />
//                     <span className="text-gray-700 font-medium">Settle Expense</span>
//                 </motion.button>
//             </div>

//             {/* Main Content */}
//             <div className="flex flex-col lg:flex-row gap-6">
//                 {/* Left Section - Scrollable */}
//                 <div className={`${isExpanded ? 'lg:w-full' : 'lg:w-2/3'} transition-all duration-300`}>
//                     <div className="bg-white p-6 rounded-xl shadow-md">
//                         <div className="flex justify-between items-center mb-6">
//                             <h2 className="text-xl font-semibold text-gray-800">Your Balance Summary</h2>
//                             <button 
//                                 onClick={toggleExpand}
//                                 className="text-gray-500 hover:text-gray-700 transition-colors"
//                             >
//                                 {isExpanded ? <ExpandLess /> : <ExpandMore />}
//                             </button>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                             <Cardies
//                                 title="You Owe"
//                                 amount={summary?.youOwe || 0}
//                                 type="negative"
//                                 loading={loading}
//                                 formattedAmount={formatCurrency(summary?.youOwe || 0)}
//                             />

//                             <Cardies
//                                 title="You're Owed"
//                                 amount={summary?.owesYou || 0}
//                                 type="positive"
//                                 loading={loading}
//                                 formattedAmount={formatCurrency(summary?.owesYou || 0)}
//                             />

//                             <Cardies
//                                 title="Net Balance"
//                                 amount={summary?.netBalance?.amount || 0}
//                                 type={summary?.netBalance?.type === 'owes_you' ? 'positive' :
//                                     summary?.netBalance?.type === 'you_owe' ? 'negative' : 'neutral'}
//                                 loading={loading}
//                                 formattedAmount={formatCurrency(summary?.netBalance?.amount || 0)}
//                             />
//                         </div>

//                         <div className="mb-6">
//                             <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Balances</h3>
//                             <div className="overflow-y-auto max-h-96 pr-2">
//                                 <ul className="space-y-3">
//                                     <AnimatePresence>
//                                         {loading ? (
//                                             Array.from({ length: 3 }).map((_, index) => (
//                                                 <motion.li 
//                                                     key={index}
//                                                     className="px-6 py-4 bg-gray-100 rounded-lg animate-pulse h-20"
//                                                     initial={{ opacity: 0 }}
//                                                     animate={{ opacity: 1 }}
//                                                     exit={{ opacity: 0 }}
//                                                 />
//                                             ))
//                                         ) : balances.length > 0 ? (
//                                             balances.map((balance, index) => (
//                                                 <BalanceCard
//                                                     key={index}
//                                                     name={balance.name}
//                                                     email={balance.email}
//                                                     amount={balance.amount}
//                                                     type={balance.type}
//                                                     formattedAmount={formatCurrency(balance.amount)}
//                                                     updatedOn={balance.updatedOn}
//                                                 />
//                                             ))
//                                         ) : (
//                                             <motion.div 
//                                                 className="text-center py-8 text-gray-500"
//                                                 initial={{ opacity: 0 }}
//                                                 animate={{ opacity: 1 }}
//                                             >
//                                                 No balance records found
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right Section - Calendar */}
//                 {!isExpanded && (
//                     <motion.div 
//                         className="lg:w-1/3"
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.2 }}
//                     >
//                         <div className="bg-white p-6 rounded-xl shadow-md sticky top-4">
//                             <h3 className="text-lg font-medium text-gray-800 mb-4">Calendar</h3>
//                             <div className="calendar-container">
//                                 <Calendar 
//                                     onChange={setDate} 
//                                     value={date} 
//                                     className="border-0 w-full"
//                                     tileClassName={({ date, view }) => 
//                                         view === 'month' && date.getDay() === 0 ? 'text-red-500' : null
//                                     }
//                                 />
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </div>
//         </div>
//     );
// }



import React from "react";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { CreateSplitBox } from "@/Components/CreateSplitBox";
import Calendar from 'react-calendar';
import { 
  ExpandMore, 
  ExpandLess, 
  Add, 
  Payment, 
  Person, 
  ArrowUpward, 
  ArrowDownward,
  AccountCircle
} from '@mui/icons-material';


export function Dashboard({ name, isloading1, friends, userinfo }) {
    const navigate = useNavigate();
    const [isCreateSplitOpen, setIsCreateSplitOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [isExpanded, setIsExpanded] = useState(false);
    const [showGreeting, setShowGreeting] = useState(true);
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    const [balances, setBalances] = useState([]);
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        if (!token) {
            navigate("/signin");
            return;
        }
        
        const fetchBalances = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://127.0.0.1:8787/balances', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBalances(response.data.data.balances);
                setSummary(response.data.data.summary);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchBalances();
        
        const timer = setTimeout(() => setShowGreeting(false), 4000);
        return () => clearTimeout(timer);
    }, [token, navigate]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // const greetingAnimation = useSpring({
    //     height: showGreeting ? 144 : 0,
    //     opacity: showGreeting ? 1 : 0,
    //     marginBottom: showGreeting ? 24 : 0,
    //     config: { tension: 200, friction: 30 }
    // });

    const BalanceCard = React.memo(({ name, email, amount, type, formattedAmount, updatedOn }) => {
        return (
            <motion.li 
                className='px-6 py-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                        <div className='flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center'>
                            <span className='text-blue-600 font-medium'>
                                {name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h3 className='text-sm font-medium text-gray-900'>{name}</h3>
                            <p className="text-sm text-gray-500">{email}</p>
                        </div>
                    </div>
                    <div className={`text-sm font-medium ${type === 'you_owe' ? 'text-red-600' : 'text-green-600'}`}>
                        <div className="flex items-center">
                            {type === 'you_owe' ? (
                                <ArrowDownward className="mr-1" fontSize="small" />
                            ) : (
                                <ArrowUpward className="mr-1" fontSize="small" />
                            )}
                            {type === 'you_owe' ? 'You owe' : 'Owes you'} {formattedAmount}
                        </div>
                        <p className='text-xs text-gray-400 mt-1'>Updated: {new Date(updatedOn).toLocaleDateString()}</p>
                    </div>
                </div>
            </motion.li>
        );
    });

    const Cardies = React.memo(({ title, amount, type, loading, formattedAmount }) => {
        const bgColor = {
            positive: 'bg-emerald-50',
            negative: 'bg-rose-50',
            neutral: 'bg-slate-50'
        }[type];
    
        const textColor = {
            positive: 'text-emerald-700',
            negative: 'text-rose-700',
            neutral: 'text-slate-700'
        }[type];
    
        const borderColor = {
            positive: 'border-emerald-200',
            negative: 'border-rose-200',
            neutral: 'border-slate-200'
        }[type];
    
        const icon = {
            positive: <ArrowUpward className={`text-emerald-600`} />,
            negative: <ArrowDownward className={`text-rose-600`} />,
            neutral: <Person className={`text-slate-600`} />
        }[type];
    
        return (
            <motion.div 
                className={`${bgColor} ${borderColor} border overflow-hidden shadow-sm rounded-xl p-5 hover:shadow-md transition-all`}
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</h3>
                {loading ? (
                    <div className='animate-pulse h-8 w-3/4 bg-slate-200 rounded mt-3'></div>
                ) : (
                    <div className="flex items-center mt-3">
                        <div className={`p-2 rounded-lg ${bgColor}`}>
                            {icon}
                        </div>
                        <p className={`ml-3 text-2xl font-semibold ${textColor}`}>
                            {formattedAmount}
                        </p>
                    </div>
                )}
            </motion.div>
        );
    });

    const handleCreateSplitClick = (e) => {
        e.stopPropagation();
        setIsCreateSplitOpen(true);
    }

    const handleCloseCreateSplit = (e) => {
        e?.stopPropagation();
        setIsCreateSplitOpen(false);
    }

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className="min-h-[calc(100vh-7rem)] p-4 bg-gray-50">
            {/* Animated Greeting Section */}
            {/* <animated.div 
                style={greetingAnimation}
                className="w-full overflow-hidden"
            >
                <motion.div 
                    className="w-full h-36 bg-boxclr shadow-lg rounded-3xl flex flex-col justify-center items-center text-white"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    <AccountCircle sx={{ fontSize: 48 }} />
                    <h1 className="text-2xl font-semibold mt-2">
                        Welcome back, {`${userinfo?.name || 'User'}`}!
                    </h1>
                    <p className="text-sm opacity-80">Let's manage your expenses</p>
                </motion.div>
            </animated.div> */}

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <motion.button
                    onClick={handleCreateSplitClick}
                    className="h-20 bg-white shadow-md rounded-2xl flex justify-center items-center gap-2 px-6 hover:bg-blue-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Add className="text-blue-600" />
                    <span className="text-gray-700 font-medium">Create Split</span>
                </motion.button>
                <CreateSplitBox 
                    isOpen={isCreateSplitOpen} 
                    onClose={handleCloseCreateSplit} 
                    friends={friends} 
                    userinfo={userinfo}
                />
                <motion.button
                    className="h-20 bg-white shadow-md rounded-2xl flex justify-center items-center gap-2 px-6 hover:bg-green-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Payment className="text-green-600" />
                    <span className="text-gray-700 font-medium">Settle Expense</span>
                </motion.button>
            </div>



            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Section */}
                <div className={`${isExpanded ? 'lg:w-full' : 'lg:w-2/3'} transition-all duration-300`}>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Your Balance Summary</h2>
                            <button 
                                onClick={toggleExpand}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                {isExpanded ? <ExpandLess /> : <ExpandMore />}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <Cardies
                                title="You Owe"
                                amount={summary?.youOwe || 0}
                                type="negative"
                                loading={loading}
                                formattedAmount={formatCurrency(summary?.youOwe || 0)}
                            />

                            <Cardies
                                title="You're Owed"
                                amount={summary?.owesYou || 0}
                                type="positive"
                                loading={loading}
                                formattedAmount={formatCurrency(summary?.owesYou || 0)}
                            />

                            <Cardies
                                title="Net Balance"
                                amount={summary?.netBalance?.amount || 0}
                                type={summary?.netBalance?.type === 'owes_you' ? 'positive' :
                                    summary?.netBalance?.type === 'you_owe' ? 'negative' : 'neutral'}
                                loading={loading}
                                formattedAmount={formatCurrency(summary?.netBalance?.amount || 0)}
                            />
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Balances</h3>
                            <div className="overflow-y-auto max-h-44 pr-2">
                                <ul className="space-y-3">
                                    <AnimatePresence>
                                        {loading ? (
                                            Array.from({ length: 3 }).map((_, index) => (
                                                <motion.li 
                                                    key={index}
                                                    className="px-6 py-4 bg-gray-100 rounded-lg animate-pulse h-20"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                />
                                            ))
                                        ) : balances.length > 0 ? (
                                            balances.map((balance, index) => (
                                                <BalanceCard
                                                    key={index}
                                                    name={balance.name}
                                                    email={balance.email}
                                                    amount={balance.amount}
                                                    type={balance.type}
                                                    formattedAmount={formatCurrency(balance.amount)}
                                                    updatedOn={balance.updatedOn}
                                                />
                                            ))
                                        ) : (
                                            <motion.div 
                                                className="text-center py-8 text-gray-500"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                No balance records found
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Calendar */}
                {/* {!isExpanded && (
                    <motion.div 
                        className="lg:w-1/3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="bg-white p-6 rounded-xl shadow-md sticky top-4">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Calendar</h3>
                            <div className="calendar-container">
                                <Calendar 
                                    onChange={setDate} 
                                    value={date} 
                                    className="border-0 w-full"
                                    tileClassName={({ date, view }) => 
                                        view === 'month' && date.getDay() === 0 ? 'text-red-500' : null
                                    }
                                />
                            </div>
                        </div>
                    </motion.div>
                )} */}
            </div>
        </div>
    );
}