import  { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGeminiResponse } from '../utils/ai';

const GeminiChat = () => {
    const [inputMessage, setInputMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { role: 'ai', content: 'Hey, how can I help you today?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const sendMessage = async () => {
        if (inputMessage.trim() === '') return;

        const userMessage = { role: 'user', content: inputMessage };
        setChatHistory(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await getGeminiResponse(inputMessage);
            const aiMessage = { role: 'ai', content: response };
            setChatHistory(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error getting Gemini response:', error);
            const errorMessage = { role: 'ai', content: 'Sorry, I encountered an error. Please try again.' };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage();
    };

    return (
        <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 shadow-2xl rounded-2xl p-4 flex flex-col h-[calc(80vh-2rem)] max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
                {/* <Sparkles className="text-indigo-500 mr-2" size={32} /> */}
                <h2 className="text-3xl font-bold text-blue-500">Chat Assistant</h2>
            </div>
            
            <div ref={chatContainerRef} className="flex-grow overflow-y-auto mb-6 p-4 bg-white bg-opacity-60 rounded-xl shadow-inner">
                <AnimatePresence>
                    {chatHistory.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex items-end ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`p-3 rounded-2xl max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl shadow-md ${
                                    message.role === 'user' 
                                        ? 'bg-indigo-500 text-white rounded-br-none' 
                                        : 'bg-white text-gray-800 rounded-bl-none'
                                }`}>
                                    {message.content}
                                </div>
                                <div className={`${message.role === 'user' ? 'mr-2' : 'ml-2'} mb-2`}>
                                    {message.role === 'user' ? (
                                        <User size={24} className="text-indigo-500" />
                                    ) : (
                                        <Bot size={24} className="text-purple-600" />
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                    >
                        <div className="flex items-end">
                            <div className="p-3 rounded-2xl bg-white text-gray-800 rounded-bl-none shadow-md">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="flex space-x-1"
                                >
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                </motion.div>
                            </div>
                            <div className="ml-2 mb-2">
                                <Bot size={24} className="text-purple-600" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
            
            <form onSubmit={handleSubmit} className="flex items-center">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-grow px-4 py-2 border-2 border-indigo-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-indigo-500 text-white rounded-r-xl hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300 transition-all duration-300"
                >
                    <Send size={24} />
                </button>
            </form>
        </div>
    );
};

export default GeminiChat;