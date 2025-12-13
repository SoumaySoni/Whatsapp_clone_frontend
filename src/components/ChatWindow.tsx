const ChatWindow = () => {
    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b bg-gray-50">
                <p className="font-semibold">Select a chat to start messaging</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                {/* Messages will load here */}
            </div>

            {/* Input Box */}
            <div className="p-4 border-t bg-white">
                <input
                    type="text"
                    disabled
                    placeholder="Select a chat first..."
                    className="w-full border px-4 py-2 rounded-lg outline-none"
                />
            </div>
        </div>
    );
};

export default ChatWindow;
