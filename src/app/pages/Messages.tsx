import { useState } from "react";
import { MESSAGES } from "../data/mockData";
import { Send, ArrowLeft, Search } from "lucide-react";
import { motion } from "motion/react";

export function Messages() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [chats, setChats] = useState(MESSAGES);
  const [search, setSearch] = useState("");

  const activeChat = chats.find(c => c.id === selectedChat);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    const updatedChats = chats.map(c => {
      if (c.id !== selectedChat) return c;
      return {
        ...c,
        lastMessage: newMessage,
        timestamp: "Just now",
        unread: 0,
        messages: [
          ...c.messages,
          { id: `msg${Date.now()}`, from: "me" as const, text: newMessage, time: "Just now" },
        ],
      };
    });
    setChats(updatedChats);
    setNewMessage("");
  };

  const filteredChats = chats.filter(c => c.contactName.toLowerCase().includes(search.toLowerCase()));

  if (selectedChat && activeChat) {
    return (
      <div className="flex flex-col h-[calc(100vh-130px)]">
        {/* Chat Header */}
        <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-100 sticky top-0 z-10">
          <button onClick={() => setSelectedChat(null)} className="p-1 -ml-1">
            <ArrowLeft size={22} className="text-gray-600" />
          </button>
          <img src={activeChat.contactAvatar} alt={activeChat.contactName} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-gray-800">{activeChat.contactName}</p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <p className="text-xs text-gray-500">Online • {activeChat.contactRole}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {activeChat.messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
            >
              {msg.from !== "me" && (
                <img src={activeChat.contactAvatar} alt="" className="w-8 h-8 rounded-full object-cover mr-2 self-end flex-shrink-0" />
              )}
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                  msg.from === "me"
                    ? "text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm shadow-sm"
                }`}
                style={msg.from === "me" ? { background: "linear-gradient(135deg, #E2725B, #C4566E)" } : {}}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.from === "me" ? "text-white/70" : "text-gray-400"}`}>{msg.time}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white px-4 py-3 border-t border-gray-100 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyPress={e => e.key === "Enter" && sendMessage()}
            className="flex-1 px-4 py-2.5 bg-gray-100 rounded-2xl text-sm focus:outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #E2725B, #C4566E)" }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <h2 className="font-bold text-xl text-gray-800 mb-4">Messages</h2>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search conversations..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl shadow-sm text-sm focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        {filteredChats.map((chat, i) => (
          <motion.button
            key={chat.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => {
              setSelectedChat(chat.id);
              setChats(prev => prev.map(c => c.id === chat.id ? { ...c, unread: 0 } : c));
            }}
            className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3 text-left"
          >
            <div className="relative flex-shrink-0">
              <img src={chat.contactAvatar} alt={chat.contactName} className="w-12 h-12 rounded-full object-cover" />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`font-semibold text-gray-800 ${chat.unread > 0 ? "font-bold" : ""}`}>{chat.contactName}</p>
                <p className="text-xs text-gray-400 flex-shrink-0 ml-2">{chat.timestamp}</p>
              </div>
              <p className="text-xs text-gray-400 mb-0.5">{chat.contactRole}</p>
              <p className={`text-sm truncate ${chat.unread > 0 ? "text-gray-800 font-medium" : "text-gray-500"}`}>
                {chat.lastMessage}
              </p>
            </div>
            {chat.unread > 0 && (
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "#E2725B" }}>
                {chat.unread}
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {filteredChats.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-3">💬</p>
          <p>No conversations yet</p>
        </div>
      )}
    </div>
  );
}
