import { useEffect, useState } from "react";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import { getMessages } from "../lib/messageApi";
import { api } from "../lib/api";
import { socket } from "../lib/socket";

interface Message {
    id: string;
    content: string;
    sender: { id: string; name: string };
}

const ChatWindow = () => {
    const { selectedChatId } = useChat();
    const { token } = useAuth();

    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (!selectedChatId || !token) return;

        const loadMessages = async () => {
            setLoading(true);
            try {
                const res = await getMessages(selectedChatId, token);
                setMessages(res.data.messages);
            } catch (error) {
                console.error("Failed to load messages", error);
            } finally {
                setLoading(false);
            }
        };

        socket.on("receiveMessage", (msg) => {
            if (msg.chatId === selectedChatId) {
                setMessages((prev) => [...prev, msg]);
            }
        });

        return () => {
            socket.off("receiveMessage");
        };

        loadMessages();
    }, [selectedChatId, token]);

    if (!selectedChatId) {
        return (
            <div className="h-full flex items-center justify-center text-gray-500">
                Select a chat to start messaging
            </div>
        );
    }

    const handleSend = async () => {
        if (!newMessage.trim() || !selectedChatId || !token) return;

        // 1. Save message in DB
        const res = await api.post(
            "/messages/send",
            {
                chatId: selectedChatId,
                content: newMessage,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const savedMessage = res.data.message;

        // 2. Send real-time event
        socket.emit("sendMessage", {
            chatId: selectedChatId,
            message: savedMessage,
        });

        // 3. Add instantly to UI
        setMessages((prev) => [...prev, savedMessage]);

        setNewMessage("");
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b bg-gray-50 font-semibold">
                Chat ID: {selectedChatId}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {loading && <p>Loading messages...</p>}

                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className="bg-gray-200 px-3 py-2 rounded-lg inline-block"
                    >
                        <p className="text-sm text-gray-700">{msg.sender.name}</p>
                        <p>{msg.content}</p>
                    </div>
                ))}
            </div>

            {/* Input box will be added next */}
            <div className="p-4 border-t bg-white flex items-center gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border px-4 py-2 rounded-lg outline-none"
                />
                <button
                    onClick={handleSend}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
