

import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from "framer-motion"
// import Navbar from '../components/Navbar'
import GeminiChat from '../components/GeminiChat'

const UserDashboard = () => {
    const [places, setPlaces] = useState([])
    const scrollContainerRef = useRef(null)
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const images = Array.from({ length: 10 }, (_, i) => `https://picsum.photos/200/300?random=${i + 1}`)

    useEffect(() => {
        setPlaces([
            {
                name: "Manali",
                description: "Winter Destination",
                address: "Himachal Pradesh",
                googleLink: "https://www.google.com/maps/place/Manali",
                image: "https://images.unsplash.com/photo-1561489423-cf8f20a414cd?auto=format&fit=crop&w=300&q=80"
            },
            {
                name: "Goa",
                description: "Beach Paradise",
                address: "Goa, India",
                googleLink: "https://www.google.com/maps/place/Goa",
                image: "https://images.unsplash.com/photo-1562011065-308b0fd60d95?auto=format&fit=crop&w=300&q=80"
            },
            {
                name: "Jaipur",
                description: "The Pink City",
                address: "Rajasthan, India",
                googleLink: "https://www.google.com/maps/place/Jaipur",
                image: "https://images.unsplash.com/photo-1605019229145-bf15a16d8255?auto=format&fit=crop&w=300&q=80"
            },
            {
                name: "Varanasi",
                description: "Spiritual Hub",
                address: "Uttar Pradesh, India",
                googleLink: "https://www.google.com/maps/place/Varanasi",
                image: "https://images.unsplash.com/photo-1593476789083-5367e74e26d6?auto=format&fit=crop&w=300&q=80"
            },
            {
                name: "Kerala",
                description: "God's Own Country",
                address: "Kerala, India",
                googleLink: "https://www.google.com/maps/place/Kerala",
                image: "https://images.unsplash.com/photo-1575320349246-5a4d8f44de49?auto=format&fit=crop&w=300&q=80"
            },
            {
                name: "Agra",
                description: "Home of the Taj Mahal",
                address: "Uttar Pradesh, India",
                googleLink: "https://www.google.com/maps/place/Agra",
                image: "https://images.unsplash.com/photo-1504637334776-7c94c7751b36?auto=format&fit=crop&w=300&q=80"
            },
            {
                name: "Shimla",
                description: "Queen of Hills",
                address: "Himachal Pradesh, India",
                googleLink: "https://www.google.com/maps/place/Shimla",
                image: "https://images.unsplash.com/photo-1557583894-94629b03782a?auto=format&fit=crop&w=300&q=80"
            },
            {
                name: "Rishikesh",
                description: "Yoga Capital of the World",
                address: "Uttarakhand, India",
                googleLink: "https://www.google.com/maps/place/Rishikesh",
                image: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=300&q=80"
            }
        ])
    }, [])

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300
            const currentScroll = scrollContainerRef.current.scrollLeft
            scrollContainerRef.current.scrollTo({
                left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    const changeMonth = (amount) => {
        setCurrentMonth(prevMonth => {
            const newMonth = new Date(prevMonth)
            newMonth.setMonth(newMonth.getMonth() + amount)
            return newMonth
        })
    }

    const getDaysInMonth = (date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const days = new Date(year, month + 1, 0).getDate()
        return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1))
    }

    const days = getDaysInMonth(currentMonth)

    return (
        <div className="flex flex-col min-h-screen">
            {/* <Navbar /> */}
            <div className="flex-grow bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left Column */}
                        <div className="w-full md:w-2/3 space-y-8">
                            {/* Tourist Spots */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-6 rounded-xl shadow-lg">
                                <div className="mb-6 flex justify-between items-center">
                                    <motion.h2
                                        className="text-3xl font-bold text-gray-900"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        Tourist Spots
                                    </motion.h2>
                                    <div className="space-x-3">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => scroll('left')}
                                            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                                            aria-label="Scroll left"
                                        >
                                            <ChevronLeft size={24} />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => scroll('right')}
                                            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                                            aria-label="Scroll right"
                                        >
                                            <ChevronRight size={24} />
                                        </motion.button>
                                    </div>
                                </div>
                                <motion.div
                                    ref={scrollContainerRef}
                                    className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide scroll-smooth"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    {images.map((image, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex-shrink-0 w-64 h-48 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <img
                                                className="w-full h-full object-cover rounded-lg transform hover:scale-110 transition-transform duration-300"
                                                src={image}
                                                alt={`Tourist Spot ${index + 1}`}
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Iconic Places */}
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden relative" style={{ minHeight: '495px', maxHeight: '495px', overflowY: 'auto' }}>
                                <h2 className="text-3xl font-bold p-6 border-b bg-gradient-to-r from-blue-500 to-blue-200 text-white">
                                    Iconic Places
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Name of Place</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Address</th>
                                                <th scope="col" className="pl-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Location</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {places.map((item, index) => (
                                                <motion.tr
                                                    key={index}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                                    className="hover:bg-gray-50 transition-colors duration-200"
                                                >
                                                    <td className="px-10 py-4 w-1/3 relative">
                                                        <div
                                                            className="absolute inset-0 bg-cover bg-center z-0 opacity-20"
                                                            style={{ backgroundImage: `url(${item.image})` }}
                                                        />
                                                        <div className="relative z-10">
                                                            <div className="text-lg font-semibold text-gray-900">{item.name}</div>
                                                            <div className="text-sm text-gray-600">{item.description}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 w-1/3 relative">
                                                        <div
                                                            className="absolute inset-0 bg-cover bg-center z-0 opacity-20"
                                                            style={{ backgroundImage: `url(${item.image})` }}
                                                        />
                                                        <div className="relative z-10">
                                                            <div className="text-sm text-gray-900">{item.address}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 w-1/3 relative">
                                                        <div
                                                            className="absolute inset-0 bg-cover bg-center z-0 opacity-20"
                                                            style={{ backgroundImage: `url(${item.image})` }}
                                                        />
                                                        <div className="relative z-10">
                                                            <a
                                                                href={item.googleLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="px-4 py-2 inline-flex items-center text-sm font-medium rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-200"
                                                            >
                                                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                                </svg>
                                                                Google Maps
                                                            </a>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="w-full md:w-1/3 space-y-8">
                            {/* Calendar */}
                            <div className="bg-white shadow-xl rounded-lg p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <motion.h2
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="text-3xl font-bold text-gray-900"
                                    >
                                        Calendar
                                    </motion.h2>
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        className="flex items-center space-x-6"
                                    >
                                        <button
                                            onClick={() => changeMonth(-1)}
                                            className="text-gray-600 hover:text-gray-900 transition duration-200 ease-in-out"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <span className="text-xl font-semibold">
                                            {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
                                        </span>
                                        <button
                                            onClick={() => changeMonth(1)}
                                            className="text-gray-600 hover:text-gray-900 transition duration-200 ease-in-out"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                    </motion.div>
                                </div>
                                <div className="grid grid-cols-7 gap-2 mb-2">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                        <motion.div
                                            key={day}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2, duration: 0.5 }}
                                            className="text-center font-semibold text-gray-600"
                                        >
                                            {day}
                                        </motion.div>
                                    ))}
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="grid grid-cols-7 gap-2"
                                >
                                    {days.map((date, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.05 }}
                                            className={`
                                                text-center py-2 border rounded-lg cursor-pointer transition-colors duration-200 ease-in-out
                                                ${date.getMonth() === currentMonth.getMonth()
                                                    ? "bg-blue-50 text-gray-900"
                                                    : "bg-blue-100 text-blue-400"
                                                }
                                                ${date.toDateString() === new Date().toDateString()
                                                    ? "bg-blue-900 text-white font-bold"
                                                    : ""
                                                }
                                                hover:bg-blue-600 hover:text-white
                                            `}
                                        >
                                            {date.getDate()}
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Chatbot */}
                            <GeminiChat />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard