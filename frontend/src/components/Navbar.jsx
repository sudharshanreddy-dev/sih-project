import  { useState, useEffect, useRef } from 'react'
import { Search, Menu, ArrowRight, Bell,} from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [token, setToken] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [notifications, setNotifications] = useState([])
  const navigate = useNavigate()
  const searchRef = useRef(null)

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        try {
          const response = await axios.post('/auth/login', null, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });

          if (response.data.isValid) {
            setToken(true);
            fetchNotifications(storedToken);
          } else {
            setToken(false);
          }
        } catch (error) {
          console.log('Token validation error:', error);
          setToken(false);
        }
      } else {
        setToken(false);
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchNotifications = async (token) => {
    try {
      const response = await axios.get('/api/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/search', {
        query: searchQuery,
        token: localStorage.getItem("authToken")
      });
      console.log('Search results:', response.data);
      // Handle the search results (e.g., update state, navigate to results page)
    } catch (error) {
      console.error('Error searching:', error);
    }
  }

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const response = await axios.get(`/api/suggestions?query=${query}`);
        setSuggestions(response.data.suggestions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  }

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-400 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div onClick={() => navigate('/')} className="flex-shrink-0 flex items-center hover:cursor-pointer">
            <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="ml-2 text-xl font-bold">NaviPro</span>
          </div>

          <div className="hidden md:block flex-1 max-w-md mx-4" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleInputChange}
                className="pl-10 pr-16 w-full border border-transparent bg-white bg-opacity-20 rounded-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-300 text-white"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-indigo-500 rounded-r-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-indigo-700"
              >
                <ArrowRight className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </button>
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg"
                  >
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <>
                <div className="relative">
                  <button className="p-1 rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white">
                    <Bell className="h-6 w-6" />
                    {notifications.length > 0 && (
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                    )}
                  </button>
                </div>
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white">
                    <img className="h-8 w-8 rounded-full object-cover" src="/path-to-profile-pic.jpg" alt="Profile" />
                    <span className="font-medium">John Doe</span>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-20 hidden group-hover:block">
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white">Profile</a>
                    <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white">Settings</a>
                    <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white">Logout</a>
                  </div>
                </div>
              </>
            ) : (
              <button onClick={() => navigate('/login')} className="bg-white text-indigo-600 rounded-full font-medium px-6 py-2 hover:bg-indigo-100 transition duration-300">
                Sign In
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-indigo-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <form onSubmit={handleSearch} className="relative mb-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="pl-10 pr-16 w-full border border-transparent bg-white bg-opacity-20 rounded-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-300 text-white"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-indigo-500 rounded-r-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-indigo-700"
                >
                  <ArrowRight className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </button>
              </form>
              {token ? (
                <>
                  <a href="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">Profile</a>
                  <a href="/notifications" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">Notifications</a>
                  <a href="/settings" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">Settings</a>
                  <a href="/logout" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">Logout</a>
                </>
              ) : (
                <button onClick={() => navigate('/login')} className="w-full text-center px-3 py-2 rounded-md text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50">Sign In</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}