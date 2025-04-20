import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Close,
  FilterAlt,
  Search,
  CalendarToday,
  Refresh
} from "@mui/icons-material";
import { Group } from "@mui/icons-material"; // Add this


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
    { value: "created_split", label: "Created Splits", icon: "💰" },
    { value: "participated_split", label: "Participated Splits", icon: "👥" },
    { value: "sent_friend_request", label: "Sent Requests", icon: "📤" },
    { value: "received_friend_request", label: "Received Requests", icon: "📥" },
    { value: "created_group", label: "Created Groups", icon: "🆕" },
    { value: "joined_group", label: "Joined Groups", icon: "➕" }
  ];

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchAllUpdates = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://splititb.harshitacodes.workers.dev/allupdates", {
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
    const date = new Date(update.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    return (
      <motion.div
        key={index}
        className="bg-white p-5 rounded-xl shadow-sm mb-4 border border-gray-100 hover:shadow-md transition-all duration-200 hover:border-blue-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, delay: index * 0.05 }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <span className="text-lg mr-2">
                {updateTypes.find(t => t.value === update.type)?.icon || '📝'}
              </span>
              <h3 className="text-md font-semibold text-gray-800">
                {getTitle(update)}
              </h3>
            </div>
            {getSubText(update) && (
              <p className="text-sm text-gray-500 ml-7">{getSubText(update)}</p>
            )}
          </div>
          <div className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
            {date}
          </div>
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
        <div className="flex justify-center mb-8">
          <div 
            className="pt-2 mr-3 cursor-pointer transition-all duration-200 hover:scale-110" 
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <FilterAlt className="text-gray-600 hover:text-blue-500" style={{ fontSize: '1.75rem' }} />
          </div>
          <div className="w-[35rem] flex items-center text-gray-900 border-2 border-gray-200 rounded-full p-1 pl-5 text-sm pr-2 bg-white shadow-sm hover:border-blue-300 transition-all duration-200">
            <input
              id="default-search"
              className="w-full text-gray-800 placeholder-gray-400 border-none outline-none bg-transparent"
              placeholder="Search your activity..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <button className="text-gray-500 hover:text-blue-500 font-bold py-2 px-3 rounded-full inline-flex items-center transition-colors duration-200">
              <Search style={{ fontSize: '1.25rem' }} />
            </button>
          </div>
        </div>

        {/* Scrollable content area without visible scrollbar */}
        <div className="h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide pr-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-500 text-lg">Loading your activity...</p>
            </div>
          ) : filteredUpdates.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Search className="text-blue-500" style={{ fontSize: '2rem' }} />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No matching activity found</h3>
              <p className="text-gray-500 max-w-md">
                {query ? 'Try a different search term' : 'Your activity will appear here'}
              </p>
              {query && (
                <button 
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-full flex items-center hover:bg-blue-100 transition-colors duration-200"
                >
                  <Refresh className="mr-2" />
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto pb-6">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Recent Activity
                </h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {filteredUpdates.length} items
                </span>
              </div>
              {filteredUpdates.map((update, index) => renderCard(update, index))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Filter panel */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            className="absolute top-0 left-0 h-full w-80 bg-white shadow-xl z-10 p-6 border-r border-gray-100"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FilterAlt className="mr-2" />
                Filters
              </h2>
              <button 
                onClick={() => setFilterOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
              >
                <Close />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-medium mb-3 text-gray-700 flex items-center">
                <span className=" p-1 rounded mr-2">
                  <Group style={{ fontSize: '1rem' }} />
                </span>
                Activity Types
              </h3>
              <div className="space-y-3 pl-8">
                {updateTypes.map(type => (
                  <div key={type.value} className="flex items-center">
                    <input
                      type="checkbox"
                      id={type.value}
                      checked={filters.types.includes(type.value)}
                      onChange={() => handleTypeToggle(type.value)}
                      className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor={type.value} className="text-gray-700 flex items-center">
                      <span className="mr-2">{type.icon}</span>
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-medium mb-3 text-gray-700 flex items-center">
                <span className=" p-1 rounded mr-2">
                  <CalendarToday style={{ fontSize: '1rem' }} />
                </span>
                Date Range
              </h3>
              <div className="space-y-4 pl-8">
                <div>
                  <label className="block text-sm mb-1 text-gray-500">From:</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={filters.dateRange.start || ''}
                      onChange={(e) => handleDateChange(e, 'start')}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-500">To:</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={filters.dateRange.end || ''}
                      onChange={(e) => handleDateChange(e, 'end')}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-18 left-6 right-6">
              <button
                onClick={resetFilters}
                className="w-full py-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 font-medium flex items-center justify-center transition-colors duration-200"
              >
                <Refresh className="mr-2" />
                Reset All Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}