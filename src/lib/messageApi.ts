import { api } from "./api";

export const getMessages = async (chatId: string, token: string) => {
    return api.get(`/messages/${chatId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
