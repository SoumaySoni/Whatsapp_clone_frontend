const Sidebar = () => {
    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b font-semibold text-lg bg-gray-50">
                Chats
            </div>

            <div className="flex-1 overflow-y-auto">
                {/* We will load chats here */}
                <p className="text-center text-gray-500 mt-4">No chats yet</p>
            </div>
        </div>
    );
};

export default Sidebar;
