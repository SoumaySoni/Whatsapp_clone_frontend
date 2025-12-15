import { useEffect, useState } from "react";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import { getMessages } from "../lib/messageApi";

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

        loadMessages();
    }, [selectedChatId, token]);

    if (!selectedChatId) {
        return (
            <div className="h-full flex items-center justify-center text-gray-500">
                Select a chat to start messaging
            </div>
        );
    }

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
            <div className="p-4 border-t bg-white">
                <input
                    type="text"
                    disabled
                    placeholder="Message sending coming next..."
                    className="w-full border px-4 py-2 rounded-lg outline-none"
                />
            </div>
        </div>
    );
};

export default ChatWindow;
