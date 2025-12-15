import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ChatContextType {
    selectedChatId: string | null;
    setSelectedChatId: (id: string) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

    return (
        <ChatContext.Provider
            value={{
                selectedChatId,
                setSelectedChatId,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext)!;
