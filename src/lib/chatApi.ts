import { api } from "./api";

export const getUserChats = async (token: string) => {
    return api.get("/chats", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
