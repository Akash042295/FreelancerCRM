import Reac, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiPaperclip, FiSmile } from "react-icons/fi";
import { HiOutlineStatusOnline } from "react-icons/hi";
import useAuth from "../../hooks/useAuth";
import { getInitials } from "../../utils/helpers";
import socket from "../../socket.js";
import api from "../../lib/api.js";

const Chat = () => {
  const { user } = useAuth();
  const [adminId, setAdminId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  //socket.io connection
  useEffect(() => {
    if (!user?._id) return;

    socket.connect();

    socket.emit("join", user._id);

    socket.on("connect", () => {});

    socket.on("new-message", (message) => {
      console.log("New Message:", message);

      setMessages((prev) => [...prev, message]);
    });

    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("new-message");
      socket.off("online-users");
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    const loadChat = async () => {
      try {
        const res = await api.get("/chat");

        if (res.data.data.length > 0) {
          const partner = res.data.data[0];

          setAdminId(partner._id);

          // Load previous messages
          const history = await api.get(`/chat/${partner._id}`);

          setMessages(history.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadChat();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !adminId) return;

    try {
      const res = await api.post(`/chat/${adminId}`, {
        message: newMessage.trim(),
      });

      setMessages((prev) => [...prev, res.data.data]);
      setNewMessage("");
      inputRef.current?.focus();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-7rem)]"
    >
      <div className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a]/50 rounded-xl h-full flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">C</span>
              </div>
              {onlineUsers.includes(adminId) ? (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#1a1a1a] rounded-full"></span>
              ) : (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500 border-2 border-[#1a1a1a] rounded-full"></span>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {adminId ? "Admin" : "Support"}
              </p>
              <div className="text-xs flex items-center gap-1">
                {onlineUsers.includes(adminId) ? (
                  <p className="flex items-center gap-1 text-emerald-500">
                    <HiOutlineStatusOnline
                      size={12}
                    />
                    Online — Ready to help
                  </p>
                ) : (
                  <p className="flex items-center gap-1 text-gray-500">
                    <HiOutlineStatusOnline
                      size={12}
                    />
                    Offline
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Welcome banner */}
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-orange-500 text-2xl font-bold">C</span>
            </div>
            <h3 className="text-base font-semibold text-white">
              CRM Support Chat
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              We typically reply within a few minutes
            </p>
          </div>

          {messages.map((msg) => {
            const isMe = msg.sender._id === user._id;
            return (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                {!isMe && (
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mr-2 shrink-0 self-end">
                    <span className="text-white text-xs font-bold">
                      {getInitials(isMe ? user.name : msg.sender.name)}
                    </span>
                  </div>
                )}
                <div
                  className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
                    isMe
                      ? "bg-orange-500 text-white rounded-br-md"
                      : "bg-[#1a1a1a] text-gray-200 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
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

          {/* Typing indicator are temporary closed*/}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mr-2 shrink-0">
                  <span className="text-white text-xs font-bold">C</span>
                </div>
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
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
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
      </div>
    </motion.div>
  );
};

export default Chat;
