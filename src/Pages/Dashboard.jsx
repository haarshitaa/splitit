import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { CreateSplitBox } from "../Components/CreateSplitBox";
import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PaymentsIcon from '@mui/icons-material/Payments';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SavingsIcon from '@mui/icons-material/Savings';



export function Dashboard({ name, isloading1,friends }) {
    const navigate = useNavigate();
    const [balances, setBalances] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCreateSplitOpen, setIsCreateSplitOpen] = useState(false);
    const [value, setValue] = React.useState('recents');
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/signin");
            return;
        }


        const fetchBalances = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://splititb.harshitacodes.workers.dev/balances', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("from dashboard",response.data);
                setBalances(response.data.data.balances);
                setSummary(response.data.data.summary);
            } catch (error) {
                toast.error('Failed to fetch balances');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBalances();
    }, [token, navigate]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const BalanceCard = ({ name, email, amount, type, formattedAmount, updatedOn }) => {
        return (
            <li className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                                {name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">{name}</h3>
                            <p className="text-sm text-gray-500">{email}</p>
                        </div>
                    </div>
                    <div className={`text-sm font-medium ${type === 'you_owe' ? 'text-red-600' : 'text-green-600'}`}>
                        {type === 'you_owe' ? 'You owe ' : 'Owes you '}
                        {formattedAmount}
                        <p className="text-xs text-gray-400 mt-1">Updated: {new Date(updatedOn).toLocaleDateString()}</p>
                    </div>
                </div>
            </li>
        );
    };

    const SummaryCard = ({ title, amount, type, loading, formattedAmount }) => {
        const bgColor = {
            positive: 'bg-green-50',
            negative: 'bg-red-50',
            neutral: 'bg-gray-50'
        }[type];

        const textColor = {
            positive: 'text-green-600',
            negative: 'text-red-600',
            neutral: 'text-gray-600'
        }[type];

        return (
            <div className={`${bgColor} overflow-hidden shadow rounded-lg p-6`}>
                <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                {loading ? (
                    <div className="animate-pulse h-8 w-3/4 bg-gray-200 rounded mt-2"></div>
                ) : (
                    <p className={`mt-2 text-2xl font-semibold ${textColor}`}>
                        {formattedAmount}
                    </p>
                )}
            </div>
        );
    };

    const handleCreateSplitClick = () => {
        setIsCreateSplitOpen(true);
      };
    
      const handleCloseCreateSplit = () => {
        setIsCreateSplitOpen(false);
      };
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Hello, {isloading1 ? "..." : name}</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <SummaryCard 
                        title="You Owe" 
                        amount={summary?.youOwe || 0} 
                        type="negative" 
                        loading={loading}
                        formattedAmount={formatCurrency(summary?.youOwe || 0)}
                    />
                    <SummaryCard 
                        title="You're Owed" 
                        amount={summary?.owesYou || 0} 
                        type="positive"
                        loading={loading}
                        formattedAmount={formatCurrency(summary?.owesYou || 0)}
                    />
                    <SummaryCard 
                        title="Net Balance" 
                        amount={summary?.netBalance?.amount || 0} 
                        type={summary?.netBalance?.type === 'owes_you' ? 'positive' : 
                              summary?.netBalance?.type === 'you_owe' ? 'negative' : 'neutral'}
                        loading={loading}
                        formattedAmount={formatCurrency(summary?.netBalance?.amount || 0)}
                    />
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8">
                        <button
        
                            className="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                        >
                            Balances
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
      
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <ul className="divide-y divide-gray-200">
                            {loading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <li key={i} className="p-4">
                                        <div className="animate-pulse flex space-x-4">
                                            <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                                            <div className="flex-1 space-y-4 py-1">
                                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                <div className="space-y-2">
                                                    <div className="h-4 bg-gray-200 rounded"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : balances.length > 0 ? (
                                balances.map((balance) => (
                                    <BalanceCard 
                                        key={`${balance.userId}-${balance.type}`}
                                        name={balance.name}
                                        amount={balance.amount}
                                        type={balance.type}
                                        email={balance.email}
                                        formattedAmount={formatCurrency(Math.abs(balance.amount))}
                                        updatedOn={balance.updatedOn}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">No balances to display</p>
                                </div>
                            )}
                        </ul>
                    </div>
  
                {/* Quick Actions */}
                <div className="mt-8 flex space-x-4">
                    <button
                        onClick={handleCreateSplitClick}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Create New Split
                    </button>
                    <CreateSplitBox isOpen={isCreateSplitOpen} onClose={handleCloseCreateSplit} friends={friends} />
                    <button
                        onClick={() => navigate("/friends")}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Manage Friends
                    </button>
                </div>
            </main>
            <div className='flex justify-center mt-9 '>
            <BottomNavigation
  sx={{
    width: 700,
    backgroundColor: '#477082',
    borderRadius: '0.75rem',
    '& .MuiBottomNavigationAction-root': {
      color: 'white', // icon + label color when not selected
    },
    '& .Mui-selected': {
      color: 'white', // icon + label color when selected
    },
  }}
  value={value}
  onChange={handleChange}
>
<BottomNavigationAction
  label="Personal Expenses"
  value="Personal Expenses"
  icon={<PaymentsIcon />}
  component={Link}
  to="/expenses"
/>
  <BottomNavigationAction
    label="Expenses Insight"
    value="Expenses Insight"
    icon={<AutoGraphIcon />}
    component={Link}
    to="/insights"
  />
  <BottomNavigationAction
    label="Savings"
    value="Savings"
    icon={<SavingsIcon />}
    
  />
</BottomNavigation>


</div>

</div>
    );
}


