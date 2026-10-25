import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSend,
  FiSearch,
  FiMoreVertical,
  FiPaperclip,
  FiSmile,
} from "react-icons/fi";
import { HiOutlineStatusOnline } from "react-icons/hi";
import useAuth from "../../hooks/useAuth";
import { getInitials, timeAgo } from "../../utils/helpers";
import socket from "../../socket.js";
import api from "../../lib/api.js";

const Chat = () => {
  const { user } = useAuth(); // TODO: Replace with useAuth() when auth is implemented
  const [customers, setCustomers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  //socket.io connection and event listeners
  useEffect(() => {
    if (!user?._id) return;

    socket.connect();

    socket.emit("join", user._id);

    socket.on("connect", () => {
    });

    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });


    socket.on("new-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("new-message");
      socket.off("online-users");
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await api.get("/chat");

      setCustomers(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectCustomer = async (customer) => {
    setSelectedCustomer(customer);

    const res = await api.get(`/chat/${customer._id}`);

    setMessages(res.data.data);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !selectedCustomer) return;

    try {
      const res = await api.post(`/chat/${selectedCustomer._id}`, {
        message: newMessage,
      });

      setMessages((prev) => [...prev, res.data.data]);
      setNewMessage("");
      setIsTyping(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-[calc(100vh-7rem)] gap-4"
    >
      {/* Customer List Panel */}
      <div className="w-80 shrink-0 bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a] rounded-xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[#2a2a2a]">
          <h3 className="text-lg font-semibold text-white mb-3">
            Customer Chat
          </h3>
          <div className="relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={14}
            />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#151515] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-lg px-4 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200 pl-9 text-sm py-2"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredCustomers.map((customer) => (
            <button
              key={customer._id}
              onClick={() => handleSelectCustomer(customer)}
              className={`w-full flex items-start gap-3 p-4 text-left hover:bg-[#1a1a1a]/50 transition-colors border-b border-[#2a2a2a] ${
                selectedCustomer?._id === customer._id
                  ? "bg-[#1a1a1a]/80 border-l-2 border-l-orange-500"
                  : ""
              }`}
            >
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                  <span className="text-orange-400 text-xs font-semibold">
                    {getInitials(customer.name)}
                  </span>
                </div>
                {onlineUsers.includes(customer._id) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-black-400 rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white truncate">
                    {customer.name}
                  </p>
                  <span className="text-[10px] text-gray-500 shrink-0">
                    {timeAgo(customer.lastMessageTime)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {customer.lastMessage}
                </p>
              </div>
              {customer.unread > 0 && (
                <span className="shrink-0 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                  {customer.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a] rounded-xl flex flex-col overflow-hidden">
        {selectedCustomer ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                    <span className="text-orange-400 text-sm font-semibold">
                      {getInitials(selectedCustomer.name)}
                    </span>
                  </div>
                  {onlineUsers.includes(selectedCustomer._id) ? (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-emerald-200 rounded-full"></span>
                  ) : (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500 border-2 border-gray-300 rounded-full"></span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {selectedCustomer.name}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    {onlineUsers.includes(selectedCustomer._id) ? (
                      <>
                        <HiOutlineStatusOnline
                          className="text-emerald-500"
                          size={12}
                        />{" "}
                        Online
                      </>
                    ) : (
                      "Offline"
                    )}
                  </p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-black-200 rounded-lg transition-colors">
                <FiMoreVertical size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => {
                const isMe = msg.sender._id === user._id;
                return (
                  <motion.div
                    key={msg._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
                        isMe
                          ? "bg-orange-500 text-white rounded-br-md"
                          : "bg-[#151515] text-gray-200 rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {msg.message}
                      </p>
                      <p
                        className={`text-[10px] mt-1 ${isMe ? "text-orange-200" : "text-gray-500"}`}
                      >
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing indicator  are temporary closed*/}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-[#1a1a1a] px-4 py-3 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1">
                        <span
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></span>
                        <span
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></span>
                        <span
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="px-6 py-4 border-t border-[#2a2a2a]"
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <FiPaperclip size={18} />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <FiSmile size={18} />
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                  }}
                  className="flex-1 w-full bg-[#151515] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-lg px-4 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200 text-sm py-2.5"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSend size={18} />
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Empty state */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-black-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSend size={32} className="text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-400">
                Select a conversation
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Choose a customer to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Chat;
