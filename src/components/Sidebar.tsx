import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserChats } from "../lib/chatApi";
import { useChat } from "../context/ChatContext";

interface Chat {
    id: string;
    user1: { id: string; name: string };
    user2: { id: string; name: string };
    messages: { content: string }[];
}

const Sidebar = () => {
    const { user, token } = useAuth();

    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(true);
    const { selectedChatId, setSelectedChatId } = useChat();

    useEffect(() => {
        if (!token) return; // don't run until token exists

        // console.log("Token detected in Sidebar:", token);

        const loadChats = async () => {
            try {
                const res = await getUserChats(token);
                setChats(res.data.chats);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadChats();
    }, [token]);

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center text-gray-500">
                Loading chats...
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b font-semibold text-lg bg-gray-50">
                Chats
            </div>

            <div className="flex-1 overflow-y-auto">
                {chats.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No chats found</p>
                )}

                {chats.map((chat) => {
                    const otherUser =
                        chat.user1.id === user?.id ? chat.user2 : chat.user1;

                    return (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChatId(chat.id)}
                            className={`p-4 border-b cursor-pointer ${selectedChatId === chat.id ? "bg-gray-200" : "hover:bg-gray-100"}`}
                        >
                            <p className="font-medium">{otherUser.name}</p>
                            <p className="text-sm text-gray-600">
                                {chat.messages[0]?.content || "Start a conversation"}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
