import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const Chat = () => {
    return (
        <div className="h-screen flex bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/3 border-r bg-white">
                <Sidebar />
            </div>

            {/* Chat Window */}
            <div className="w-2/3">
                <ChatWindow />
            </div>
        </div>
    );
};

export default Chat;
